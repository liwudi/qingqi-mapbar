/**
 * Created by linyao on 2016/12/26.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import  PageList from '../../../../components/PageList';
import  {couponList} from '../../../../services/ServiceStationService';
import CouponDetail from '../CouponDetail';

import Env from '../../../../utils/Env';
const estyle = Env.style;

export default class NotUsed extends Component {
    constructor(props) {
        super(props);
    }
    goDetail(id,sum){
        this.props.router.push(CouponDetail,{couponId:id,sum:sum});
    }

    render() {
        return (
            <PageList
                style={[estyle.fx1,{backgroundColor:Env.color.bg}]}
                noData={'暂无优惠券'}
                renderRow={(row) => {
					return (
					    <View style={[estyle.padding]}>
					       <TouchableOpacity activeOpacity={0.8} style={[estyle.cardBackgroundColor,{overflow:'hidden',position:'relative'}]} onPress={()=>{this.goDetail(row.id,row.sum)}}>
				               <View style={[estyle.padding,{backgroundColor:Env.color.auxiliary}]}>
				                   <Text numberOfLines={1} style={[estyle.articleTitle,{color:Env.color.navTitle}]}>{row.couponName}</Text>
				                   <Text numberOfLines={1} style={[estyle.note,{color:Env.color.navTitle}]}>{row.couponContent}</Text>
                               </View>
                               <View style={[estyle.fxRow,estyle.paddingVertical]}>
                                    <View style={[estyle.fx1,estyle.fxCenter,estyle.fxRow]}>
                                        <Text style={[estyle.txt]}>余额: </Text><Text style={[estyle.articleTitle,{color:Env.color.auxiliary}]}>{(row.sum-row.usedNum)+row.unit}</Text>
                                    </View>
                               </View>
                               <View style={[estyle.marginHorizontal,estyle.paddingTop,estyle.borderTop]}>
                                   <Text numberOfLines={1} style={[estyle.note]}>总额：{row.sum+row.unit}</Text>
                               </View>
                               <View style={[estyle.marginHorizontal]}>
                                   <Text numberOfLines={1} style={[estyle.note]}>活动名称：{row.activityName}</Text>
                               </View>
                               <View style={[estyle.fxRow,estyle.paddingBottom,estyle.marginHorizontal]}>
                                    <Text style={[estyle.fx1,estyle.note]}>使用有效期：{row.startDate+'至'+row.endDate}</Text>
                                    <View style={{backgroundColor:Env.color.main,borderRadius:basefont*5,paddingHorizontal:basefont* 4}}>
                                        <Text style={[estyle.note,{color:'#fff'}]}>{row.carUsed}</Text>
                                     </View>
                               </View>
                               {
                                   row.effectiveEnd || row.effectiveEnd === 0 ? <View style={[styles.effectiveEnd,estyle.fxCenter]}>
                                    <Text style={[{fontSize:Env.font.mini,color:Env.color.navTitle}]}>剩余{row.effectiveEnd}天</Text>
                               </View> : null
                               }
			                </TouchableOpacity>
                        </View>
					)
				}}
                fetchData={(pageNumber, pageSize) => {
					return couponList(pageNumber, pageSize,1)
				}}
            />
        );
    }
}
const basefont = Env.font.base;
const styles = StyleSheet.create({
    effectiveEnd: {
        position:'absolute',
        transform: [{rotate:'45deg'}],
        width:200*basefont,
        height:40*basefont,
        top:25*basefont,
        right:-50*basefont,
        backgroundColor:'red'
    }
})