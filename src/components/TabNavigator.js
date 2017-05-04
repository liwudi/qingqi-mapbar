/**
 * Created by ligj on 2016/10/13.
 */
import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';
import TabBar from './TabBar';
import Env from '../utils/Env';

export default class TabNavigator extends Component {
    tabBar = null;
    static defaultProps = {
        isSwipe: true,
        initialIndex:0,
        onChangeTab: () => {}
    }
    constructor(props){
        super(props);
        props.tabs = props.tabs.map((item, index) => {
            item.index = index;
            item.props = item.props || {};
            return item;
        })
    }

    changeTab(index){
        this.tabBar.changeTab(index, false);

    }

    render(){
        return (
            <Navigator
                initialRoute={this.props.tabs[this.props.initialIndex]}
                initialRouteStack={this.props.tabs}
                navigationBar={<TabBar ref={(tabBar) => {this.tabBar = tabBar;}} tabs={this.props.tabs} />}
                configureScene={() => this.props.isSwipe ? Navigator.SceneConfigs.HorizontalSwipeJump : Navigator.SceneConfigs.FadeAndroid}
                onDidFocus={(router) => {
                    this.tabBar.changeTab(router.index, false)
                    this.props.onChangeTab(router.index);
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <View style={[{flex:1,paddingTop: Env.font.base * 84}]}>
                            <Component
                                {...this.props}
                                {...route.props}
                                navigator = {navigator}
                                changeTab = {this.changeTab.bind(this)}
                            />
                            </View>
                }}
            />
        );
    }
}