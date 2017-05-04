/**
 * Created by linyao on 2016/10/22.
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

export default class UpdateDriverCard extends Component {
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="添加车辆"/>
                <View style={[estyle.fxRowCenter]}>
                    <ConfirmButton size="large">请上传汽车行驶证照片或购车发票照片</ConfirmButton>
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