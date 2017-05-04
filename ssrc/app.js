'use strict';
import React, { Component } from 'react';
import { View, AppState, Text, Navigator } from 'react-native';

import Env from './utils/Env';


const estyle = Env.style;

import FirstPageComponent from "./FirstPageComponent.js";
export default class App extends Component {
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <Navigator
                    initialRoute={{name: 'My First Scene', component: FirstPageComponent}}
                    configureScene={(route) => {
                        return Navigator.SceneConfigs.VerticalDownSwipeJump;
                    }}
                    renderScene={(route,navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                    }}
                ></Navigator>
			</View>

		);
	}
}
