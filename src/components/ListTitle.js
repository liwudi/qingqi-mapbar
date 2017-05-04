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

import Env from '../utils/Env';
const estyle = Env.style;


export default class ListTitle extends React.Component{
	render (){
		return (
			<Text style={[estyle.paddingTop, estyle.paddingLeft, estyle.marginFontBottom, estyle.text, this.props.style]}>{this.props.title}</Text>
		);
	}
}