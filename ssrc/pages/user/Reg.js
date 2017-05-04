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

import { getCaptcha, checkMobile } from '../../services/UserService';
import Alert from '../../components/Modals/Alert';
import TopBanner from '../../components/TopBanner';
import LabelInput from '../../components/LabelInput';
import SubmitButton from '../../components/SubmitButton';
import PhoneInput from '../../components/Inputs/Phone';
import PasswordInput from '../../components/Inputs/Password';
import Toast from '../../components/Toast';

import RegCheckCode from './RegCheckCode';
import Login from './index';

import Env from '../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;
import Button from '../../components/widgets/Button';
import Agreement from './Agreement';

const getBLen = function(str) {
    if (str == null) return 0;
    if (typeof str != "string"){
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g,"01").length;
}

class Reg extends Component {
	constructor(props){
		super(props);
		this.state = {
			// phone:'15010053708',
            // trueName:'刘小花',
			// password:'123456',
            phone:'',
            trueName:'',
            password:'',
            captcha:'',
            captchaImg: false,
			alertActive: false,
            captchaImgUrl:null
		};
	}

	onPhoneBlur(){
        checkMobile(this.state.phone)
            .then((rs)=>{})
            .catch(e => {
                if(e.code === 1006){
                    this.phoneIsExist()
                }
            });
	}

	onChange(input){
		this.setState(input);
	}

	next = (regInfo) => {
        // this.props.dispatch(UserActions.sendRegCode(
        //     this.state.phone,
        //     this.state.captcha,
        //     false,
			// () => {
        //     	//Toast.show('验证码发送成功', Toast.SHORT);
			// }
        // ));
        this.props.router.replace(RegCheckCode, {regInfo});
    }
    err= ()=>{
        this.setState({captchaImgUrl:getCaptcha(this.state.phone)})
	}

    phoneIsExist = () => {
		this.setState({alertActive: true});
	}

	toQuick() {
		console.info(this.props)
		this.setState({alertActive:false});
		this.props.router.resetTo(Login, {initialIndex: 1, nav: {phone: this.state.phone}})
	}

	onReg(){
	    if(PhoneInput.Validate(this.refs)){
            if(getBLen(this.state.trueName) > 14){
                Toast.show('姓名不能超过7个汉字或14个字符', Toast.SHORT);
                return;
            }
            this.props.dispatch(UserActions.doRegCheckCaptcha(
                this.state.phone,
                this.state.trueName,
                this.state.password,
                this.state.captcha,
                this.next,
                this.err
            ));
		}
	}

	onPhoneChange(phone){
        phone && this.setState({phone});
        setTimeout(() => {
            if(this.refs.phone && this.refs.phone.validate(false)){
                this.setState({captchaImg:true,captchaImgUrl:getCaptcha(this.state.phone)});
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
				<TopBanner {...this.props} title="注册"/>
				<View  style={[estyle.fxRowCenter]}>
					<PhoneInput
						ref="phone"
                        defaultValue={this.state.phone}
						style={[estyle.marginVertical, estyle.borderBottom]}
						onChangeText={phone => this.onPhoneChange(phone)}
						require={true}
						labelSize="3"
						onBlur={this.onPhoneBlur.bind(this)}
					/>

					<LabelInput
                        ref="trueName"
                        defaultValue={this.state.trueName}
						style = {[estyle.borderBottom]}
						onChangeText={trueName => this.setState({trueName})}
						placeholder='请输入真实姓名'
						label="姓名"
						maxLength={14}
						labelSize="3"
						validates={[
							{require:true, msg:'请输入真实姓名'},
						]}
					/>

					<PasswordInput
						ref="password"
						defaultValue={this.state.password}
						style={[estyle.marginVertical, estyle.borderBottom]}
						onChangeText={password => this.setState({password})}
						require={true}
						placeholder='请输入6-20位字符'
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
						onPress={() => this.onReg()}
						doing={this.props.regStore.status === TYPES.REG_STEP1_DOING}
					>下一步</SubmitButton>

					<View style={[estyle.fxRow, {alignItems:'flex-start'}, estyle.paddingTop]}>
						<Text style={[estyle.note, {fontSize: Env.font.mini}]}>注册视为同意</Text>
						<Button onPress={()=>{this.props.router.push(Agreement)}}>
							<Text style={[{color:Env.color.main, fontSize: Env.font.mini}]}>服务条款和隐私政策</Text>
						</Button>
					</View>
				</View>
				<Alert visible={this.state.alertActive}
					   title="提示"
					   confirmTitle="快捷登录"
					   cancelTitle="取消"
					   onConfirm={(()=>{this.toQuick()})}
					   onCancel={(()=>{this.setState({alertActive:false})})}>
					该手机已被注册，您可以手机快捷登录！
				</Alert>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { regStore: stores.regStore }
})(Reg);