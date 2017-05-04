/**
 * Created by ligj on 2016/9/26.
 */
import React from 'react';

import {
	View,
	StyleSheet,
	Text,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import { IconArrowRight } from './Icons';
import Env from '../utils/Env';
const estyle = Env.style;
export default class ViewForRightDom extends React.Component{
	render (){
		const _renderRightDom = () => {
			if(this.props.rightDom){
				return this.props.rightDom;
			} else {
				return null;
			}
		}
		return (
			<View style={[estyle.fxRow, estyle.fxRowCenter, estyle.cardBackgroundColor, estyle.paddingHorizontal, estyle.borderBottom,this.props.style]} >
				<View style={[estyle.fx1, estyle.marginVertical]}>{this.props.children}</View>
				<View style={[estyle.fxColumnCenter, estyle.paddingLeft]}>{_renderRightDom()}</View>
			</View>
		);
	}
}
