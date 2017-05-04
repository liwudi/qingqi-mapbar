/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';

export default class AddCarForVinStep2 extends Component {
	render() {
		return (
			<View>
				<TopBanner {...this.props} title="添加二手车2"/>
			</View>
		);
	}
}