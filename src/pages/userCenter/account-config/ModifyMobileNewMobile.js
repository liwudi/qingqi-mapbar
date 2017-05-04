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

import { changeBindSendCode, bindMobile, checkMobile, SEND_SMS_TYPE_BIND_NEW } from '../../../services/UserService';

import PhoneInput from '../../../components/Inputs/Phone';
import TopBanner from '../../../components/TopBanner';
import SubmitButton from '../../../components/SubmitButton';
import SendMobileCode from '../../../components/Inputs/SendMobileCode';

import Toast from '../../../components/Toast';

import Env from '../../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;


class ModifyMobileNewMobile extends Component {
	constructor(props){
		super(props);
		this.userInfo = props.userStore.userInfo;
		this.state = {
			phone: '',
			doing: false
		}
	}

	onNext(){
		if(PhoneInput.Validate(this.refs)){
			this.setState({doing: true});
			bindMobile(this.state.phone, this.state.smsCode, this.props.phone, this.props.smsCode)
				.then(rs => {
					this.userInfo.phone = this.state.phone;
					this.setState({doing: false});
					this.props.router.pop();
				})
				.catch(e => {
					this.setState({doing: false});
					Toast.show(e.message || '系统异常，请稍后再试', Toast.SHORT);
				})
		}
	}

	sendSmsCode = () => {
		if(this.refs.phone.validate()){
            return checkMobile(this.state.phone)
				.then((rs)=>{
					console.log('validate', rs)
                    return changeBindSendCode(this.state.phone, SEND_SMS_TYPE_BIND_NEW)
				})
				.catch(e => {
					if(e.code === 1006){
						e.message = '该手机已经绑定其他账号，请先解绑';
					}
					return Promise.reject(e);
				});
		}else{
			return false;
		}
	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="绑定新手机"/>
				<View style={[estyle.fxRowCenter]}>
					<PhoneInput
						ref="phone"
						style={[estyle.marginTop, estyle.borderBottom]}
						defaultValue={this.state.phone}
						onChangeText={phone => this.setState({phone})}
						placeholder='要绑定的新手机'
						labelSize={3}
						require={true}
					/>
					<SendMobileCode
						ref="smsCode"
						style={[estyle.borderBottom]}
						onChangeText={smsCode => this.setState({smsCode})}
						sendCode={this.sendSmsCode}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<SubmitButton doing={this.state.doing} size="large" onPress={() => this.onNext()}>绑定</SubmitButton>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Env.color.bg
	},
	loginView:{
		alignItems:'center'
	},
	loginInput:{
		marginTop:10
	}

});


export default connect(function(stores) {
	return { userStore: stores.userStore }
})(ModifyMobileNewMobile);