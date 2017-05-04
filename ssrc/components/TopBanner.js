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
	TouchableOpacity,
	PixelRatio,
	StatusBar
} from 'react-native';

import * as Icons from './Icons';

import Env from '../utils/Env';
const estyle = Env.style;

export default class TopBanner extends React.Component{
	static defaultProps = {
		leftShow: true,
		titleShow:true,
        NetIsConnected:true
	};
	constructor(props){
		super(props);
	}

	// componentWillReceiveProps(nextProps){
	// 	console.log(nextProps)
	// 	this.setState({});
	// }


	render (){
		const _renderLeft = () => {
			if(this.props.leftView){
				return this.props.leftView;
			}else if(this.props.leftShow){
				return (
					<TouchableOpacity style={estyle.topBtn} onPress={() => {this.props.onPress ? this.props.onPress(): this.props.doBack()}}>
						<Text style={estyle.navTitle}><Icons.IconArrowLeft color="#FFF" /></Text>
					</TouchableOpacity>
				)
			} else {
				return <Text/>
			}
		}
		const _renderTitle = () => {
			if(this.props.titleView){
				return <View style={[styles.textView, estyle.fxColumnCenter]}>
						{this.props.titleView}
					</View>
			}else if(this.props.titleShow){
				return (
					<View style={[styles.textView, styles.height,{flexWrap: 'nowrap',position:'absolute', width:Env.screen.width * .6,left:Env.screen.width * .2, top: 0}, estyle.fxColumnCenter]}>
						<Text style={[estyle.navTitle, {textAlign: 'center'}]}>{this.props.title}</Text>
					</View>
				)
			} else {
				return null;
			}
		}
		return (
			<View style={[estyle.iosStatusBarHeight, {backgroundColor: this.props.color || Env.color.main}]}>
				<View style={[styles.topBanner,styles.height]}>
					<StatusBar
						backgroundColor={ this.props.color || Env.color.main}
						hidden={false}
						barStyle={'light-content'}
					/>
					<View style = {[styles.backButton, styles.height, estyle.fxColumnCenter]}>
                        {_renderLeft()}
					</View>
                    {_renderTitle()}
					<View style = {[styles.nextButton, styles.height, estyle.fxRowCenter]} >
                        {this.props.rightView}
					</View>
				</View>
				{
                    this.props.NetIsConnected
						? null
						: <View style={[estyle.padding,estyle.fxRow,estyle.fxRowCenter,{backgroundColor:'#FDEDEE'}]}>
								<Icons.IconWaring size={Env.font.base * 40} color="#E55C5D"/>
								<Text style={[estyle.note,{marginLeft:Env.font.base * 40}]}>网络连接不可用</Text>
							</View>
				}

			</View>
		);
	}
}

// TopBanner.defaultProps = {
// 	leftShow: true
// };

const styles = StyleSheet.create({
	height: {
		height: 84 * Env.font.base
	},
	topBanner: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	textView:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
	},
	text: {
		fontSize: Env.font.navTitle,
		color:'#FFF'
	},
	titleText: {
		fontSize: Env.font.navTitle,
		color:'#FFF',
		textAlign: 'center'
	},
	backButton: {
		flex:1,
		paddingLeft: Env.font.base * 20
	},
	nextButton: {
		flex:1,
		paddingRight: Env.font.base * 20,
		justifyContent: 'flex-end',
		flexDirection:'row'
	},
	nextButtonText:{
		fontSize: Env.font.navTitle,
		color:'#FFF',
		textAlign:'right',
	}
});