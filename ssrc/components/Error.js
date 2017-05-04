/**
 * Created by ligj on 2016/11/7.
 */
import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Navigator,Image
} from 'react-native';

import Env from '../utils/Env';
import TopBanner from './TopBanner';
import CancelButton from './CancelButton';
const estyle = Env.style;


export default class Error extends React.Component{
    render (){
        return (
            <View style={[estyle.fx1]}>
                <View style={[estyle.fx1, estyle.fxCenter, estyle.marginBottom,estyle.marginTop]}>
                    <Image style={[{width: Env.font.base * 343, height: Env.font.base * 199}]} source={require('../assets/images/data-error.png')}/>
                    <Text style={[estyle.articleTitle, {color:Env.color.text, textAlign: 'center'}, estyle.marginVertical]}>数据加载失败</Text>
                    <CancelButton size="middle" onPress={() => {this.props.onPress()}}>重新加载</CancelButton>
                </View>
            </View>
        );
    }
}