/**
 * Created by ligj on 2016/9/23.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	StyleSheet,
    Keyboard
} from 'react-native';

import { UserActions, TYPES } from '../../actions/index';

import TopBanner from '../../components/TopBanner';
import SubmitButton from '../../components/SubmitButton';
import PhoneChkCodeInput from '../../components/Inputs/PhoneChkCode';
import SendMobileCode from '../../components/Inputs/SendMobileCode';
import { regSendCode } from '../../services/UserService';
import Home from '../HomeRouter';

import Env from '../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;

class RegCheckCode extends Component {
	constructor(props){
		super(props);
	}


	next = () => {
        Keyboard.dismiss();
		this.props.router.resetTo(Home,{
			showAddCarMessage: true
		})
	}

	onReg(){
        SendMobileCode.Validate(this.refs) && this.props.dispatch(UserActions.doReg(
			this.props.regInfo.phone,
			this.props.regInfo.trueName,
			this.props.regInfo.password,
			this.state.smsCode,
			this.next
		));
	}

	sendCode(isReSend = false){
        return  regSendCode(this.props.regInfo.phone, this.props.regInfo.captcha, isReSend)
	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="注册"/>
				<View style={[estyle.fxRowCenter]}>
					<Text style={[estyle.marginTop, estyle.note]}>发送短信验证码到</Text>
					<Text style={[estyle.marginBottom, {color:Env.color.important,fontSize:Env.font.navTitle}]}>+86 {this.props.regInfo.phone}</Text>
                    <SendMobileCode
                        ref="smsCode"
                        style={[estyle.borderBottom]}
                        onChangeText={smsCode => this.setState({smsCode})}
                        sendCode = {this.sendCode.bind(this,true)}
                        autoFocus={true}
                    />
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<SubmitButton
						doing={this.props.regStore.status === TYPES.REG_STEP1_DOING}
						onPress={() => this.onReg()}>
						注册
					</SubmitButton>
				</View>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { regStore: stores.regStore , sendCodeStatus : stores.sendCodeStore}
})(RegCheckCode);