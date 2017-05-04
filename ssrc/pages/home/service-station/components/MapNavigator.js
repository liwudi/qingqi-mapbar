/**
 * Created by ligj on 2016/10/13.
 */
import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

export default class MapNavigator extends Component {
    static defaultProps = {
        isSwipe: true,
        initialIndex:0,
        onChangeTab: () => {}
    }
    constructor(props){
        super(props);
        // props.tabs = props.tabs.map((item, index) => {
        //     item.index = index;
        //     item.props = item.props || {};
        //     return item;
        // })
    }

    changeTab(index){

    }

    render(){
        return (
            <Navigator
                initialRoute={this.props.tabs[this.props.initialIndex]}
                initialRouteStack={this.props.tabs}
                configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
                renderScene={(route, navigator) => {
                    return route.component;
                }}
            />
        );
    }
}