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
	Image
} from 'react-native';

import {UserActions, TYPES} from '../../actions/index';

import { getCaptcha, CAPTCHA_TYPE_FIND_PASSWORD } from '../../services/UserService';

import TopBanner from '../../components/TopBanner';
import LabelInput from '../../components/LabelInput';
import SubmitButton from '../../components/SubmitButton';
import PhoneInput from '../../components/Inputs/Phone';
import Button from '../../components/widgets/Button'
import FindPasswordCheckCode from './FindPasswordCheckCode';

import Env from '../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;

class FindPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			phone:'',
			captcha:'',
			captchaImg: false,
			captchaUpdate: false,
            captchaImgUrl:null
		};
	}

	next = () => {
		this.props.router.replace(FindPasswordCheckCode);
	}
	err=()=>{
		this.setState({captchaImgUrl:getCaptcha(this.state.phone, CAPTCHA_TYPE_FIND_PASSWORD)})
	}

	onCheckCaptcha(){
		PhoneInput.Validate(this.refs) &&
		this.props.dispatch(UserActions.doFindPasswordCheckCaptcha(
			this.state.phone,
			this.state.captcha,
			this.next,
			this.err
		));
	}

	onPhoneChange(phone){
		phone && this.setState({phone});
		setTimeout(() => {
			if(this.refs.phone && this.refs.phone.validate(false)){
				this.setState({captchaImg:true,captchaImgUrl:getCaptcha(this.state.phone, CAPTCHA_TYPE_FIND_PASSWORD)});
			}else{
				this.setState({captchaImg:false});
			}
		},100);
	}

	componentDidMount(){
		this.onPhoneChange()
	}

	imgCapthCache = null;
	oldPhone = null;

	render() {

		let captcha = () => {
			if(this.state.captchaImg){
				if(this.oldPhone !== this.state.phone){
					this.oldPhone = this.state.phone;
                }
					this.imgCapthCache = <Button onPress={() => {this.oldPhone = ''; this.onPhoneChange(this.state.phone);}}><Image
						style={[Env.vector.captcha.size]}
						resizeMode={Image.resizeMode.cover}
						source={{uri: this.state.captchaImgUrl}}
					/></Button>;
				return this.imgCapthCache;
			}else{
				return <View/>
			}
		}

		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="找回密码"/>
				<View  style={[estyle.fxRowCenter]}>
					<PhoneInput
						ref="phone"
						defaultValue={this.state.phone}
						style={[estyle.marginTop, estyle.borderBottom]}
						onChangeText={phone => this.onPhoneChange(phone)}
						require={true}
						placeholder={'注册时所填手机'}
						labelSize="3"
					/>
					<LabelInput
						ref="captcha"
						style = {[estyle.borderBottom]}
						onChangeText={captcha => this.setState({captcha})}
						secureTextEntry={true}
						placeholder='图形验证码'
						label="验证码"
						labelSize="3"
						maxLength={6}
						rightView={captcha()}
						validates={[
							{require:true, msg: '请填写图形验证码'}
						]}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<SubmitButton
						size="large"
						onPress={() => this.onCheckCaptcha()}
						doing={this.props.findPasswordStore.type === TYPES.FINDPASS_STEP1_DOING}
					>
						下一步
					</SubmitButton>

				</View>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { findPasswordStore: stores.findPasswordStore }
})(FindPassword);