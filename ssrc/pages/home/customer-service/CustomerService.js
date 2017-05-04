/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
	Text,
	View,
	TouchableOpacity,
    NativeModules
} from 'react-native';

import Env from '../../../utils/Env';

var CommonModule = NativeModules.CommonModule;
const estyle = Env.style;

import TopBanner from '../../../components/TopBanner';

import { choiceCustomer } from '../../../services/AppService';

class CustomerService extends Component {
    componentDidMount(){
        choiceCustomer().then(rs => {
        	console.log(this.props.userStore.userInfo.userId,
                rs.userId,
                "1",
                rs.token)
            CommonModule.startKefuActivity(
            	this.props.userStore.userInfo.userId,
				rs.userId,
				"1",
                rs.token
			);
		});
	}
	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="客户服务"/>
			</View>
		);
	}
}

export default connect(function (stores) {
    return {userStore: stores.userStore}
})(CustomerService);