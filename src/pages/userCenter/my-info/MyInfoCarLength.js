/**
 * Created by mapbar on 2017/2/24.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import LabelInput from '../../../components/LabelInput';
import Env from '../../../utils/Env';
import SubmitButton from '../../../components/SubmitButton';
import Toast from '../../../components/Toast';

class MyInfoCarLength extends Component {
    constructor(props){
        super(props);
        this.state = {
            doing: false
        };
    }

    componentWillMount() {
        this.setState({carLength: this.props.data.carLength});
    }

    onSave() {
        if (LabelInput.Validate(this.refs)) {
            if(this.state.carLength <= 99){
                if(this.props.data.carLength === this.state.carLength) {
                    this.props.router.pop();
                    return;
                }
                this.setState({doing:true});
                if(this.props.successFun){
                    this.props.successFun({carLength:this.state.carLength})
                        .then(()=>{
                            this.props.router.pop();
                        })
                        .catch((err)=>{
                            Toast.show(err.message,Toast.SHORT);
                        })
                        .finally(()=>{
                            this.setState({doing:false});
                        })
                }
            }else {
                Toast.show('车厢长格式错误',Toast.SHORT);
            }
        }
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="车厢长"/>
                <View  style={[estyle.fxRowCenter]}>
                    <LabelInput
                        ref="cardLenght"
                        style={[estyle.marginTop, estyle.borderBottom]}
                        onChangeText={(clength) => {
                            this.setState({carLength:clength.toUpperCase()});
                        }}
                        defaultValue={this.props.data.carLength}
                        secureTextEntry={true}
                        placeholder='请输入有效车厢长度'
                        label="车厢长（米）"
                        autoCapitalize="characters"
                        labelSize="3"
                        maxLength={6}
                        validates={[
                            {require:true, msg: '请输入有效车厢长度'},
                            {pattern:/^([1-9]\d|[1-9])(\.\d)?$/, msg:'车厢长格式错误'}
                        ]}
                    />
                    <View style={[estyle.fxRow, estyle.padding]}>
                        <Text style={[estyle.text]}>&nbsp;</Text>
                    </View>
                    <SubmitButton size="large"
                                  doing={this.state.doing}
                                  onPress={() => this.onSave()}>保存</SubmitButton>
                </View>
            </View>
        );
    }
}

const basefont = Env.font.base;
const estyle = Env.style;
const styles=StyleSheet.create({

});

export default MyInfoCarLength