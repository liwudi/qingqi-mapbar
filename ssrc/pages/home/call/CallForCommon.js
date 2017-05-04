/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
	ListView
} from 'react-native';

import ViewForRightArrow from '../../../components/ViewForRightArrow';
import { IconCall } from '../../../components/Icons';
import Env from '../../../utils/Env';
const estyle = Env.style;
import { queryUrgentCall } from '../../../services/AppService';
import Toast from '../../../components/Toast';

import PageList from '../../../components/PageList';

export default class CallForCommon extends Component {

	constructor(props){
		super(props);
	}

	call(phone){
		this.props.callTo(phone);
//		Toast.show(phone,Toast.SHORT)
	}

	render() {
		return (
			<PageList
				style={[estyle.cardBackgroundColor, estyle.fx1]}
				renderRow={(call, sectionID, rowID) => {
					return (
						<ViewForRightArrow
							onPress={() => this.call(call.tel)}
							rightIcon={IconCall}
							iconSize={Env.vector.call.size}
							iconColor={Env.color.main}
						>
							<Text style={[estyle.text,{color:this.props.type == 1 && rowID == 0 ? 'red' : Env.color.text}]}>{call.name}</Text>
							<Text style={[estyle.text, {color:Env.color.note}]}>{call.tel}</Text>
						</ViewForRightArrow>
					)
				}}
				fetchData={(pageNumber, pageSize) => {
					return queryUrgentCall(pageNumber, pageSize, this.props.type)
				}}
			/>
		);
	}
}
/*
 *<ListView
 dataSource={this.state.ds}
 renderRow={(call) => (
 <ViewForRightArrow
 onPress={() => this.call(call.phone)}
 style={styles.item}
 rightIcon={IconCall}
 iconSize={60 * Env.font.base}
 iconColor={Env.color.main}
 >
 <Text style={[styles.callName,{color:this.props.type == 1 ? 'red' : Env.color.text}]}>{call.name}</Text>
 <Text style={styles.callPhone}>{call.phone}</Text>
 </ViewForRightArrow>
 )}
 renderFooter={() => {
 if(this.state.pageTotal <= this.pageNumber){
 return null;
 } else {
 return <View><Text onPress={() => this.nextPage()}>加载更多</Text></View>
 }
 }}
 />
 *//*
const styles = StyleSheet.create({
	container: {
		flex:1,
		marginTop:90 * Env.font.base,
		backgroundColor:Env.color.bg
	},
	item:{
		paddingTop:14 * Env.font.base,
		paddingBottom:14 * Env.font.base,
		paddingHorizontal:30 * Env.font.base,
		borderBottomWidth:1 * Env.font.base,
		borderColor:'#e5e5e5',
		backgroundColor:'#FFF'
	},
	callName:{
		color:Env.color.text,
		fontSize:Env.font.text
	},
	callPhone:{
		color:Env.color.note,
		fontSize:Env.font.text
	}
});*/