/**
 * Created by linyao on 2016/12/26.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Navigator
} from 'react-native';

import TopBanner from '../../../components/TopBanner';

import NotUsed from './couponComponents/NotUsed';
import UsedCoupon from './couponComponents/UsedCoupon';
import OverdueCoupon from './couponComponents/OverdueCoupon';

import TabNavigator from '../../../components/TabNavigator';

import Env from '../../../utils/Env';
const estyle = Env.style;

const tabs = [
    {
        title:'待使用',
        component: NotUsed
    },
    {
        title:'已使用',
        component: UsedCoupon
    },
    {
        title:'已过期',
        component: OverdueCoupon
    }
];

export default class CouponList extends Component {
    render() {
        return (
            <View style={{flex:1,}}>
                <TopBanner {...this.props} title="我的优惠券"/>
                <TabNavigator {...this.props} tabs={tabs}/>
            </View>
        );
    }
}