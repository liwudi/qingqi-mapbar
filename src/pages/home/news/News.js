/**
 * Created by ligj on 2016/10/20.
 */
import React, { Component } from 'react';
import { View ,TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import TopBanner from '../../../components/TopBanner';

import Category from './Category';

import TabNavigator from '../../../components/TabNavigator';
import Toast  from '../../../components/Toast';

import Env from '../../../utils/Env';

import { getCategorys } from '../../../services/NewsService';

const estyle = Env.style;

export default class News extends Component {

    constructor(props){
        super(props);
        this.state = {
            categories:[],
            animating: true
        }
    }

    tabs = [];
    componentDidMount(){
        getCategorys()
            .then(res => {
                console.log(res)
                this.tabs = res.categories.map((category => {
                    return {
                        title: category.title,
                        component: Category,
                        props:{
                            ...category
                        }
                    }
                }));
                this.setState({})
            })
            .catch(e => {
                Toast.show(e.message, Toast.SHORT);
            })
    }

    render() {
        return (
            <View  style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="解放推荐"/>
                {this.tabs.length === 0 ? <ActivityIndicator style={[estyle.fx1]} animating={this.tabs.length === 0}/> : <TabNavigator {...this.props} tabs={this.tabs}/>}
            </View>
        );
    }
}