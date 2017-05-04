/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
    ScrollView
} from 'react-native';

import BaseBtn  from '../../../../components/widgets/Button';
import Env from '../../../../utils/Env';
const estyle = Env.style;

export default class Button extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<BaseBtn style={[estyle.fxCenter, styles.btn,estyle.border,
                this.props.selectBg && styles.selectBg,
                this.props.selectBd && styles.selectBd,

            ]}{...this.props}
            >
                <Text style={[{textAlign: 'center'}, estyle.text, this.props.selectBg && styles.selectBgFont]}>{this.props.title}</Text>
            </BaseBtn>
		);
	}
}

let margin = 10 * Env.font.base,
    width = (Env.screen.width - 8 - margin * 5) / 4,
    height = Env.font.base * 68;

const styles = StyleSheet.create({
    btn: {
        width: width,
        height: height,
        marginLeft: margin,
        marginTop: margin,
        ...estyle.containerBackgroundColor
    },
    selectBd: {
        borderColor: Env.color.main,
        backgroundColor: '#ffffff'
    },
    selectBgFont: {
        color: '#ffffff'
    },
    selectBg: {
        backgroundColor: Env.color.main,
    }
});