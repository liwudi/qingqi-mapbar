/**
 * Created by ligj on 2016/9/26.
 */
import React from 'react';

import {
	View,
	StyleSheet,
	Text,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import IconButton from './widgets/IconButton';

import Env from '../utils/Env';

export default class MainNavBar extends React.Component{
	static defaultProps = {
        changeTab: () => {}
	}

	constructor(){
		super();

		this.state = {
			currentIndex:0
		}
	}
	changeTab = (index, isJump = true) => {
		this.setState({currentIndex:index});
		isJump && this.props.changeTab(index, this.props.navigator)
	}
	render (){
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.flexCenter} onPress={() => this.changeTab(0)}>
					<IconButton color={this.state.currentIndex === 0 ? Env.color.main : Env.color.text} iconName="ios-home-outline" title="首页"/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.flexCenter} onPress={() => this.changeTab(1)}>
					<IconButton sign={this.props.sign} color={this.state.currentIndex === 1 ? Env.color.main : Env.color.text}  iconName="ios-chatboxes-outline" title="消息"/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.flexCenter} onPress={() => this.changeTab(2)}>
					<IconButton color={this.state.currentIndex === 2 ? Env.color.main : Env.color.text}  iconName="ios-contact-outline" title="我的"/>
				</TouchableOpacity>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		// position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		// height:50,
		flexDirection:'row',
		backgroundColor:'#F0F0F0',
		paddingVertical:Env.font.base * 6
	},
	flexCenter:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	select:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#3E7990'
	}
});