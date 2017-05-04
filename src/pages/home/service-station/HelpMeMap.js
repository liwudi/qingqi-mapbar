/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
	Text,
	View,
	ScrollView, StyleSheet,
	ListView,
	ActivityIndicator,
	Platform,
    TouchableOpacity
} from 'react-native';
import Toast from '../../../components/Toast';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import ConfirmButton from '../../../components/ConfirmButton'
import {IconArrowDown, IconSearch , IconList, IconCall} from '../../../components/Icons'
import {getPosition,urgeWo} from '../../../services/ServiceStationService';

import ViewForRightArrow from '../../../components/ViewForRightArrow';
import MapbarMap from '../../../mapbarmap/MapbarMap';
import Alert from '../../../components/Modals/Alert';

const estyle = Env.style;
let minLng, minLat, maxLng, maxLat, df;
	minLng = minLat = maxLng = maxLat = 0, df = 0;
const setBounds = (pt) => {
	if(!pt.longitude || !pt.latitude) return;
	if(!minLng) minLng = maxLng = pt.longitude;
	if(!minLat) minLat = maxLat = pt.latitude;
	minLng = Math.min(minLng, pt.longitude);
	minLat = Math.min(minLat, pt.latitude);
	maxLng = Math.max(maxLng, pt.longitude);
	maxLat = Math.max(maxLat, pt.latitude);
};
const bounds = () => {
	return {
		min: {longitude: minLng - df,
			latitude: minLat - df},
		max: {longitude: maxLng + df,
			latitude: maxLat + df}
	}
}
let TIMEOUT = 15;
export default class HelperMeMap extends Component {
	constructor(props) {
		super(props);
		this.center = {
			longitude: 104.621367,
			latitude: 35.317133
		};
		this.state = {
			data: null,
			animating: true,
			alertActive: false,
            disabled:false,
            time:'',
			txt:'我要催单',
            locatinState:null, //判断接单状态
            buttonRange:20 //催单按钮距离底部的高度
		}
		this.stop = false;
		this.init = false;
	}
	fetchData() {
		if(this.stop) return;
		getPosition(this.props.nav.woCode).then((data)=>{
		    console.log(data);
			if(this.stop) return;
		    //判断是否催单过
            if(data.urgeFlag == 1){
                this.setState({disabled:true,txt:'已催单'})
            }
            if(data.locatinState){
                if(data.locatinState == 1){
                    this.setState({locatinState:1,buttonRange:110 });
                }else if(data.locatinState == 2 && !data.rescueLon && !data.rescueLat){
                    this.setState({locatinState:2,rescueName:data.rescueName,rescuePhone:data.rescuePhone,buttonRange:150 });
                }else{
                    this.setState({locatinState:null})
                }
            }
			data && this.setMarkers(data);
		}).catch(()=> {
			Toast.show('救援人员搜索异常', Toast.SHORT);
		}).finally(()=>{
			this.setState({animating: false});
			this.timer = setTimeout(() => {
				this.fetchData();
			}, TIMEOUT * 1000);
		});
	}
	setMarkers(data) {
		this.data = data;
		console.info(data)
		this.markers = this.setMarkerOpts([
			{longitude:data.stationLon, latitude:data.stationLat, icon: '10011', iconText: '服务站'},	//服务站
			{longitude:data.rescueLon, latitude:data.rescueLat, icon: '10010',iconText:'救援人员'},	//救援人员
			{longitude:data.lon, latitude:data.lat, icon: '91002', iconText:'我的位置'}	//车
		]);
		if(this.init) {
			this.Marker.update(this.markers);
		} else {
			this.init = true;
			this.Marker.add(this.markers);
			let mkBounds = bounds();
			console.info(mkBounds)
			this.Map.setBounds(mkBounds.min, mkBounds.max);
		}
	}
	setMarkerOpts(mkOptsList){
		return mkOptsList.map((data, idx) => {
			let pt = this.MPoint([data.longitude, data.latitude]),
				opts = idx === 2 ? Env.marker.car : Env.marker.bubble,
				ity = -.25,
				mkOpts = {
					...opts,
					longitude: pt.longitude,
					latitude: pt.latitude,
					imageName: `${Env.marker.icon.pre}${data.icon}`,
					iconText: data.iconText,
					iconTextY: ity,
					id: idx,
					click: true
				};
				if(idx === 2) {
                    mkOpts.title = data.iconText;
                    mkOpts.iconText = '';
                    mkOpts.callOut = true;
                }
			setBounds(pt);
			return mkOpts;
		});
	}



	clickMarker(idx) {
		idx = +idx;
		console.info('clickmarkre', idx)
		let data;
		switch(idx) {
			case 0 :
				data = {tel: this.data.stationTel, name: this.data.stationName};
				break;
			case 1 :
				data = {tel: this.data.rescuePhone, name: this.data.rescueName};
				break;
			case 2 :
				data = {name: '我的位置'};
				break;
		}
		this.setState({data});
	}

	onInit(instance) {
		this.mapRef = instance.getMapRef();
		this.Map = instance;
		this.MPoint = instance.MPoint;
		this.Marker = instance.Marker;
	//	this.MarkerRotate = instance.MarkerRotate;
		this.fetchData();
	}

	call(phone){
		console.info(phone)
		this.props.callTo(phone);
//		Toast.show(phone,Toast.SHORT)
	}
	stopRequest() {
		this.stop = true;
	}

	componentWillUnmount() {
		this.stopRequest();
		this.timer && clearTimeout(this.timer);
		this.timer = null;
		this.Map.disposeMap(this.mapRef);
		this.mapRef = null;


/*
		this.pauseView();
		this.Map.finalize();*/
		console.info('help map finalize')
	}
	alert() {
        /**
         * 催单接口与后台沟通，当不满30分钟时 返回的状态码为1001，并有倒计时时间
        * */
        urgeWo(this.props.nav.woCode)
            .then(()=>{
                this.setState({disabled: true,txt:'已催单'});
                Toast.show('催单已成功！',Toast.SHORT);
            })
            .catch((err)=>{
                if(err.resultCode == 1001){
                    this.setState({
                        time: err.data.time,
                        alertActive: true
                    })
                }else {
                    Toast.show(err.message,Toast.SHORT);
                }
            })
	}
	renderAi () {
		let height = this.state.animating ? Env.screen.height / 3 : 0;
		return <View style={{position:'absolute', zIndex:10, width: Env.screen.width, height: height, marginTop:Env.screen.height / 3 * Env.font.base}}>
			<ActivityIndicator animating={this.state.animating} color={[Env.color.main]} size="large"/>
		</View>
	}
	render() {
		let call = this.state.data;
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="救援人员位置"/>
				{this.renderAi()}
				<View style={[{position:'absolute', top: 84 * Env.font.base + estyle.iosStatusBarHeight.paddingTop, left: 0, width: Env.screen.width, zIndex: 1000}]}>
					{call ?
						<ViewForRightArrow
							onPress={() => call.tel && this.call(call.tel)}
							rightIcon={call.tel ? IconCall : null}
							iconSize={Env.vector.call.size}
							iconColor={Env.color.main}
						>
							<Text style={[estyle.text,{color:Env.color.main}]}>{call.name}</Text>
							<Text style={[estyle.text, {color:Env.color.note}]}>{call.tel}</Text>
						</ViewForRightArrow> : null}
				</View>
				<MapbarMap style={[estyle.fx1]}
						   center={this.center}
						   onInit={(instance)=> {
							   this.onInit(instance);
						   }}
						   clickMarker={(pointId)=> {
							   this.clickMarker(pointId)
						   }}
						   router={this.props.router}
						   hideLegend={true}/>
				<View style={[{height:1}]}/>
				<View style={[{position: 'absolute', bottom: (this.state.buttonRange * Env.font.base) , left: (Env.screen.width / 2 - 112* Env.font.base )}, estyle.fxCenter]}>
					<ConfirmButton size="small" disabled={this.state.disabled} onPress={() => {this.alert();}}>{this.state.txt}</ConfirmButton></View>
                {
                    this.state.locatinState ?
                        <View style={[{position: 'absolute',width:Env.screen.width, bottom: 0, left: 0},estyle.padding,estyle.cardBackgroundColor,estyle.fxCenter]}>
                            <Text style={[estyle.note]}>{this.state.locatinState == 1 ? '目前无法查看救援人员位置，服务站还没有为您分派援救人员，请稍后再试！': '目前无法查看救援人员位置，可能因为救援人员手机GPS关闭、网络信号等原因！' }</Text>
                            {
                                this.state.rescuePhone ?
                                    <TouchableOpacity style={[estyle.fxRow]} onPress={ ()=>{this.props.callTo(this.state.rescuePhone) } }>
                                        <Text style={[estyle.note]}>救援人员：{this.state.rescueName}</Text>
                                        <Text style={[estyle.marginLeft,estyle.note]}>电话：{this.state.rescuePhone}</Text>
                                    </TouchableOpacity>:null
                            }
                        </View>:null
                }
				<Alert visible={this.state.alertActive} title="我要催单" showCancel={false} confirmTitle="好的"
					   onCancel={() => {this.setState({alertActive: false});}}
					   onConfirm={() => {this.setState({alertActive: false});}}
				>
					您的预约单在客服人员接单30分钟后,才可以催单,请您在 {this.state.time} 分钟后操作！
				</Alert>
			</View>
		);
	}
}
