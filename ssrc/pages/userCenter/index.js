/**
 * Created by ligj on 2016/10/09.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
    Image,
    Alert,
    Linking
} from 'react-native';

import ViewForRightArrow from '../../components/ViewForRightArrow';

import Env from '../../utils/Env';
const estyle = Env.style;

import AccountHome from './account-config/AccountHome';
import MyCar from './my-car/MyCar';
import AppointmentList from '../home/service-station/ServiceStationAppointmentList';
import AboutUs from './AboutUs';

import { getAppVersion, checkUpdate, updateApp } from '../../services/UpdateService';

import MyInfo from './my-info/MyInfo';
import { UserActions } from '../../actions';
import CouponList  from './coupon/CouponList';
import { couponNum } from '../../services/ServiceStationService';
import TopBanner from '../../components/TopBanner';
import Toast from '../../components/Toast';
import MyInfoIndex from './my-info/MyInfoIndex';


class UserCenterHome extends Component {

    constructor(props){
        super(props);
        this.ridx = null;
        this.stopRequest = false;
        this.state = {
            userData: {},
            versionName : '',
            versionCode : '',
            isUpdate:false
        };
        this.props.dispatch(UserActions.getUserPic());
    }

    goTo(page){
        this.props.router.push(page);
    }

    _checkUpdate(isShowTip = true){
        checkUpdate().then(rs => {
            if(rs['version_no'] > this.state.versionCode){
                this.setState({
                    isUpdate:true
                })
                if(isShowTip){
                    updateApp(rs, this.props.alert,true);
                }
            } else {
                isShowTip && Toast.show('暂无更新', Toast.SHORT);
            }
        });
    }

    componentDidMount(){
        getAppVersion().then(v => {
            this.setState({
                versionName : v.versionName,
                versionCode : v.versionCode
            })
        });
        //this.props.dispatch(UserActions.getCouponNum());
        this.getCouponNum();
        Env.isAndroid && this._checkUpdate(false);
    }
    shouldComponentUpdate(props) {
        let cidx = props.router.currentIndex();
        if(this.ridx === null) this.ridx = cidx;
        if (!this.props.userStore.userInfo.token){
            if (this.timer) this.timer = null;
            return false;
        }
        if(cidx === this.ridx) {
            //因为请求是异步的，添加延时，防止2次请求才会停止
            this.timer=setTimeout(()=>{
                if(!this.stopRequest){
                    this.getCouponNum();
                    //this.props.dispatch(UserActions.getCouponNum());
                }
            },500)
        }else{
            this.stopRequest = false;
        }
        return true;
    }

    componentWillUnmount(){
        this.ridx = null;
        this.stopRequest = false;
        if(this.timer) this.timer=null;
    }
    //获取优惠券数量
    getCouponNum(){
        couponNum().then((data) => {
            this.setState({coupon: data.num})
        }).catch((err) => {
            Toast.show(err.message, Toast.SHORT);
        }).finally(()=>{
            this.stopRequest = true;
        })
    }

    clearCache(){
        this.props.alert(
            '提示',
            '是否要清除应用缓存？',
            [
                {text: '确定', onPress: () => {
                    Toast.show('缓存清除成功', Toast.SHORT);
                }},
                {text: '取消'}
            ]
        )
    }

	render() {
        let userInfo = this.props.userStore.userInfo;
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner
                    {...this.props}
                    title="我的"
                    leftShow={false}
                />
                <ViewForRightArrow
                    activeOpacity={1}
                    style={[{backgroundColor:Env.color.main}]}
                    onPress = {() => this.goTo(AccountHome)}
                    iconColor='#FFF'
                >
                    <View style={[estyle.fxRow]}>
                        <Image
                            style={{borderRadius:50 * Env.font.base,width:100 * Env.font.base,height:100 * Env.font.base,borderWidth:4 * Env.font.base,
                            borderColor:Env.color.main}}
                            source={this.props.userPicStore.userPic}
                        />
                        <View style={{justifyContent:'center',marginLeft:20 * Env.font.base}}>
                            <Text style={[estyle.articleTitle,styles.colorFFF]}>{userInfo.name || '未设置姓名'}</Text>
                            <Text style={[estyle.articleTitle,styles.colorFFF]}>{userInfo.phone ? `${userInfo.phone.substr(0, 3)}******${userInfo.phone.substr(9)}` : ''}</Text>
                        </View>
                    </View>
                </ViewForRightArrow>
                <ViewForRightArrow style={[estyle.marginTop]} onPress = {() => this.goTo(MyCar)}>
                    <Text style={estyle.text}>我的车辆</Text>
                </ViewForRightArrow>
                <ViewForRightArrow onPress={() => this.goTo(MyInfo)}>
                    <Text style={estyle.text}>资料认证</Text>
                </ViewForRightArrow>
                {/*<ViewForRightArrow onPress={() => this.goTo(MyInfoIndex)}>
                 <Text style={estyle.text}>资料认证</Text>
                 </ViewForRightArrow>*/}
                <ViewForRightArrow onPress = {() => this.goTo(AppointmentList)}>
                    <Text style={estyle.text}>我的预约</Text>
                </ViewForRightArrow>
                <ViewForRightArrow style={[estyle.marginBottom]}  onPress = {() => this.goTo(CouponList)}>
                    <View style={[estyle.fxRow]}>
                        <Text style={[estyle.text,estyle.fx1]}>我的优惠券</Text>
                        <Text style={[estyle.text,{color:Env.color.main}]}>{this.state.coupon}</Text>
                    </View>
                </ViewForRightArrow>
                {
                    Env.isAndroid ? <ViewForRightArrow onPress={this._checkUpdate.bind(this)}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={estyle.text}>版本更新</Text>
                                {this.state.isUpdate ? <Text style={[estyle.text,{color:'red'}]}> new</Text> : null}
                                <Text style={[estyle.text,estyle.fx1, {textAlign:'right'}]}>{this.state.versionName}</Text>
                            </View>
                        </ViewForRightArrow>: null
                }

                <ViewForRightArrow onPress={this.clearCache.bind(this)}>
                    <Text style={estyle.text}>清除缓存</Text>
                </ViewForRightArrow>
                <ViewForRightArrow onPress = {() => this.goTo(AboutUs)}>
                    <Text style={estyle.text}>关于我们</Text>
                </ViewForRightArrow>
			</View>
		);
	}
}

export default connect(function (stores) {
    return {userStore: stores.userStore, userPicStore: stores.userPicStore,couponStore:stores.couponStore}
})(UserCenterHome);

const styles = StyleSheet.create({
    colorFFF :{
        color:'#FFF'
    }
});