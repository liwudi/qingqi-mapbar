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
    ActivityIndicator
} from 'react-native';

import { UserActions,TYPES } from '../../actions/index';

import PhoneInput from '../../components/Inputs/Phone';
import TopBanner from '../../components/TopBanner';
import LabelInput from '../../components/LabelInput';
import SubmitButton from '../../components/SubmitButton';
import Button  from '../../components/widgets/Button';
import ModifyTrueName from '../userCenter/account-config/ModifyTrueName';
import HomeRouter from '../HomeRouter';
import Env from '../../utils/Env';
import Agreement from './Agreement';
import { fastLoginSendCode } from '../../services/UserService';
import SendMobileCode from '../../components/Inputs/SendMobileCode';
import { logOutKefu } from '../../utils/CommModule';

const estyle = Env.style,
    emsg = Env.msg.form,
    pattern = Env.pattern;


class QuickLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone: (this.props.nav || {}).phone,
            code: ''
        }
    }

    next = (userInfo) => {
        this.props.router.resetTo(userInfo.name ? HomeRouter : ModifyTrueName);
        logOutKefu(userInfo.userId);
    }

    vertify() {
        return LabelInput.Validate(this.refs);
    }

    sendCode(){
        if(this.refs.phone.validate()) {
            return fastLoginSendCode(this.state.phone)
        }
    }

    onLogin() {
        if(this.vertify()) {
            this.props.dispatch(UserActions.doQuickLogin(this.state.phone, this.state.code, this.next));
        }
    }

    render() {
        return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<View
					style={[estyle.fxRowCenter]}
				>
					<PhoneInput
						ref="phone"
						style={[estyle.marginTop, estyle.borderBottom]}
						onChangeText={phone => this.setState({phone})}
						defaultValue={this.state.phone}
						labelSize={3}
						require={true}
					/>
					<SendMobileCode
						ref="code"
						style={[estyle.borderBottom]}
						onChangeText={code => this.setState({code})}
						sendCode = {this.sendCode.bind(this)}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<SubmitButton
						onPress={() => this.onLogin()}
						doing={this.props.userStore.status === TYPES.LOGGED_DOING}
					>登录</SubmitButton>
					<View style={[estyle.fxRow, {alignItems:'flex-start'}, estyle.paddingTop]}>
						<Text style={[{fontSize: Env.font.mini}]}>注册视为同意</Text>
						<Button onPress={()=>{this.props.router.push(Agreement)}}>
							<Text style={[{color:Env.color.main, fontSize: Env.font.mini}]}>服务条款和隐私政策</Text>
						</Button>
					</View>
				</View>
			</View>
        );
    }
}

export default connect(function(stores) {
    return {
        userStore: stores.userStore,
        sendCodeStatus: stores.sendCodeStore
    }
})(QuickLogin);