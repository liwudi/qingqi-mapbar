/**
 * Created by ligj on 2016/9/26.
 */
import React from 'react';

import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Navigator
} from 'react-native';

import { IconArrowRight, IconArrowLeft } from './Icons';
import Env from '../utils/Env';
import * as DateUtil from '../utils/Date';

const eStyles = Env.style;

const weekDays = ['一','二','三','四','五','六','日'];
let nowWeekStart = getWeekStart();
let preWeekStart = getPreWeekDay(nowWeekStart);
let nextWeekStart = getNextWeekDay(nowWeekStart);

export default class TripCalendar extends React.Component{
	nav = null;
	constructor(props){
		super(props);

		this.state = {
			selectDate: new Date(),
			weeks : bulidWeekData()
		}
	}
	selectDay(e, selectDay) {
		this.setState({
			selectDate: selectDay
		})
	}
	_onDidFocusCount = 0;
	_onDidFocus(slide){
		console.log(slide)
		if(slide.index === 0){

		}
		if(slide.index === 2 && this._onDidFocusCount === 0){
			this._onDidFocusCount += 1;
			nowWeekStart = nextWeekStart;
			preWeekStart = getPreWeekDay(nowWeekStart);
			nextWeekStart = getNextWeekDay(nowWeekStart);
			// this.setState({
			// 	weeks : bulidWeekData()
			// });
			let _week = bulidWeekData();
			this.nav.immediatelyResetRouteStack(_week);
			// this.nav.jumpTo(_week[1]);
		}
	}
	render (){
		return (
			<View style={[this.props.style, eStyles.fx1, styles.wrapper]}>
				<View style={[eStyles.fxRow, eStyles.fxCenter]}>
					<IconArrowLeft/>
					<Text style={[eStyles.articleTitle]}>2016年8月</Text>
					<IconArrowRight/>
				</View>
				<Navigator
					ref={(nav) => this.nav = nav}
					initialRoute={this.state.weeks[1]}
					initialRouteStack={this.state.weeks}
					configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
					onDidFocus={this._onDidFocus.bind(this)}
					renderScene={(week, navigator) => {
						return (
							<View style={styles.slide}>
								<View style={{flexDirection:'row'}}>
									{week.weekDays.map((day, index) => {
										return (
											<TouchableOpacity onPress={(e) => this.selectDay(e, day.date)} key={index} style={{flex:1,alignItems:'center'}}>
												<View style={caleDate(this.state.selectDate, day.date) ? styles.day : styles.day2}>
													<Text>{weekDays[index]}</Text>
													<Text>{day.date.getDate()}</Text>
												</View>
												<View style={day.mark ? styles.dot : styles.dot2}></View>
											</TouchableOpacity>
										)
									})}
								</View>
							</View>
						)
					}}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	wrapper: {
		height:40
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
	},
	day:{width:40,height:40,backgroundColor:'#169ada',borderRadius:100,alignItems:'center'},
	day2:{width:40,height:40,backgroundColor:null,borderRadius:100,alignItems:'center'},
	dot: {
		marginTop:6,
		width:8,
		height:8,
		backgroundColor:'#999999',
		borderRadius:100
	},
	dot2: {
		marginTop:6,
		width:8,
		height:8,
		backgroundColor:null,
		borderRadius:100
	}
});

function getWeekStart()
{
	let now = new Date();
	let begin = null;
	if(now.getDay() > 0){
		begin = now.getTime() - 1000 * 60 * 60 * 24 * (now.getDay()-1)
	} else {
		begin = now.getTime() - 1000 * 60 * 60 * 24 * 6
	}
	return new Date(begin);
}
function getPreWeekDay(date) {
	return new Date(date.getTime() - 1000 * 60 * 60 * 24 * 7);
}
function getNextWeekDay(date) {
	return new Date(date.getTime() + 1000 * 60 * 60 * 24 * 7);
}
function caleDate(date1, date2) {
	return DateUtil.format(date1, 'yyyy-MM-dd') === DateUtil.format(date2, 'yyyy-MM-dd');
}
function bulidWeekData() {
	return [
		{
			index:0,
			weekDays: weekDays.map((day, index) => {
				return {
					date: DateUtil.cale(preWeekStart,'d', index)
				};
			})
		},
		{
			index:1,
			weekDays: weekDays.map((day, index) => {
				return {
					date: DateUtil.cale(nowWeekStart,'d', index),
					mark:true
				};
			})
		},
		{
			index:2,
			weekDays: weekDays.map((day, index) => {
				return {
					date: DateUtil.cale(nextWeekStart,'d', index)
				};
			})
		}
	]
}
