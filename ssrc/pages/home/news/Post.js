/**
 * Created by ligj on 2016/10/20.
 */
import React, { Component } from 'react';
import { View ,TouchableOpacity, Text } from 'react-native';

import TopBanner from '../../../components/TopBanner';

import WebView from '../../../components/WebView';

import Env from '../../../utils/Env';

const estyle = Env.style;

export default class News extends Component {
    constructor(props){
        super(props);
        this.state = {
            uri: 'http://219.146.249.190:10106/',
            page:{}
        }
    }

    doBack(){
        this.refs.webView.doBack();
    }

    render(){

        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner {...this.props}
                           title={"解放推荐"}
                           doBack={this.doBack.bind(this)}
                />
                <WebView
                    ref="webView"
                    showBanner={false}
                    {...this.props}
                    uri = {this.props.post.url}
                />
            </View>
        )
    }
}