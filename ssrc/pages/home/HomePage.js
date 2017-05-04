/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet,
    NativeModules
} from 'react-native';

import TopBanner from '../../components/TopBanner';

import ImgButton from '../../components/ImgButton';

import Env from '../../utils/Env';

import { IconArrowRight } from '../../components/Icons';

import TripAnalysisList from './trip-analysis/TripAnalysisList';
import VehicleTestDetail from './vehicle-test/VehicleTestDetail';
import TrafficSteward from './traffic-steward/TrafficSteward';
import ServiceStation from './service-station/ServiceStation';
import { startKefuActivity } from '../../utils/CommModule';
import Call from './call/index';
import MyCar from '../userCenter/my-car/MyCar';

import Bbs  from './bbs';
import News  from './news/News';
import MessageGoods  from './goods-message/GoodsMessage';

import Toast from '../../components/Toast';
import Banner from '../../components/Banner';

import {connect} from 'react-redux'
const estyle = Env.style;


import { choiceCustomer } from '../../services/AppService';

class HomePage extends Component {

	constructor(props){
		super(props);
	}

	goTo(page, havePermiss = false){
		if(havePermiss && !this.props.userStore.userInfo.carNo){
			// Toast.show('您当前没有车辆', Toast.SHORT);
            this.props.router.push(MyCar);
            // this.props.alert(
            //     '提示',
            //     '您当前没有车辆'
            // );
		}else{
			this.props.router.push(page);
		}
	}
    componentDidMount() {
    }


    isLoadingCustomerService = false;
    startCustomerService(){

        Toast.show('正在启动客服，请稍后', Toast.SHORT);
        if(!this.isLoadingCustomerService){
            this.isLoadingCustomerService = true;
            choiceCustomer().then(rs => {
                if(!rs.token){
                    Toast.show('分配客服失败，请稍后重试',Toast.SHORT);
                    return
                }
                startKefuActivity(
                    rs.userId + '',
                    rs.serverId + '',
                    "1",
                    rs.token + '',
                    rs.dialogId + ''
                );
            }).catch(e => {
                Toast.show(e.message, Toast.SHORT);
            }).finally(() => {
                this.isLoadingCustomerService = false;
            });
        }
    }

	render() {
		let userInfo = this.props.userStore.userInfo;
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner
					{...this.props}
					titleShow={false}
					leftView={<Text style={[estyle.navTitle]}>解放行(司机版)</Text>}
					rightView={
						userInfo.carNo ? <Text onPress={()=>{this.props.router.push(MyCar)}} style={[estyle.text, {color: Env.color.navTitle}]}>{userInfo.carNo} <IconArrowRight color="#FFF" size={Env.font.text}/></Text> : null}
				/>
                {/*<Banner style={styles.wrapper} />*/}
				<View style={[estyle.fx1,estyle.fxRow]}>
					<ImgButton onPress={() => this.goTo(TripAnalysisList, true)} src={require('../../assets/images/icon-1.png')} title="行程分析"/>
					<ImgButton onPress={() => this.goTo(VehicleTestDetail, true)}  src={require('../../assets/images/icon-2.png')} title="故障诊断"/>
					<ImgButton onPress={() => this.goTo(TrafficSteward, true)}  src={require('../../assets/images/icon-3.png')} title="行车管家"/>
				</View>
				<View style={[estyle.fx1,estyle.fxRow]}>
					<ImgButton onPress={() => this.goTo(ServiceStation, true)}  src={require('../../assets/images/icon-4.png')} title="服务预约"/>
					<ImgButton onPress={() => this.goTo(Call, true)}  src={require('../../assets/images/icon-5.png')} title="一键呼救"/>
                    {Env.isAndroid ? <ImgButton onPress={() => this.startCustomerService()}  src={require('../../assets/images/icon-6.png')} title="联系客服"/> : <ImgButton onPress={() => this.goTo(Bbs)}  src={require('../../assets/images/icon-8.png')} title="卡友论坛"/>}
				</View>
				<View style={[estyle.fx1,estyle.fxRow]}>
					<ImgButton onPress={() => this.goTo(News)}  src={require('../../assets/images/icon-9.png')} title="解放推荐"/>
                    <ImgButton onPress={() => this.goTo(MessageGoods, true)}  src={require('../../assets/images/icon-7.png')} title="货源信息"/>
                    { Env.isAndroid ? <ImgButton onPress={() => this.goTo(Bbs)}  src={require('../../assets/images/icon-8.png')} title="卡友论坛"/> : <ImgButton onPress={() => {}} src={require('../../assets/images/mask.png')}/>}
                </View>
			</View>
		);
	}
}

const basefont = Env.font.base;
const styles = StyleSheet.create({
    wrapper: {
        height:300 * basefont,
        backgroundColor:'yellow',
        zIndex:100
    }
})

export default connect(function (stores) {
	return {userStore: stores.userStore}
})(HomePage);