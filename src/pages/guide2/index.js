/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import { View, Text,StyleSheet,Image} from 'react-native';
import {connect} from 'react-redux';

import { setToken } from '../../service-config/RequestService';
import { UserActions } from '../../actions/index';

import Login from '../user/index';
import HomeRouter from '../HomeRouter';
import ModifyTrueName from '../userCenter/account-config/ModifyTrueName';
import SplashScreen from 'react-native-splash-screen';

class Guide2 extends Component {
	constructor(props){
		super(props);

	}
	closeSplashScreen () {
		SplashScreen.hide();
	}
	async componentDidMount(){
		global.setToken = setToken;
		global.storage.load({
			key: 'token',
			autoSync: false,
		})
		.then((rs) => {
			rs = rs || {};
			let token = rs.token;
			if(token){
				setToken({
					token: rs.token,
					userId: rs.userId
				});
				this.props.dispatch(UserActions.checkToken(
					(userInfo) => {
						this.props.router.resetTo(userInfo.name ? HomeRouter : ModifyTrueName);
						this.closeSplashScreen();
					},
					() => {
						this.props.router.replace(Login);
						this.closeSplashScreen();
					})
				);
			}
		})
		.catch((e) => {
			this.props.router.replace(Login);
			this.closeSplashScreen();
		});


	}
	toPage = (component) => {
		this.props.router.push(component);
	}

	render(){
		return (
			<View>
				{/*<Image style={{width:Env.screen.width,height:Env.screen.height}} source={require('../../assets/images/startup.png')}/>*/}
			</View>

		)
	}
}

export default connect(function (stores) {
	return {userStore: stores.userStore}
})(Guide2);