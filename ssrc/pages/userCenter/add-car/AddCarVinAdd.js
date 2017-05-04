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
import {IconBarcode} from '../../../components/Icons'
import { getCarList } from '../../../services/UserService';
import Env from '../../../utils/Env';
import UpdateDriverCard from './UpdateDriverCard';
import Toast from '../../../components/Toast';

const estyle = Env.style;

export default class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
           vinCode: ''
        };
    }

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    nextStep () {
        if (LabelInput.Validate(this.refs)) {
            getCarList({vinCode: this.state.vinCode})
                .then(()=>{
                    this.props.router.push(UpdateDriverCard);
                })
                .catch((e)=>{
                    Toast.show(e.message, Toast.SHORT);
                })
        }
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="添加车辆"/>
                <Text style={[estyle.note, estyle.padding]}>您的发票号没有关联车辆，请提交车辆信息</Text>
                <LabelInput
                    style={[estyle.borderBottom]}
                    ref="vinCode"
                    label="VIN"
                    labelSize={2}
                    onChangeText={vinCode => this.setState({vinCode})}
                    placeholder="请输入车辆VIN或扫描驾驶舱左侧条码"
                    validates={[
                        {require:true, msg:"请输入车辆VIN或扫描驾驶舱左侧条码"}
                    ]}
                    rightView={<IconBarcode color={Env.color.main}/>}

                />
                <Text style={[estyle.note, {color:Env.color.main, textAlign: 'right'}, estyle.padding]}>在哪里？</Text>
                <View style={[estyle.fxRowCenter]}>
                    <ConfirmButton size="large" onPress={this.nextStep.bind(this)}>下一步</ConfirmButton>
                </View>
            </View>
        );
    }
}