/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ConfirmButton from '../../../components/ConfirmButton';
import Env from '../../../utils/Env';
const estyle = Env.style;

export default class AddCarFind extends Component {
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="添加车辆"/>
                <View style={[estyle.fxRowCenter]}>
                    <Text style={[estyle.paddingVertical, estyle.note]}>这辆车已经有车主，您可以选择</Text>
                    <ConfirmButton size="large">向原车主取回身份</ConfirmButton>
                    <ConfirmButton size="large" style={[estyle.marginVertical]}>申请认证车主身份</ConfirmButton>
                </View>
            </View>
        );
    }
}
const basefont = Env.font.base;
const styles = StyleSheet.create({
    size: {
        width: basefont * 120,
        height: basefont * 44,
    },
    btn: {
        borderWidth: basefont * 2,
        borderRadius: basefont * 5
    }

});