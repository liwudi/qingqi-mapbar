/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import PageList from '../../../components/PageList';

import ViewForRightArrow from '../../../components/ViewForRightArrow';
import Env from '../../../utils/Env';
import TopBanner from '../../../components/TopBanner';

const estyle = Env.style;

import { orderList } from '../../../services/ServiceStationService';

import ServiceStationAppointmentDetail from './ServiceStationAppointmentDetail';

export default class ServiceStationAppointmentList extends Component {
    constructor(props) {
        super(props);
    }

	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
			<TopBanner {...this.props} title="预约列表"/>
				<PageList
					style={[estyle.fx1]}
					renderRow={(row, sectionID, rowID) => {
						return (
							<ViewForRightArrow onPress={() => this.props.router.push(ServiceStationAppointmentDetail, {order: row})}>
								<Text style={[estyle.articleTitle]}>{row.stationName}</Text>
								<Text style={[estyle.text]}>{'工单号： '+ row.woCode}</Text>
								<View style={[estyle.fxRow]}>
									{/*{row.typeList.map((type, index) => <Text key={index}>{type.name}</Text>)}*/}
                                    <Text>{row.item}</Text>
									<Text style={[estyle.fx1]}></Text>
									<Text>{row.orderTime}</Text>
								</View>
							</ViewForRightArrow>
						)
					}}
					fetchData={(pageNumber, pageSize) => {
						return orderList(pageNumber, pageSize)
                            .then((res)=>{
						        let data={};
						     data.list=res;
						     return data
                        })
					}}
					noData="您没有预约记录"
				/>
			</View>
		);
	}
}