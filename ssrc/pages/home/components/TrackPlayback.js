/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import MapLine from '../components/mapline/MapLine';
import Env from '../../../utils/Env';
import Toast from '../../../components/Toast';
const estyle = Env.style;
import {queryTrack} from '../../../services/MonitorService';
export default class TrackPlayback extends Component {
	constructor() {
		super();
		this.state = {
			data: null,
			animating: false
		}
	}
	componentDidMount() {
		this.fetchData();
	}
	fetchData() {
		this.setState({animating: true, data: null});
		queryTrack(Object.assign({zoom: 0}, this.props.nav)
		).then((data) => {
			if(!data.lons || data.noResult) {
				data = {noResult: true};
				Toast.show('没有行程轨迹', Toast.SHORT);
			}
			this.setState({data: data, animating: false, time: Math.random()});
		}).catch(() => {
			this.setState({data: {noResult: true}, animating: false, time: Math.random()});
			Toast.show('获取行程轨迹异常', Toast.SHORT);
		}).finally(()=>{});
	}
	renderAi () {
		let height = this.state.animating ? Env.screen.height / 3 : 0;
		return <View style={{position:'absolute', zIndex:10, width: Env.screen.width, height: height, marginTop:Env.screen.height / 3 * Env.font.base}}>
			<ActivityIndicator animating={this.state.animating} color={[Env.color.main]} size="large"/>
		</View>
	}
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				{this.renderAi()}
				<View style={[estyle.fx1]}>
					<MapLine
						data={this.state.data}
						time={this.state.time} {...this.props}/>
				</View>
				<View style={[{height:1}]}/>
			</View>
		);
	}
}