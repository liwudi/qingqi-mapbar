/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ConfirmButton from '../../../components/ConfirmButton';
import LabelInput from '../../../components/LabelInput';
import Env from '../../../../utils/Env';
const estyle = Env.style;

export default class AddCar extends Component {
    state = {
        number: '',
        id: ''
    };

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    nextStep () {
        console.info(this.refs)
        if (LabelInput.Validate(this.refs)) {
            //this.props.dispatch(UserActions.doLogin(this.state, this.next));
        }
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="添加车辆"/>
                <Text style={[estyle.text, estyle.marginFontBottom, estyle.paddingHorizontal, estyle.marginTop]}>购买发标号</Text>
                <LabelInput
                    style={[estyle.borderBottom]}
                    ref="number"
                    onChangeText={number => this.setState({number})}
                    placeholder="请输入飚车发票号"
                    validates={[
                        {require:true, msg:"请输入飚车发票号"}
                    ]}
                />
                <Text style={[estyle.text, estyle.marginFontBottom, estyle.paddingHorizontal, estyle.marginTop]}>身份证号组织机构代码</Text>

                <LabelInput
                    style={[estyle.borderBottom]}
                    ref="id"
                    onChangeText={id => this.setState({id})}
                    placeholder="请输入购车发票上的身份证号或组织机构代码"
                    validates={[
                        {require:true, msg:"请输入购车发票上的身份证号或组织机构代码"}
                    ]}
                />
                <Text style={[estyle.note, {color:Env.color.main, textAlign: 'right'}, estyle.padding]}>我购买的二手车</Text>
                <View style={[estyle.fxRowCenter]}>
                    <ConfirmButton size="large" onPress={this.nextStep.bind(this)}>下一步</ConfirmButton>
                </View>
            </View>
        );
    }
}