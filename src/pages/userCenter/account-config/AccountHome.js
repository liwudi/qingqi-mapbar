/**
 * Created by ligj on 2016/10/09.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Image

} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import SubmitButton from '../../../components/SubmitButton';
import Env from '../../../utils/Env';
const estyle = Env.style;
import Login from '../../user/index';
import ModifyMobile from './ModifyMobile';
import ModifyPassword from './ModifyPassword';
import ModifyTrueName from './ModifyTrueName';

import { UserActions, TYPES } from '../../../actions';

import { uploadUserPic } from '../../../services/UserService';

import Toast from '../../../components/Toast';

import ImagePickBotton from '../../../components/ImagePickButton';
import { logOutKefu } from '../../../utils/CommModule';

class AccountHome extends Component {

	constructor(props){
		super(props);
		this.state = {
			picSource:null
		}
	}

	goTo(page){
		this.props.router.push(page);
	}

	logout(){

        this.props.alert(
            '提示',
            '是否要退出登录？',
            [
                {
                    text:'确定',
                    onPress:() => {
                        logOutKefu(this.props.userStore.userInfo.userId);
                        this.props.dispatch(UserActions.logout(
                            () => {
                                this.props.router.resetTo(Login);
                            }
                        ))
                    }
                },
                { text:'取消' }
            ]
        );


	}

	updatePic = () => {
		this.refs.ImagePickBotton.show();
	}

	onImagePick = (imageSource) => {
		uploadUserPic(imageSource)
			.then(rs => {
                Toast.show('头像修改成功', Toast.SHORT);
                this.props.dispatch(UserActions.getUserPic());
			})
			.catch(e => {
				Toast.show(e.message, Toast.SHORT);
			});
	}

	render() {
		let userInfo = this.props.userStore.userInfo;
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="账号设置"/>
				<View>
					<ViewForRightArrow onPress={this.updatePic}>
						<View style={[estyle.fxRow, estyle.fxCenter]}>
							<Text style={[estyle.fx1, estyle.text]}>头像</Text>
							<Image
								resizeMode={Image.resizeMode.cover}
								style={{borderRadius:50 * Env.font.base,width:100 * Env.font.base,height:100 * Env.font.base,borderWidth:4 * Env.font.base,
									borderColor:Env.color.main}}
								source={this.props.userPicStore.userPic}
							/>
						</View>
					</ViewForRightArrow>
					<ViewForRightArrow onPress = {() => this.goTo(ModifyTrueName)}>
						<View style={[estyle.fxRow]}>
							<Text style={[estyle.fx1, estyle.text]}>姓名</Text><Text style={styles.text}>{userInfo.name || '未设置姓名'}</Text>
						</View>
					</ViewForRightArrow>
					<ViewForRightArrow onPress = {() => this.goTo(ModifyPassword)} style={[estyle.marginTop]}>
						<Text style={[estyle.text]}>修改密码</Text>
					</ViewForRightArrow>
					<ViewForRightArrow onPress = {() => this.goTo(ModifyMobile)}>
						<View style={[estyle.fxRow]}>
							<Text style={[estyle.fx1, estyle.text]}>已绑定手机</Text><Text style={styles.text}>{userInfo.phone ? `${userInfo.phone.substr(0, 3)}******${userInfo.phone.substr(9)}` : ''}</Text>
						</View>
					</ViewForRightArrow>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<View style={{alignItems:'center'}}>
						<SubmitButton
							size="large"
							doing={this.props.userStore.status === TYPES.LOGGED_DOING}
							onPress={(()=>{this.logout()})}
						>退出账户</SubmitButton>
					</View>
				</View>
				<ImagePickBotton ref="ImagePickBotton" onImagePick={this.onImagePick} maxWidth={200} maxHeight={200}/>
			</View>
		);
	}
}

export default connect(function (stores) {
	return {userStore: stores.userStore, userPicStore: stores.userPicStore}
})(AccountHome);


const styles = StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Env.color.bg
	},
	colorFFF :{
		color:'#FFF'
	},
	item:{

	},
	text:{
		fontSize:Env.font.text,
		color:Env.color.text
	}
});
