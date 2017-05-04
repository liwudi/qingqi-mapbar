/**
 * Created by ligj on 2016/10/9.
 * edit by zhaidongyou on 2016/10/14
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import Env from '../../../utils/Env';
const estyle = Env.style;
import TopBanner from '../../../components/TopBanner';
export default class VehicleTestFaultCodeDetail extends Component {
	render() {
		return (
			<View style={{flex: 1}}>
				<TopBanner {...this.props} title="体检故障码详情"/>
				<ScrollView style={styles.container}>
					<View style={[estyle.cardBackgroundColor, estyle.paddingHorizontal]}>
						<View style={[estyle.fxRowCenter, estyle.fxRow, estyle.borderBottom, estyle.paddingVertical]}>
							<Text style={[estyle.fx1, estyle.text, {color: Env.color.auxiliary}]}>
								PO106 歧管绝对压力过高
							</Text>
						</View>
					</View>
					<View style={styles.view}>
						<View style={styles.view2}>
							<Text>可采取的措施</Text>
						</View>
						<Text style={[styles.label2]}>1、检修空气流量计</Text>
						<Text style={[styles.label2]}>2、空气滤清器</Text>
						<Text style={[styles.label2]}>3、检修进气管是否泄漏</Text>
						<Text style={[styles.label2]}>4、废气管是否泄露</Text>
					</View>
				</ScrollView>
			</View>

		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Env.color.bg
	},
	label2:{
		marginTop:20 *  Env.font.base,
		color:Env.color.important,
		fontSize:Env.font.text,
		marginLeft:30 * Env.font.base,
	},
	view:{
		marginTop:0  * Env.font.base,
		marginBottom:10  * Env.font.base,
		paddingTop:20 * Env.font.base,
		paddingBottom:20 * Env.font.base,
		paddingRight:30 * Env.font.base,
		borderBottomWidth:1 * Env.font.base,
		borderColor:'#e5e5e5',
		backgroundColor: '#FFF',
	},
	view2:{
		marginLeft:30 * Env.font.base,
		marginRight:30  * Env.font.base,
		paddingBottom:15 * Env.font.base
	}
});


