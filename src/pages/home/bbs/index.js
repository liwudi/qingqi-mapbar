/**
 * Created by ligj on 2016/10/20.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { View ,TouchableOpacity, Text } from 'react-native';

import TopBanner from '../../../components/TopBanner';

import WebView from '../../../components/WebView';

import Env from '../../../utils/Env';

import ServerConfig from '../../../service-config/ServerConfig'

const estyle = Env.style;



class Bbs extends Component {
    constructor(props){
        super(props);
        let userStore = props.userStore.userInfo;

        this.state = {
            uri: `${ServerConfig.BBS_PAGE}?token=${encodeURIComponent(userStore.token)}&phone=${encodeURIComponent(userStore.phone)}`,
            page:{}
        }
    }

    doBack(){
        this.refs.webView.doBack();
    }

    render(){

        return (
            <View  style={[estyle.fx1,estyle.containerBackgroundColor]}>
                {/*<TopBanner
                    {...this.props}
                    title={"卡友论坛"}
                />*/}
                <WebView
                    ref="webView"
                    showBanner={true}
                    {...this.props}
                    uri = {this.state.uri}
                    onPageChange={(page) => {
                        this.setState({page});
                    }}
                />
            </View>
        )
    }
}

export default connect(function (stores) {
    return {userStore: stores.userStore}
})(Bbs);