/**
 * Created by cryst on 2016/10/16.
 * edit by zhaidongyou on 2016/10/18
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ListView,
    Image
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import OilConsumptionListMonth from './OilConsumptionListMonth';
import OilConsumptionListYesterday from './OilConsumptionListYesterday';
import TabNavigator from '../../../components/TabNavigator';
const tabs = [
    {
        title:'昨日排行榜',
        component: OilConsumptionListYesterday
    },
    {
        title:'本月排行榜',
        component: OilConsumptionListMonth
    }
];
export default class OilConsumptionList extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style ={styles.body}>
                <TopBanner {...this.props} title="油耗TOP10"/>
                <TabNavigator {...this.props} tabs={tabs}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:Env.color.bg
    }
});

