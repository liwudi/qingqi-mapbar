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

import { UserActions, TYPES } from '../../../actions/index';
import { modifyPassword } from '../../../services/UserService';
import { getToken, setToken } from '../../../service-config/RequestService';

import TopBanner from '../../../components/TopBanner';
import PasswordInput from '../../../components/Inputs/Password';
import SubmitButton from '../../../components/SubmitButton';
import Toast from '../../../components/Toast';
import FindPassword from '../../user/FindPassword';
import Login from '../../user/index';

import Env from '../../../utils/Env';

const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;

class ModifyPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			doing: false
		};
	}

	modifyPassword(){
		// PasswordInput.Validate(this.refs) && this.props.dispatch(UserActions.modifyPassword(
		// 	this.state.oldPassword,
		// 	this.state.newPassword,
		// 	() => {
		// 		this.props.router.pop();
		// 	}
		// ));
		if(PasswordInput.Validate(this.refs)){
			if(this.state.oldPassword == this.state.newPassword){
				Toast.show('新密码和当前密码一致，请重新输入', Toast.SHORT);
				return;
			}
			this.setState({doing: true});
			modifyPassword(this.state.oldPassword,this.state.newPassword)
				.then((rs) => {
					let _t = getToken();
					_t.token = rs.token;
					setToken(_t);
					Toast.show('密码修改成功', Toast.SHORT);
					setTimeout(() => {
						this.props.router.pop();
					},1000);
				})
				.catch((e) => {
					Toast.show(e.message, Toast.SHORT);
					this.setState({doing: false});
				});
		}

	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="修改密码"/>
				<View  style={styles.loginView}>
					<View style={[Env.style.paddingHorizontal, Env.style.paddingTop]}>
						<Text style={{textAlign:'left',color:Env.color.note,fontSize:Env.font.note}}>
							如果忘记或未设置过登录密码，请点击 <Text onPress={() => this.props.router.push(FindPassword)} style={{color: Env.color.main}}>忘记密码</Text> 通过已绑定的手机验证并设置新密码。
						</Text>
					</View>

					<PasswordInput
						ref="oldPassword"
						style={[estyle.marginTop, estyle.borderBottom]}
						onChangeText={oldPassword => this.setState({oldPassword})}
						placeholder='当前密码'
						labelSize={3}
						validates={[
							{require:true, msg: '请输入当前密码'},
							{pattern:pattern.password, msg: '当前密码请输入6-20位半角字符，建议数字、字母、符号组合'}
						]}
					/>
					<PasswordInput
						ref="newPassword"
						style={[estyle.marginTop, estyle.borderBottom]}
						onChangeText={newPassword => this.setState({newPassword})}
						label="新密码"
						labelSize={3}
						validates={[
							{require:true, msg: '请输入新密码'},
							{pattern:pattern.password, msg: '新密码请输入6-20位半角字符，建议数字、字母、符号组合'}
						]}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<SubmitButton
						doing={this.state.doing}
						onPress={() => this.modifyPassword()}>确定</SubmitButton>
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
	return { modifyPasswordStore: stores.modifyPasswordStore }
})(ModifyPassword);