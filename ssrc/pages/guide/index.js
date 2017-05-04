// /**
//  * Created by ligj on 2016/10/9.
//  */
// import React, { Component } from 'react';
// import { View, Text, Navigator,ScrollView,StyleSheet} from 'react-native';
//
// import * as Icons from '../../components/Icons';
// import ViewForRightArrow from '../../components/ViewForRightArrow';
// import TripCalendar from '../../components/TripCalendar.android';
// import user from '../user/index'
// import Login from '../user/Login';
// import QuickLogin from '../user/QuickLogin';
// import SaveTrueName from '../user/SaveTrueName';
// import Reg from '../user/Reg';
// import RegCheckCode from '../user/RegCheckCode';
// import ServiceProvision from '../user/ServiceProvision';
// import FindPassword from '../user/FindPassword';
// import FindPasswordCheckCode from '../user/FindPasswordCheckCode';
// import FindPasswordNewPassword from '../user/FindPasswordNewPassword';
//
// import AccountHome from '../userCenter/account-config/AccountHome';
// import ModifyTrueName from '../userCenter/account-config/ModifyTrueName';
// import ModifyPassword from '../userCenter/account-config/ModifyPassword';
// import ModifyMobileNewMobile from '../userCenter/account-config/ModifyMobileNewMobile';
// import ModifyAvatar from '../userCenter/account-config/ModifyAvatar';
// import ModifyMobile from '../userCenter/account-config/ModifyMobile';
//
// import HomeRouter from '../HomeRouter';
// import HomePage from '../home/HomePage';
// import TripAnalysisList from '../home/trip-analysis/TripAnalysisList';
// import TripDetail from '../home/trip-analysis/TripDetail';
// import TripLine from '../home/trip-analysis/TripLine';
// import OilConsumptionList from '../home/trip-analysis/OilConsumptionList';
// import ServiceStationList from '../home/service-station/ServiceStationList';
// import RangeOptionList from '../home/service-station/components/RangeOptionList'
// import TypeOptionList from '../home/service-station/components/TypeOptionList'
// import ServiceStationMap from '../home/service-station/ServiceStationMap';
// import ServiceStationDetail from '../home/service-station/ServiceStationDetail';
// import ServiceStationEvaluate from '../home/service-station/ServiceStationEvaluate';
// import ServiceStationAppointment from '../home/service-station/ServiceStationAppointment';
// import ServiceStationAppointmentDetail from '../home/service-station/ServiceStationAppointmentDetail';
// import MaintenanceReminder from '../home/traffic-steward/MaintenanceReminder';
// import TrafficSteward from '../home/traffic-steward/TrafficSteward';
// import VehicleTestDetail from '../home/vehicle-test/VehicleTestDetail';
// import VehicleTestFaultCodeDetail from '../home/vehicle-test/VehicleTestFaultCodeDetail';
// import Call from '../home/call';
// import CustomerService from '../home/customer-service/CustomerService';
//
// import CarDetail from '../userCenter/my-car/CarDetail';
// import CarParameter from '../userCenter/my-car/CarParameter';
// import MyCar from '../userCenter/my-car/MyCar';
// import NoCar from '../userCenter/my-car/components/NoCar';
// import ModifyVehicleLicence from '../userCenter/my-car/ModifyVehicleLicence';
// import DriveLineMarkAnalysis from '../userCenter/my-car/DriveLineMarkAnalysis';
// import DriveLine from '../userCenter/my-car/DriveLine';
//
// import MyInfo from '../userCenter/my-info/MyInfo'
// import MyInfoId from '../userCenter/my-info/MyInfoId'
// import MyInfoDriveType from '../userCenter/my-info/MyInfoDriveType'
//
// import AddCar from '../userCenter/add-car/AddCar';
// import AddCarList from '../userCenter/add-car/AddCarList';
// import AddCarFind from '../userCenter/add-car/AddCarFind';
// import AddCarVinAdd from '../userCenter/add-car/AddCarVinAdd';
// /*import AddCarTdsFalse from '../userCenter/add-car/AddCarTdsFalse';
//
//
// import AddCarSelectCar from '../userCenter/add-car/AddCarSelectCar';
// import AddCarForVin from '../userCenter/add-car/AddCarForVin';
// import AddCarForVinStep2 from '../userCenter/add-car/AddCarForVinStep2';
// import AddCarForInvoiceNo from '../userCenter/add-car/AddCarForInvoiceNo';
// import AddCarForVinUploadInvoiceNo from '../userCenter/add-car/AddCarForVinUploadInvoiceNo';
// import WhereisVin from '../userCenter/add-car/WhereisVin';*/
//
// import MessageDetail from '../message/MessageDetail';
// import MessageList from '../message/MessageList';
//
// import AppointmentList from '../home/service-station/ServiceStationAppointmentList';
// import AppointmentDetail from '../home/service-station/ServiceStationAppointmentDetail';
//
// import AboutUs from '../userCenter/AboutUs';
//
// import UserCenterHome from '../userCenter/index';
//
// import ConfirmButton from '../../components/ConfirmButton.android';
// import CancelButton from '../../components/CancelButton.android';
// import ImgButton from '../../components/ImgButton.android';
//
// import LabelInput from '../../components/LabelInput.android';
// import PhoneChkCodeInput from '../../components/Inputs/PhoneChkCode';
//
//
// import TopBanner from '../../components/TopBanner.android';
// import Alert from '../../components/Modals/Alert';
// import IconAlert from '../../components/Modals/IconAlert';
// import StarGroup from '../../components/StarGroup.android';
// import PercentageCircle from '../../components/PercentageCircle.android';
//
// import TimePicker from  '../../components/picker/TimePicker.android'
// import DatePicker from  '../../components/picker/DatePicker.android'
//
// //todo 测试记得删
// import {areaCondition} from '../../services/ServiceStationService'
//
//
//
// export default class Guide extends Component {
// 	constructor(props){
// 		super(props);
// 		this.state = {
// 			alertActive: false,
// 			alertCActive: false,
// 			alertIconActive: false
// 		}
// 	}
// 	componentDidMount(){
// 		// areaCondition(1)
// 		// 	.then((data)=>{
// 		// 		console.log(data);
// 		// 	})
// 		// 	.catch((err)=>{
// 		// 		console.log(err);
// 		// 	})
// 	}
// 	toPage = (component) => {
// 		this.props.router.push(component);
// 	}
// 	render(){
// 		return (
// 			<ScrollView style={{flex:1, backgroundColor:'#eee'}}>
// 				<View>
//                     <Text style={{fontSize:18,color:'red'}}>组件</Text>
// 					<Text></Text>
// 					<View style={{flexDirection:'row'}}>
// 						<Icons.IconArrowDown />
// 						<Icons.IconArrowLeft/>
// 						<Icons.IconArrowRight/>
// 						<Icons.IconPlus/>
// 						<Icons.IconCall/>
// 						<Icons.IconSearch/>
// 						<Icons.IconMap/>
// 						<Icons.IconSearch/>
// 						<Icons.IconClose/>
// 						<Icons.IconLocation/>
// 						<Icons.IconList/>
// 						<Icons.IconUser/>
// 						<Icons.IconFire/>
// 						<Icons.IconBarcode/>
// 						<Icons.IconShare/>
// 						<Icons.IconCheckCircle/>
// 						<Icons.IconClock/>
// 						<Icons.IconRibbon/>
// 						<Icons.IconChainBroken/>
// 						<Icons.IconArrowUp/>
// 					</View>
// 					<Text>列表单项一</Text>
// 					<ViewForRightArrow><Text>默认是箭头。文字与电话之间有间距。样式是：有内边距，白色背景，有下边框。单项之间有间距，应该是通用值30</Text></ViewForRightArrow>
// 					<Text>列表单项二</Text>
// 					<ViewForRightArrow rightIcon={Icons.IconCall}><Text>换了个标，侧是电话，</Text></ViewForRightArrow>
//                     <Text/>
// 					<TripCalendar/>
// 					<Text/>
// 					<ConfirmButton size="large">大号按钮</ConfirmButton>
//                     <Text/>
// 					<ConfirmButton size="middle" disabled="true">中号按钮</ConfirmButton>
//                     <Text/>
// 					<ConfirmButton size="small">小号按钮</ConfirmButton>
//                     <Text/>
// 					<CancelButton size="middle">中号取消按钮</CancelButton>
//                     <Text/>
// 					<CancelButton size="small" disabled="true">小号取消按钮</CancelButton>
//                     <ImgButton src={require('../../assets/images/icon-1.png')} title="按钮文字"/>
//
// 					<ConfirmButton size="middle" onPress={TimePicker}>timepicker</ConfirmButton>
// 					<ConfirmButton size="middle" onPress={DatePicker}>datepicker</ConfirmButton>
// {/*
// 					<ImgButton uri="https://facebook.github.io/react/img/logo_og.png" title="按钮文字"/>
// */}
//
// 					<Text/>
// 					<StarGroup score={5} size={20}/>
// 					<StarGroup score={0} size={20}/>
// 					<StarGroup score={2.5} size={20}/>
//
// 					<Text/>
//
// 					<Text/>
//
// 					{/*<PhoneChkCodeInput*/}
// 						{/*style={{marginTop:5}}*/}
// 						{/*onChangeText={value => this.setFromData('code', value)}*/}
// 						{/*labelSize={3}*/}
// 					{/*/>*/}
// 					<LabelInput style={{marginTop:5}} label="密码" type="password" placeholder="输入密码"/>
// 					<LabelInput style={{marginTop:5,marginBottom:5}}
// 								label="手机"
// 								placeholder="输入手机号"
// 								rightView={<ConfirmButton size="small" onPress={(()=>{this.setState({alertActive:true})}).bind(this)}>获取验证码</ConfirmButton>}/>
// 					<ConfirmButton size="small" onPress={()=>{this.setState({alertActive:true})}}>普通alert</ConfirmButton>
// 					<Alert visible={this.state.alertActive} onConfirm={(()=>{this.setState({alertActive:false})})} onCancel={(()=>{this.setState({alertActive:false})})}>是否关闭?</Alert>
//
// 					<ConfirmButton size="small" onPress={()=>{this.setState({alertCActive:true})}}>自定义信息alert</ConfirmButton>
// 					<Alert visible={this.state.alertCActive}
// 						   title="删除线路"
// 						   confirmTitle="删除"
// 						   cancelTitle="再想想"
// 						   onConfirm={(()=>{this.setState({alertCActive:false})})}
// 						   onCancel={(()=>{this.setState({alertCActive:false})})}>
// 						删除线路，会将线路关联车辆信息一起删除，是否删除？
// 					</Alert>
// 					<Text></Text>
//
// 					<ConfirmButton size="small" onPress={()=>{this.setState({alertIconActive:true})}}>带ICON的alert</ConfirmButton>
//
// 					<IconAlert visible={this.state.alertIconActive}
// 							   icon={Icons.IconArrowUp}
// 						   title="应该有新版本了"
// 						   confirmTitle="立即更新"
// 						   cancelTitle="稍后再说"
// 						   onConfirm={(()=>{this.setState({alertIconActive:false})})}
// 						   onCancel={(()=>{this.setState({alertIconActive:false})})}>
// 						删除线路，会将线路关联车辆信息一起删除，是否删除？
// 					</IconAlert>
//
//
// 					<Text/>
//                     <TopBanner title="topbanner" leftTitle/>
//                     <Text/>
//                     <TopBanner title="topbanner"/>
//
//
// 				</View>
// 				<Text style={{fontSize:18,color:'red'}}>注册登录相关</Text>
// 				<Text  style={styles.over} {...this.props} onPress={() => {this.toPage(user)}}>0、登录</Text>
//
// {/*				<Text  style={styles.over} {...this.props} onPress={() => {this.toPage(Login)}}>1、手机密码登录</Text>
// 				<Text  style={styles.over} {...this.props} onPress={() => {this.toPage(QuickLogin)}}>2、手机快捷登录</Text>
// 				<Text  style={styles.over} {...this.props} onPress={() => {this.toPage(SaveTrueName)}}>3、输入真实姓名（快捷登录未填写姓名）</Text>
// 				*/}
// 				<Text  style={styles.over} {...this.props} onPress={() => {this.toPage(Reg)}}>4、注册</Text>
// {/*
// 				<Text  style={styles.over} {...this.props} onPress={() => {this.toPage(RegCheckCode)}}>5、注册（填写验证码）</Text>
// */}
// 				<Text  {...this.props} onPress={() => {this.toPage(ServiceProvision)}}>6、服务条款</Text>
// 				<Text  style={styles.over} {...this.props} onPress={() => {this.toPage(FindPassword)}}>7、找回密码</Text>
// 		{/*		<Text  style={styles.over} {...this.props} onPress={() => {this.toPage(FindPasswordCheckCode)}}>8、找回密码-填写短信验证码</Text>
// 				<Text  style={styles.over} {...this.props} onPress={() => {this.toPage(FindPasswordNewPassword)}}>9、找回密码-输入新密码</Text>
// 				<Text> </Text>*/}
// 				<Text style={{fontSize:18,color:'red'}}>首页相关</Text>
// 				<Text  style={styles.over} {...this.props} onPress={() => {this.toPage(HomeRouter)}}  >1、首页九宫格导航页</Text>
// 				<Text  style={styles.over} {...this.props} onPress={() => {this.toPage(TripAnalysisList)}} >2、行程分析列表</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(TripDetail)}}>3、行程详情</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(TripDetail)}}>4、行程轨迹</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(OilConsumptionList)}}>油耗排名</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(ServiceStationList)}} >5、服务站列表</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(ServiceStationList)}}>6、服务站搜索</Text>
// 				<Text style={styles.modify} {...this.props} onPress={() => {this.toPage(TypeOptionList)}}>7、按里程筛选</Text>
// 				<Text style={styles.modify} {...this.props} onPress={() => {this.toPage(RangeOptionList)}}>8、按类型筛选</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(ServiceStationList)}}>9、按距离排序</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(ServiceStationMap)}}>10、地图模式</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(ServiceStationDetail)}}>11、服务站详情</Text>
// 				<Text style={styles.modify} {...this.props} onPress={() => {this.toPage(ServiceStationAppointment)}}>12、服务站预约</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(ServiceStationAppointmentDetail)}}>12-1、服务站预约详情</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(ServiceStationEvaluate)}}>13、服务站评价</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(TrafficSteward)}}>14、行车管家页面</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(MaintenanceReminder)}}>15、保养提醒——delete</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(VehicleTestDetail)}}>16、体检结果页面(交互逻辑都完成)</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(VehicleTestFaultCodeDetail)}}>17、故障码详情——delete</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(Call)}}>18、一键呼救-常用</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(CustomerService)}}>21、联系客服</Text>
// 				<Text> </Text>
// 				<Text style={{fontSize:18,color:'red'}}>消息相关</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(MessageList)}}>1、消息列表</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(MessageDetail)}}>2、消息详情----delete</Text>
// 				<Text> </Text>
// 				<Text style={{fontSize:18,color:'red'}}>用户中心</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(UserCenterHome)}}>1、用户中心首页</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(AccountHome)}}>2、账号设置首页</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(ModifyAvatar)}}>3、头像修改</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(ModifyTrueName)}}>4、修改姓名</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(ModifyPassword)}}>5、修改密码</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(ModifyMobile)}}>6、更换绑定手机号-获取验证码</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(ModifyMobileNewMobile)}}>7、绑定新手机</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(NoCar)}}>8、我的车辆首页（无车辆）</Text>
// 				<Text style={styles.over}  {...this.props} onPress={() => {this.toPage(MyCar)}}>9、我的车辆首页（车辆列表）</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(CarDetail)}}>11、我的车辆详情</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(ModifyVehicleLicence)}}>12、修改车牌号</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(CarParameter)}}>13、车辆参数</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(DriveLine)}}>14、行驶线路</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(DriveLineMarkAnalysis)}}>16、行驶线路-标杆车辆-驾驶分析</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(AppointmentList)}}>17、预约列表</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(AppointmentDetail)}}>18、预约详情</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(Login)}}>19、版本更新</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(Login)}}>20、清除缓存</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(MyInfo)}}>我的资料</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(MyInfoId)}}>我的资料-身份证</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(MyInfoDriveType)}}>我的资料-驾驶类别选择</Text>
//
// 				<Text {...this.props} onPress={() => {this.toPage(AboutUs)}}>21、关于我们</Text>
// 				<Text> </Text>
// 				<Text style={{fontSize:18,color:'red'}}>添加车辆</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(AddCar)}}>1、添加一手车</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(AddCarList)}}>2、添加一手车-tds-true列表</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(AddCarFind)}}>3、找回车辆</Text>
// 				<Text style={styles.over} {...this.props} onPress={() => {this.toPage(AddCarVinAdd)}}>4、添加一手车-tds-true添加</Text>
// {/*
// 				<Text {...this.props} onPress={() => {this.toPage(AddCarSelectCar)}}>3、添加一手车-tds-true添加</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(AddCarSelectCar)}}>3、添加一手车-tds-true找回</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(AddCarTdsFalse)}}>4、添加一手车-tds-false-添加</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(AddCarForInvoiceNo)}}>4、添加一手车-tds-false-上传照片</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(AddCarSelectCar)}}>4、添加一手车-添加未关联车辆</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(AddCarForVin)}}>5、添加二手车（VIN）</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(WhereisVin)}}>6、VIN码在哪里页面</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(AddCarForVinStep2)}}>7、添加二手车-已有车主-找回</Text>
// 				<Text {...this.props} onPress={() => {this.toPage(AddCarForVinUploadInvoiceNo)}}>8、添加二手车-无车主-申请车主身份-上传发票</Text>
// */}
//
// 			</ScrollView>
// 		)
// 	}
// }
//
// const styles = StyleSheet.create({
// 	over:{
// 		color:'green',
// 		fontSize:18
// 	},
// 	modify: {
// 		color:'orange',
// 		fontSize:22
// 	},
// 	add: {
// 		color:'blue',
// 		fontSize:22
// 	}
// });