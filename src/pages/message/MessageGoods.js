/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
    ScrollView
} from 'react-native';

import WebView from '../../components/WebView';


import TopBanner from '../../components/TopBanner';

import Env from '../../utils/Env';
const estyle = Env.style;

export default class MessageGoods extends Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="货源信息"/>
				<WebView
					style={[Env.style.fx1]}
					showBanner={false}
					uri="https://www.lujing56.com/activities/goodsource/view/find_goods.html"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Env.color.bg
	},
	messageBox:{
		marginLeft:30 * Env.font.base,
		marginRight:30 * Env.font.base,
		marginTop:20 * Env.font.base,
		alignItems:'center',
	},
	messageDate:{
		backgroundColor:'#DDDDDD',
		borderRadius:6 * Env.font.base,
		paddingLeft:6 * Env.font.base,
		paddingRight:6 * Env.font.base
	},
	messageDateText:{
		color:'#FFF',
		fontSize:Env.font.note
	},
	messageBody:{
        borderWidth:1 * Env.font.base,
        borderColor:'#e5e5e5',
        paddingLeft:30 * Env.font.base,
        paddingRight:30 * Env.font.base,
        paddingTop:20 * Env.font.base,
        paddingBottom:20 * Env.font.base,
        borderRadius:10 * Env.font.base,
        marginTop:10 * Env.font.base,
		marginBottom:10 * Env.font.base,
		backgroundColor: '#FFF',
		width: Env.screen.width * .9
	},
	messageTitle:{
        fontSize:Env.font.articleTitle,
        color:Env.color.important
	},
	messageText:{
        marginTop:10 * Env.font.base,
        fontSize:Env.font.text,
        color:Env.color.text,
        lineHeight :30,
	}
});