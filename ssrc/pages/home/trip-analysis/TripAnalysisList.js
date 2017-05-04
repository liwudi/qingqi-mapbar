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

import TopBanner from '../../../components/TopBanner';

import { IconArrowDown } from '../../../components/Icons';
import TripCalendar from '../../../components/TripCalendar';

import Env from '../../../utils/Env';

const uStyles = Env.style;
import Calendar from '../../../components/Calendar/CalendarStrip';

import ViewForRightArrow from '../../../components/ViewForRightArrow';

import PageList from '../../../components/PageList';
import {IconClock} from '../../../components/Icons';
import TripDetail from './TripDetail'
import {queryTripByDay, queryTripByMonth} from '../../../services/TripService'
import OilConsumptionList from './OilConsumptionList';
import Button from '../../../components/widgets/Button'

import moment from 'moment';

export default class TripAnalysisList extends Component {

	constructor(props){
		super(props);
		this.state = {
			date : moment(),
			events: []
		};
	}

	async fetchMonthData(month){
		try {
			let rs = await queryTripByMonth(month ? month : moment().format('YYYYMM'));
			this.setState({events: rs.list.map((r) => r.tripDate)})
		}catch (e){

		}
	}

	componentDidMount(){
	    this.refs.calendar.today();
		this.fetchMonthData();
	}

	goToOilList() {
		this.props.router.push(OilConsumptionList);
	}

	onMonthChange(month){
		this.fetchMonthData(month)
	}

	onDateSelected(date){
		this.setState({
			date
		});
	}

	render() {


		let data = this.state.data;
		return (
			<View style={[uStyles.fx1, uStyles.containerBackgroundColor]}>
				<TopBanner {...this.props} title="行程分析"
					rightView={<Button onPress={this.goToOilList.bind(this)}><Text style={[uStyles.text,{color:Env.color.navTitle}]}>油耗排行榜</Text></Button>}
				/>
				<Calendar
                    ref="calendar"
					events = {this.state.events}
					style={{backgroundColor:'#FFF'}}
					onMonthChange={this.onMonthChange.bind(this)}
					onDateSelected={this.onDateSelected.bind(this)}
					todayPress={() => {this.props.router.replace(TripAnalysisList)}}
				/>
				{
					data ? <View style={[uStyles.fxRow, uStyles.paddingVertical, uStyles.border, uStyles.cardBackgroundColor, uStyles.marginBottom]}>
						<View style={[uStyles.fx1,uStyles.fxRowCenter, uStyles.borderRight]}>
							<View>
								<Text style={[uStyles.articleTitle, {color:Env.color.main}]}>{data.dayLen}</Text>
								<Text style={[uStyles.text]}>当日总里程(km)</Text>
							</View>
						</View>
						<View style={[uStyles.fx1,uStyles.fxRowCenter]}>
							<View>
								<Text style={[uStyles.articleTitle, {color:Env.color.main}]}>{data.dayOil}</Text>
								<Text style={[uStyles.text]}>当日总油耗(L)</Text>
							</View>
						</View>
					</View> : <View/>
				}

				<PageList
					style={[uStyles.fx1]}
                    noData={'当日无行程'}
					renderRow={(row) => {
						return <TripItem {...this.props}  data={row} tripDate={this.state.date.format('YYYYMMDD')}/>
					}}
					fetchData={(pageNumber, pageSize) => {
						return queryTripByDay(pageNumber, pageSize, this.state.date.format('YYYYMMDD')).then((data)=>{
							this.setState({data:data});
						//	console.log(data)
							return data;
						});
					}}
					reInitField={[this.state.date]}
				/>
			</View>
		);
	}
}

const basefont = Env.font.base;

class TripItem extends Component {
	transTime(st) {
		st = new Date(st);
		return moment(st).format('HH:mm');
		//return `${st.getHours()}:${st.getMinutes()}`;
	}
	goToDetail() {
        this.goTimer && clearTimeout(this.goTimer);
        this.goTimer = setTimeout(() => {
            let startTime = moment(new Date(this.props.data.startTime)).format('YYYY-MM-DD HH:mm:ss'),
                endTime = moment(new Date(this.props.data.endTIme)).format('YYYY-MM-DD HH:mm:ss');
            //console.info(startTime, endTime, 'startTime, endTime')
            this.props.router.push(TripDetail, {
                nav: {
                    tripId: this.props.data.tripId,
                    tripDate: this.props.tripDate,
                    carId: this.props.data.carId,
                    beginDate: startTime,
                    endDate: endTime
                }
            });
        }, 300);
		//console.info(this.props.data)

	}
	render() {
		let data = this.props.data;
		return (
			<ViewForRightArrow onPress={this.goToDetail.bind(this)}>
				<View style={[uStyles.fxRow, uStyles.fxRowCenter]}>
					<IconClock size={Env.font.text} color={Env.color.note}/>
					<Text style={[uStyles.note, {marginLeft: basefont * 10}, uStyles.marginRight]}>{this.transTime(data.startTime)}-{this.transTime(data.endTIme)}</Text>
					<Text style={[uStyles.articleTitle, {color:Env.color.main}]}>{data.tripScore}</Text>
					<Text style={[uStyles.text, {color:Env.color.main}]}>分</Text>
				</View>
				<View style={[uStyles.fxRow]}>
					<View style={[uStyles.fx1, uStyles.fxRowCenter]}>
						<View>
							<Text style={[uStyles.text, {color:Env.color.important}]}>{data.tripLen}</Text>
							<Text style={[uStyles.note]}>里程</Text>
							<Text style={[uStyles.note]}>(km)</Text>
						</View>
					</View>
					<View style={[uStyles.fx1, uStyles.fxRowCenter]}>
						<View>
							<Text style={[uStyles.text, {color:Env.color.important}]}>{data.avgOil}</Text>
							<Text style={[uStyles.note]}>平均油耗</Text>
							<Text style={[uStyles.note]}>(L/100km)</Text>
						</View>
					</View>
					<View style={[uStyles.fx1, uStyles.fxRowCenter]}>
						<View>
							<Text style={[uStyles.text, {color:Env.color.important}]}>{data.avgSpeed}</Text>
							<Text style={[uStyles.note]}>平均速度</Text>
							<Text style={[uStyles.note]}>(km/h)</Text>
						</View>
					</View>
				</View>
			</ViewForRightArrow>
		)
	}
}
