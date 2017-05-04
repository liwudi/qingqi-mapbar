/**
 * Created by cryst on 2016/10/11.
 */
/**
 * Created by cryst on 2016/10/11.
 */
import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet, Modal} from 'react-native';

import Env from '../../utils/Env';
const estyle = Env.style;

const color = Env.button.color.confirm;
export default class ModalAndroid extends Component {
    static defaultProps = {
        onClose: () => {}
    }
    render() {
        return <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.props.visible}
            onRequestClose={this.props.onClose}
        >
            <View style={[estyle.fx1, {backgroundColor: Env.color.modalBg}, this.props.style]}>
                {this.props.children}
            </View>
        </Modal>
    }
}