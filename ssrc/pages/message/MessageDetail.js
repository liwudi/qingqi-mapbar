/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import TopBanner from '../../components/TopBanner';

export default class MessageDetail extends Component {
	render() {
		return (
			<View>
				<TopBanner {...this.props} title="消息详情"/>
				<Text>{JSON.stringify(this.props.message)}</Text>
			</View>
		);
	}
}