/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
	Text,
	View,
	ScrollView, StyleSheet,
	ListView,
	Platform,
	ActivityIndicator
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import {IconArrowDown, IconSearch , IconList, IconCall} from '../../../components/Icons'

import ViewForRightArrow from '../../../components/ViewForRightArrow';
import MapbarMap from '../../../mapbarmap/MapbarMap';

const estyle = Env.style;

export default class ServiceStationDetailMap extends Component {
	constructor(props) {
		super(props);
		this.center = {
			longitude: 104.621367,
			latitude: 35.317133
		};
		this.zoom = 8;
		this.state = {
			data: null
		}
	}

	setMarkers(data) {
		this.data = data;
		this.setState({
			data: {
				name: data.name,
				address: data.address,
				tel: data.tel || '无'
			}
		});
		let imageName_common = `${Env.marker.icon.pre}10011`;
		let opts = this.setMarkerOpts(
			{longitude: data.lon, latitude: data.lat, icon: imageName_common, iconText: ''}
		);
        setTimeout(() => {
            this.Map.setCenter(this.MPoint([data.lon, data.lat]));
        }, 300);
		setTimeout(() => {
        //    console.info(opts)
            this.Marker.add(opts);
        }, 300);
	}

	setMarkerOpts(data){
        let pt = this.MPoint([data.longitude, data.latitude]),
            mkOpts = {
                ...Env.marker.bubble,
                longitude: pt.longitude,
                latitude: pt.latitude,
                imageName: data.icon,
                id: 11
            };
            return [mkOpts];
/*		return mkOptsList.map((data, idx) => {
			let pt = this.MPoint([data.longitude, data.latitude]),
			mkOpts = {
				...Env.marker.bubble,
					longitude: pt.longitude,
					latitude: pt.latitude,
					imageName: data.icon,
					id: idx + 11
				};
			return mkOpts;
		});*/
	}


	onInit(instance) {
		//console.info('create detail map')
		this.mapRef = instance.getMapRef();
		this.Map = instance;
		this.MPoint = instance.MPoint;
		this.Marker = instance.Marker;
	//	console.info(this.props.nav)
		this.setMarkers(this.props.nav);
	}


	call(phone){
		this.props.callTo(phone);
	}

	componentWillUnmount() {
		this.Map.disposeMap(this.mapRef);
		this.mapRef = null;
		console.info('station map finalize')
	}
	alert() {
		this.setState({alertActive: true});
	}
	render() {
		let call = this.state.data;
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="服务站位置"/>
				<MapbarMap style={[estyle.fx1]}
						   center={this.center}
						   zoom={this.zoom}
						   onInit={(instance)=> {
							   this.onInit(instance);
						   }}
						   router={this.props.router}
						   hideLegend={true}/>
				{call ?
					<ViewForRightArrow
						onPress={() => call.tel && this.call(call.tel)}
						rightIcon={call.tel ? IconCall : null}
						iconSize={Env.vector.call.size}
						iconColor={Env.color.main}
					>
						<Text style={[estyle.text,{color:Env.color.main}, estyle.marginFontBottom]}>{call.name}</Text>
						<Text style={[estyle.text,{color:Env.color.note}]}>地址：{call.address}</Text>
						<Text style={[estyle.text, {color:Env.color.note}]}>电话：{call.tel}</Text>
					</ViewForRightArrow> : <View style={{height:1}}/>}
			</View>
		);
	}
}