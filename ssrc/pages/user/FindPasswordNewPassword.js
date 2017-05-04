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
import PasswordInput from '../../components/Inputs/Password';
import SubmitButton from '../../components/SubmitButton';
import Toast from '../../components/Toast';

import Login from './index';

import Env from '../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;

class FindPasswordNewPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			password: ''
		}
		//console.info(this.props.findPasswordStore.phoneInfo)
		this.phone = this.props.findPasswordStore.phoneInfo.phone;
		this.smsCode = this.props.findPasswordStore.phoneInfo.smsCode;
	}

	onModifyPassword(){
        if (PasswordInput.Validate(this.refs)) {
            this.props.dispatch(UserActions.findPasswordNewPassword(this.phone, this.state.password,this.smsCode, () => {
                Toast.show('恭喜您设置密码成功！', Toast.SHORT);
                setTimeout(() => {
                    this.props.router.resetTo(Login);
                },500);
            }));
        }
	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="忘记密码"/>
				<View  style={[estyle.fxRowCenter]}>
					<PasswordInput
						ref="password"
						defaultValue={this.state.password}
						style={[estyle.borderBottom, estyle.marginTop]}
						onChangeText={password => this.setState({password})}
						require={true}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<SubmitButton
						doing={this.props.findPasswordStore.type === TYPES.FINDPASS_STEP3_DOING}
						onPress={() => this.onModifyPassword()}>
						确定
					</SubmitButton>
				</View>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { findPasswordStore: stores.findPasswordStore}
})(FindPasswordNewPassword);