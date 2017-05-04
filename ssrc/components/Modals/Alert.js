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

export default class Alert extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ModalBox visible={this.props.visible} onClose={this.props.onCancel} title="alert弹窗" style={[estyle.fxCenter]}>
                <View style={[estyle.cardBackgroundColor, {width:Env.font.base * 540, borderRadius: Env.font.base * 10}]}>
                    <Text style={[estyle.articleTitle, estyle.borderBottom, estyle.paddingVertical, {color:Env.color.auxiliary, textAlign:'center'}]}>{this.props.title || '温馨提示'}</Text>
                    <Text style={[estyle.text, estyle.marginHorizontal]}>{this.props.children}</Text>
                    <View style={[estyle.fxRow, estyle.fxCenter]}>
                        <ConfirmButton size="small" style={[estyle.margin]} onPress={this.props.onConfirm}>{this.props.confirmTitle || '确定'}</ConfirmButton>
                        {this.props.showCancel == false ? null
                             : <CancelButton size="small" style={[estyle.margin]} onPress={this.props.onCancel} >{this.props.cancelTitle||'取消'}</CancelButton>}
                    </View>
                </View>
            </ModalBox>
        );
    }
}

export class Alert2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: '',
            content: '',
            buttons: []
        }
    }

    alert(title, content, buttons = []){
        this.setState({
            visible: true,
            title,
            content,
            buttons: buttons.length === 0 ? [{text:'确定'}] : buttons
        })
    }

    _onPress(press){
        this.setState({
            visible: false,
            title: '',
            content: '',
            buttons: []
        });
        press && press();
    }

    render() {
        return (
            <ModalBox
                onClose={() => {}}
                visible={this.state.visible}
                style={[estyle.fxCenter]}
            >
                <View style={[estyle.cardBackgroundColor, {width:Env.font.base * 540, borderRadius: Env.font.base * 10}]}>
                    <Text
                        style={[estyle.articleTitle, estyle.borderBottom, estyle.paddingVertical, {color:Env.color.auxiliary, textAlign:'center'}]}
                    >
                        {this.state.title}
                        </Text>
                    <Text style={[estyle.text, estyle.marginHorizontal, estyle.marginTop]}>
                        {this.state.content}
                    </Text>
                    <View style={[estyle.fxRow, estyle.fxCenter]}>
                        {this.state.buttons.map((button, index) => {
                            let Button = index === 0 ? ConfirmButton : CancelButton;
                            return <Button key={index}
                                size="small"
                                style={[estyle.margin]}
                                onPress={() => this._onPress(button.onPress)}>
                                {button.text}
                            </Button>
                        })}
                    </View>
                </View>
            </ModalBox>
        );
    }
}