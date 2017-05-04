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
import CarModelLength from './components/CarModelLength';
import TopBanner from '../../../components/TopBanner';
import SubmitButton from '../../../components/SubmitButton';
import Env from '../../../utils/Env';
const estyle = Env.style;

export default class SetProvince extends Component {
	constructor(props) {
        super(props);
        this.state = {
            carModel: this.props.carModel || 0,
            carLength: this.props.carLength || 0
        }
    }

    onConfirm () {
        this.props.set(this.state);
        this.props.router.pop();
    }

	render() {
		return (
            <View style={[estyle.fx1, estyle.cardBackgroundColor]}>
                <TopBanner {...this.props} title='车型车长'/>
                <Text style={[estyle.padding, estyle.note]}>选择车型</Text>
                <CarModelLength type="model" onPress={carModel => this.setState({carModel})} select={this.state.carModel}/>
                <Text style={[estyle.padding, estyle.note]}>选择车长（米）</Text>
                <CarModelLength onPress={carLength => this.setState({carLength})} select={this.state.carLength}/>
                <View  style={[estyle.fxRowCenter, estyle.marginVertical]}>
                    <SubmitButton size="large" onPress={() => this.onConfirm()}>确定</SubmitButton>
                </View>
            </View>
		);
	}
};