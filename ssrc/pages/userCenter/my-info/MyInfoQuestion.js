/**
 * Created by mapbar on 2017/2/24.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ListView,
    ScrollView
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;

class MyInfoQuestion extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="认证权益" />
                <View style={[estyle.padding]}>
                    <Text style={[estyle.marginBottom,estyle.text]}>资料认证后有什么好处？</Text>
                    <Text style={[estyle.text,estyle.marginBottom]}>1. 资料按货源提供方要求认证通过后，且“我的车辆”列表中已添加了车辆，就可以使用“货源信息”功能，查看海量真实货源信息。</Text>
                    <Text style={[estyle.text,estyle.marginBottom]}>2. 查看货源详情对认证项的要求：陆鲸：真实姓名、身份证号</Text>
                    <Text style={[estyle.text,estyle.marginBottom]}>3. 享受更多促销活动及优质的个性化服务。</Text>
                </View>
            </View>
        )
    }
}

export default MyInfoQuestion