/**
 * Created by linyao on 2016/12/7.
 */
import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet, Modal} from 'react-native';

import Env from '../../../../utils/Env';
import ModalBox from '../../../../components/widgets/Modal';
import ConfirmButton from '../../../../components/ConfirmButton';
import CancelButton from '../../../../components/CancelButton';
import Button from '../../../../components/widgets/Button';
import Toast from '../../../../components/Toast'
import { orderCancel } from '../../../../services/ServiceStationService';
const estyle = Env.style;
const basefont= Env.font.base;

export default class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            reason:''
        }
    }
    reason=[
        {key:1,value:'无法在预约时间到达服务站'},
        {key:2,value:'改约其它服务站'},
        {key:3,value:'现在不需要维修或保养'},
        {key:4,value:'其它'}
    ];

    show = () => {
        this.setState({
            visible: true
        })
    }

    close = () => {
        this.setState({
            visible: false
        })
    }
    //取消预约
    cancleOrder(){
        if(this.state.reason){
            orderCancel(this.props.orderId,this.state.reason)
                .then(()=>{
                    this.props.fetchData();
                    this.close();
                })
                .catch((err)=>{
                    Toast.show(err.message, Toast.SHORT)
                })
        }else {
            Toast.show('请选择原因', Toast.SHORT)
        }
    }

    render() {
        return (
            <ModalBox visible={this.state.visible} onClose={() => {}} title="取消预约" style={[estyle.fxCenter]}>
                <View style={[estyle.cardBackgroundColor, {width:Env.font.base * 540, borderRadius: Env.font.base * 10}]}>
                    <View style={[estyle.borderBottom,estyle.fxCenter,estyle.padding]}>
                        <Text style={estyle.text}>取消预约</Text>
                    </View>
                    <View>
                        {
                            this.reason.map((item,index)=>{
                                return <Button key={index}
                                               onPress={()=>{ this.setState({reason:item.key}) }}
                                               style={[estyle.padding,estyle.marginTop,estyle.marginHorizontal,{ borderWidth: basefont * 2,borderRadius: basefont * 5,borderColor: this.state.reason == item.key ? Env.color.auxiliary : Env.color.main }]}>
                                    <Text style={[{color: this.state.reason == item.key ? Env.color.auxiliary : Env.color.main}]}>{item.value}</Text></Button>
                            })
                        }
                    </View>
                    <View style={[estyle.fxRow, estyle.fxCenter]}>
                        <ConfirmButton size="small" style={[estyle.margin]} onPress={()=>{this.cancleOrder()}}>{'确定'}</ConfirmButton>
                        <CancelButton size="small" style={[estyle.margin]} onPress={()=>{this.close()}} >{'取消'}</CancelButton>
                    </View>
                </View>
            </ModalBox>
        );
    }
}