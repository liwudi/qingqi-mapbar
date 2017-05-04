/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Alert,StyleSheet,
	ActivityIndicator
} from 'react-native';
import Toast from '../../../components/Toast';

//import MapLine from '../../../components/MapLine';
import MapLine from '../../home/components/mapline/MapLine';


import TopBanner from '../../../components/TopBanner';
import BorderButton from '../../../components/BorderButton';
import * as Icons from '../../../components/Icons';
import { IconArrowDown, IconQuestion } from '../../../components/Icons';
import {viewStandard ,deleteStandard} from '../../../services/AppService';
import {queryShareSummary, queryTrack} from '../../../services/MonitorService';


import Env from '../../../utils/Env';
const estyle = Env.style;

export default class DriveLineMarkAnalysis extends Component {
	constructor(props){
		super(props);
		this.state={
			standardInfo:{},
			animating: true
		}
	}

	componentDidMount(){
		this.getStandardInfo();
	}
	//查询标杆基本信息
	getStandardInfo(){
		viewStandard( this.props.routeId )
			.then( (res)=>{
				res.startTime += ':00';
				res.endTime += ':00';
				this.getShareSummary( {
					carId: res.carId,
					beginDate: res.startTime,
					endDate: res.endTime
				},this.props.carCode);
				this.fetchData(res);
			} )
			.catch()
	}
	//获取标杆路线的统计信息
	getShareSummary(obj,carCode){
		queryShareSummary(obj)
			.then( (data)=>{
				this.setState({
					standardInfo:{ carCode:carCode, timeTotal:data.timeTotal,oilwearTotal:data.oilwearTotal,mileageTotal:data.mileageTotal,oilwearAvg:data.oilwearAvg }
				})
			} )
			.catch()
	}
	//获取轨迹数据
	fetchData(info){
		queryTrack({
			carId: info.carId,
			beginDate: info.startTime,
			endDate: info.endTime,
			zoom: 0
		}).then((data) => {
			if(!data.lons || data.noResult) {
				data = null;
				Toast.show('没有行程轨迹', Toast.SHORT);
			}
			this.time = Math.random();
			this.setState({data: data, animating: false});
		}).catch(() => {
			this.time = Math.random();
			this.setState({data: null, animating: false});
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
		let standardInfo= this.state.standardInfo;
		return (
			<View style={[estyle.containerBackgroundColor,estyle.fx1]}>
				<TopBanner {...this.props} title="标杆车辆驾驶分析"/>
				<View style={{position:'absolute', zIndex:10, width: Env.screen.width, height: 80, marginTop:Env.screen.height / 3 * Env.font.base}}>
					<ActivityIndicator animating={this.state.animating} color={[Env.color.main]} size="large"/>
				</View>
				{this.renderAi()}
				<MapLine style={[estyle.fx1]}
						 data={this.state.data}
						 time={this.time}
						 {...this.props}
						 rightButtomView={<View style={styles.rightView}>
							 <View style={[styles.rightItem]}>
								 <Icons.IconFlag style={{color: 'red'}} size={Env.font.base * 30}/>
								 <Text style={styles.rightText}>{ this.props.routeName }</Text>
							 </View>
							 <Text style={styles.rightText}>车牌：{ standardInfo.carCode }</Text>
							 <Text style={styles.rightText}>总时长：{ standardInfo.timeTotal }</Text>
							 <Text style={styles.rightText}>总里程：{ standardInfo.mileageTotal } Km</Text>
							 <Text style={styles.rightText}>总油耗：{ standardInfo.oilwearTotal }L</Text>
							 <Text style={styles.rightText}>平均油耗：{ standardInfo.oilwearAvg } L/100km</Text>
						 </View>
						 }
				/>
				<View style={[{height:1}]}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	rightView : {
		position:'absolute',
		backgroundColor:'rgba(0,0,0,0.5)',
		bottom: Env.font.base * 30,
		left: Env.font.base * 10,
		borderRadius:Env.font.base * 10,
		padding:Env.font.base * 10
	},
	rightItem:{
		flexDirection:'row',
		padding: Env.font.base * 4,
		alignItems:'center'
	},
	rightText:{
		color:'#FFF',
		fontSize:Env.font.note
	}

});