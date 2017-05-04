/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	NativeModules
} from 'react-native';
const SystemSetting = NativeModules.SystemSettingModule;
//console.info(SystemSetting)
import TopBanner from '../../components/TopBanner';
import CancelButton from '../../components/CancelButton';
import Env from '../../utils/Env';
const estyle = Env.style;
import {IconChainBroken} from '../../components/Icons';
import ModalBox from '../../components/widgets/Modal';

export default class NetError extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		}
	}
	toSetting() {
		SystemSetting.openNetWork();
	}
	renderNetError () {
		return <View style={[estyle.fx1]}>
			<TopBanner title="网络请求失败" leftShow={false}/>
			<View style={[estyle.fx1, estyle.fxCenter, estyle.marginBottom]}>
				<IconChainBroken size={Env.font.base *160} color={Env.color.note}/>
				<Text style={[estyle.articleTitle, {color:Env.color.text, textAlign: 'center'}, estyle.marginTop]}>网络请求失败</Text>
				<Text style={[estyle.text, estyle.paddingVertical, {textAlign:'center', color: Env.color.note}]}>请检查您的网络设置</Text>
				<CancelButton size="middle" onPress={this.toSetting}>去设置</CancelButton>
			</View>
		</View>;
	}


	componentWillReceiveProps(props){
		//props.visible &&
		this.setState({visible: props.visible, random: Math.random()});
	}
	render() {
/*		console.info(9999999)
		console.info(this.state)*/
		return (
			<ModalBox style={[estyle.fx1, estyle.containerBackgroundColor]}
					  onClose={()=>{this.setState({visible: false});}}
					  visible={this.state.visible}>
				{this.renderNetError()}
				<Text style={[estyle.articleTitle, estyle.marginVertical]}>&nbsp;</Text>
			</ModalBox>
		);
	}
}