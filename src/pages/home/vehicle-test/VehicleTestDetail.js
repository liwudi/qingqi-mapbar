/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,RefreshControl
} from 'react-native';

import Toast from '../../../components/Toast';

import {VehicleTestAction, TYPES} from '../../../actions/index';
import TopBanner from '../../../components/TopBanner';
import Circle from '../../../components/Circle';
import ListItem from '../../../components/ListItem';
import Error from '../../../components/Error';
import  * as AppService  from '../../../services/AppService';
import Env from '../../../utils/Env';
const estyle = Env.style;
const basefont = Env.font.base;
export default class VehicleTestDetail extends Component {
	//是否正在动画中
	animating=false;
	//首次进入-init, 检测中-texting, 检测出错-error, 检测正确-ok
	constructor(props) {
		super(props);
		this.state={
			color: Env.color.main,
			testState : 'init',
			text: '立即诊断'
		}
	}
	
	_next(data){
		if(data){
			this.setState({
				text:'重新诊断',
				testState : 'ok'
			});
			if(data.phyExamResult && data.phyExamResult.length !=0){
				this.setState({
					color:'rgb(255,156,0)'
				});
			}else if(data.phyExamTime){
				this.setState({
					color:'rgb(90,180,2)'
				});
			}
		}
	}

	fetchPerData(){
		AppService.queryLastPhyExamResult().then(
			(res) => {
				this.setState({
					data: res,
					error:false
				}, this._next(res));
			}
		).catch(()=>{
			this.setState({
				data: [],
				error: true
			});
		} );
	}
	componentDidMount(){
		this.fetchPerData();
	}
	
	setTestDom(data){
		let arr=[],dom=null;
		data.phyExamResult.forEach((item)=>{
			arr=arr.concat(item.list);
		});
		if(arr.length != 0){
			dom = arr.map((item,index)=>{
				return <ListItem key={index} left={item.faultCode + ' ' + item.faultDesc } />
			})
		}
		return <View>
					<ListItem left={ `故障码( ${arr.length} )` } right={data.phyExamTime} />
					{dom}
		       </View>;
	}

	setListView(data){
		let listView;
		if(data.phyExamTime){
			if(data.phyExamResult && data.phyExamResult.length !=0){
				listView = this.setTestDom(data);
			}else{
				listView =<View>
						<ListItem left="故障码 (0)" right={data.phyExamTime} />
						<ListItem left={'恭喜您，当前车辆没有故障码'} />
					</View>
			}
		}else {
			listView = <View style={[estyle.cardBackgroundColor, estyle.padding, estyle.borderBottom,estyle.fxCenter]}>
				<Text>为了行车安全，请进行故障诊断！</Text>
			</View>;
		}
		return listView
	}
	_onPress(){
		let phyExamTime=new Date();
		phyExamTime=phyExamTime.format('yyyy-MM-dd hh:mm:ss');
		if(!this.animating){
			this.animating=true;
			this.setState({
				testState : 'testing',
				text:'诊断中...'
			});
			var examPromise=AppService.phyExam();
			setTimeout(()=>{
				examPromise.then(
					(res) => {
                        Toast.show('诊断完成', Toast.SHORT);
						res.phyExamTime=phyExamTime;
						this.setState({
							data: res,
							error:false
						}, this._next(res));
					}
				).catch(()=>{
					Toast.show('诊断失败', Toast.SHORT);
					this._next({});
				} );
				this.animating=false;
			},3000);
		}
	}
	setTestingTxt(){
		if(this.state.testState == 'testing'){
			return <Text style={{color:'#fff'}}>正在进行故障诊断，请稍后...</Text>
 		}else if(this.state.data.phyExamResult && this.state.data.phyExamResult.length !=0 ){
			return <Text style={{color:'#fff'}}>当前车辆存在如下故障码，请到服务站检修！</Text>
		}else {
 			return <View />
		}
	}
	
	creatDom (data){
		if(!this.state.error){
			return 	<View style={[estyle.fx1]}>
						<View style={[estyle.fxCenter, {backgroundColor:this.state.color, paddingVertical: 30 * basefont}]}>
							<View style={[estyle.paddingVertical, estyle.marginVertical,estyle.fxCenter]}>
								<Circle onPress={this._onPress.bind(this)} radius={80}>
									<Text style={{fontSize:25*basefont,color:'#169ada'}}>
										{this.state.text}
									</Text>
								</Circle>
								<View style={[estyle.padding, estyle.fxCenter,{marginTop: 20 * basefont}]}>
									{
                                        this.setTestingTxt()
									}
								</View>
							</View>
						</View>
						<ScrollView style={[estyle.fx1, estyle.marginVertical,{backgroundColor:'rgb(245,245,245)'}]}>
							{this.setListView.bind(this)(this.state.data)}
						</ScrollView>
					</View>
		}else {
			return <Error onPress={ this.fetchPerData.bind(this) }/>
		}
	}

	render() {
		return (
				<View style={[estyle.fxColumn, estyle.fx1, estyle.containerBackgroundColor]}>
					<TopBanner {...this.props} title="故障诊断" color={this.state.color}/>
					{
						this.state.data != undefined ? this.creatDom.bind(this)(this.state.data) :
							<ScrollView
								refreshControl={
									<RefreshControl
										refreshing={true}
										colors={[Env.color.main]}
										progressBackgroundColor="#fff"
									/>
								}
								/>
					}
				</View>
		);
	}
}