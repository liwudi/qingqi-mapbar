/**
 * Created by linyao on 2016/12/26.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Navigator
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import PageList from '../../../components/PageList';
import ViewForRightArrow from '../../../components/ViewForRightArrow';

import {recordList} from '../../../services/ServiceStationService';
import CouponRecordDetail from './CouponRecordDetail';

import Env from '../../../utils/Env';
const estyle = Env.style;

export default class CouponRecord extends Component {
    render() {
        return (
            <View style={[estyle.fx1,estyle.cardBackgroundColor]}>
                <TopBanner {...this.props} title="消费记录"/>
                <PageList
                    style={[estyle.cardBackgroundColor, estyle.fx1]}
                    renderRow={(row) => {
					return (
						<ViewForRightArrow onPress={()=>{this.props.router.push(CouponRecordDetail,{recordId:row.id})}}>
                            <View style={[estyle.fxRow,estyle.fxCenter]}>
                                <Text style={[estyle.articleTitle,estyle.fx1]}>{row.provider}</Text>
                                <Text style={[estyle.note]}>{row.consumerTime}</Text>
                            </View>
                            <View style={[estyle.fxRow,estyle.fxCenter,estyle.marginTop]}>
                                <Text style={[estyle.articleTitle,estyle.fx1,{color:Env.color.main}]}>{row.tradeNum}</Text>
                                <Text style={[estyle.text]}>{row.usedUser}</Text>
                            </View>
						</ViewForRightArrow>
					)
				}}
                    fetchData={(pageNumber, pageSize) => {
					    return recordList(pageNumber, pageSize,this.props.coupon,this.props.vin)
				}}
                />
            </View>
        );
    }
}