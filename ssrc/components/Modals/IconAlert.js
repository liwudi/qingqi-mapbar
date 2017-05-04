/**
 * Created by cryst on 2016/10/11.
 */
import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet, Modal} from 'react-native';

import Env from '../../utils/Env';
import ModalBox from '../widgets/Modal';
import ConfirmButton from '../ConfirmButton'
import CancelButton from '../CancelButton';
const estyle = Env.style;
export default class ColorButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ModalBox visible={this.props.visible} onClose={this.props.onCancel} title="alert弹窗" style={[estyle.fxCenter]}>
                <View style={[estyle.cardBackgroundColor, {width:Env.font.base * 540, borderRadius: Env.font.base * 10}]}>
                    <View style={[estyle.fxRowCenter, estyle.marginTop, estyle.paddingBottom]}>
                        <this.props.icon size={60 * Env.font.base}/>
                    </View>
                    {
                        this.props.title &&
                        <Text style={[estyle.articleTitle, {color:Env.color.auxiliary, textAlign:'center'}, estyle.marginFontBottom]}>{this.props.title}</Text>

                    }
                    <Text style={[estyle.note, estyle.marginHorizontal]}>{this.props.children}</Text>
                    <View style={[estyle.fxRow, estyle.fxCenter]}>
                        <ConfirmButton size="small" style={[estyle.margin]} onPress={this.props.onConfirm}>{this.props.confirmTitle || '确定'}</ConfirmButton>
                        {
                            this.props.cancelTitle &&
                            <CancelButton size="small" style={[estyle.margin]} onPress={this.props.onCancel} >{this.props.cancelTitle}</CancelButton>
                        }
                    </View>
                </View>
            </ModalBox>
        );
    }
}