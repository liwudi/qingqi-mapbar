/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Navigator
} from 'react-native';

import TopBanner from '../../../components/TopBanner';

import CallForCommon from './CallForCommon';

import TabNavigator from '../../../components/TabNavigator';

import Env from '../../../utils/Env';
const estyle = Env.style;

const tabs = [
	{
		title:'常用',
		component: CallForCommon,
		props:{
			type: 1
		}
	},
	{
		title:'救援',
		component: CallForCommon,
		props:{
			type: 2
		}
	},
	{
		title:'保险公司',
		component: CallForCommon,
		props:{
			type: 3
		}
	}
];

export default class Call extends Component {
	render() {
		return (
			<View style={{flex:1}}>
				<TopBanner {...this.props} title="一键呼救"/>
				<TabNavigator {...this.props} tabs={tabs}/>
			</View>
		);
	}
}