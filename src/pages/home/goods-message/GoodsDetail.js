/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { View ,TouchableOpacity, Text, WebView, Linking, ActivityIndicator } from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import ServerConfig from '../../../service-config/ServerConfig'
const estyle = Env.style;



class GoodsDetail extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount() {
        let props = this.props,
            userStore = props.userStore.userInfo;
        setTimeout(() => {
            this.setState({
                uri: `${ServerConfig.GOODS_PAGE}?_rid=${Math.random()}&token=${encodeURIComponent(userStore.token)}&userid=${encodeURIComponent(userStore.userId)}&goodssourceid=${props.nav.goodssourceid}&onlycode=${props.nav.onlycode}`
                //,uri: 'http://10.10.100.165:8000/goods.html'
            });
        }, 200);
    }
    openBrower(url) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Toast.show('打开浏览器失败', Toast.SHORT);
            }
        });
    }

    render(){
        console.info(this.state.uri)
        let funStr = `(function () {
            window.tf56 = window.tf56 || {};
            tf56.openBrower = function (url) {
                window.postMessage(url);
            }
        })();`;
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="货源详情"/>
                {
                    this.state.uri ?
                        <WebView
                            startInLoadingState={true}
                            javaScriptEnabled={true}
                            injectedJavaScript={funStr}
                            onMessage={(evt)=>{this.openBrower(evt.nativeEvent.data)}}
                            source={{uri: this.state.uri}}
                        /> : <ActivityIndicator style={estyle.fx1}/>
                }

            </View>
        )
    }
}

export default connect(function (stores) {
    return {userStore: stores.userStore}
})(GoodsDetail);