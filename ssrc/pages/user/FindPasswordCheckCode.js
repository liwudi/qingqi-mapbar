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
	StyleSheet
} from 'react-native';

import { UserActions, TYPES } from '../../actions/index';

import TopBanner from '../../components/TopBanner';
import PhoneChkCodeInput from '../../components/Inputs/PhoneChkCode';
import SubmitButton from '../../components/SubmitButton';
import SendMobileCode from '../../components/Inputs/SendMobileCode';
import FindPasswordNewPassword from './FindPasswordNewPassword';
import { findPasswordReSendCode } from '../../services/UserService';
//import Toast from '../../components/Toast';

import Env from '../../utils/Env';


const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;

class FindPasswordCheckCode extends Component {
	constructor(props){
		super(props);
		this.phone = this.props.findPasswordStore.phoneInfo.phone;
	}

	sendCode(){
		return findPasswordReSendCode(this.phone);
	}

	next(){
		if(this.refs.code.validate()){
			 this.props.dispatch(UserActions.findPasswordCheckSmsCode(this.phone, this.state.code, () => {
			 //   Toast.show('验证码已发送', Toast.SHORT);
			    this.timeOut=setTimeout(()=>{
                    this.props.router.replace(FindPasswordNewPassword);
                },500)
			 }))
		}
	}
    componentWillUnmount(){
        this.timeOut && clearTimeout(this.timeOut);
    }

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="忘记密码"/>
				<View  style={[estyle.fxRowCenter]}>

					<Text style={[estyle.marginTop,{flex:1,textAlign:'center',color:Env.color.note,fontSize:Env.font.note}]}>已发送短信验证码到</Text>
					<Text style={{flex:1,textAlign:'center',color:Env.color.important,fontSize:Env.font.navTitle}}>+86 {this.phone}</Text>
                    <SendMobileCode
                        ref="code"
                        style={[estyle.borderBottom,estyle.marginTop]}
                        onChangeText={code => this.setState({code})}
                        sendCode = {this.sendCode.bind(this,true)}
                        autoFocus={true}
                        isWaiting={true}
                    />

					{/*<PhoneChkCodeInput
						ref="code"
						style={[estyle.borderBottom, estyle.marginTop]}
						onChangeText={code => this.setState({code})}
						sendCode = {this.sendCode.bind(this)}
						sendCodeStatus = {this.props.sendCodeStatus}
						autoFocus={true}
					/>*/}
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<SubmitButton
						doing={this.props.findPasswordStore.type === TYPES.FINDPASS_STEP2_DOING}
						onPress={() => this.next()}>下一步</SubmitButton>
				</View>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { findPasswordStore: stores.findPasswordStore , sendCodeStatus : stores.sendCodeStore }
})(FindPasswordCheckCode);