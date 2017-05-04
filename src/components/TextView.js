/**
 * Created by ligj on 2016/10/9.
 */
import React from 'react';

import {
	StyleSheet,
	Text,
} from 'react-native';

import Env from '../utils/Env';

const fontSize = {
	min: Env.font.min,
	normal: Env.font.base,
	large: Env.font.large,
	max: Env.font.max,
}

export default class TextView extends React.Component{
	static FONT_SIZE_MIN = 'min';
	static FONT_SIZE_NORMAL = 'normal';
	static FONT_SIZE_LARGE = 'large';
	static FONT_SIZE_MAX = 'max';
	constructor(props){
		super(props);
	}
	render (){
		const _size = typeof this.props.size === 'number' ? this.props.size : (fontSize[this.props.size] || fontSize.normal)
		return (
			<Text style={{...this.props.style, fontSize: _size}}>
				{this.props.children}
			</Text>
		);
	}
}
