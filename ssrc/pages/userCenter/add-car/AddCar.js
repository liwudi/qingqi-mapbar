/**
 * Created by linyao on 2016/10/21.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    Text,
    View,
    TextInput,TouchableOpacity,Keyboard, Modal, Image
} from 'react-native';

import { AddCarAction, TYPES} from '../../../actions/index';
import TopBanner from '../../../components/TopBanner';
import SubmitButton from '../../../components/SubmitButton';
import LabelInput from '../../../components/LabelInput';
import Env from '../../../utils/Env';
import AddCarList from './AddCarList';
import ListTitle from '../../../components/ListTitle';
import AddCarVinAdd from './AddCarVinAdd';
const estyle = Env.style, pattern = Env.pattern;

import Toast from '../../../components/Toast';


import ImageViewer from 'react-native-image-zoom-viewer';
import ImageZoom from 'react-native-image-pan-zoom';


const invoiceImage = require('../../../assets/images/invoice.jpg');

class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doing: false,
            invoiceNo:'',
            identityCard:'',
            isShowInvoiceImage: false
        };
    }

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    //查询到车辆信息去添加车辆列表
    toList(info){
        this.setState({
            doing: false
        });
        this.props.router.push(AddCarList,{carInfo: info});
    }
    //未查询到车辆信息去填写Vin码页
    toVin(info){
        this.setState({
            doing: false
        });
        //this.props.router.push(AddCarVinAdd,{carInfo: info});
        Toast.show('你填写的信息没有查到关联车辆，请确认信息是否填写正确。', Toast.LONG);
    }

    nextStep () {
        if (LabelInput.Validate(this.refs)) {
            Keyboard.dismiss();
            if(this.state.doing) return false;
            this.setState({
                doing: true
            });
            this.props.dispatch(AddCarAction.getCarList(this.state, this.toList.bind(this),this.toVin.bind(this),()=>{this.setState({doing:false})}));
        }
    }
    componentWillUnmount() {
        this.props.nav && this.props.nav.backRender && this.props.nav.backRender();
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="添加车辆"/>
                <ListTitle title="请提供购车发票中的如下信息："/>
                <LabelInput
                    style={[estyle.borderBottom]}
                    ref="invoiceNo"
                    label="发票号"
                    labelSize={3}
                    onChangeText={invoiceNo => this.setState({invoiceNo})}
                    placeholder="8位购车发票号码"
                    keyboardType="phone-pad"
                    maxLength={8}
                    validates={[
                        {require: true, msg:"请输入8位购车发票号码"},
                        {pattern: /^\d{8}$/, msg: '发票号码格式错误'}
                    ]}
                />

                <LabelInput
                    style={[estyle.borderBottom]}
                    ref="identityCard"
                    label="证件号"
                    labelSize={3}
                    onChangeText={identityCard => this.setState({identityCard})}
                    placeholder="身份证号或组织机构代码"
                    keyboardType="ascii-capable"
                    validates={[
                        {require: true, msg:"请输入购车发票上的身份证号或组织机构代码"},
                        {pattern: /^[A-Za-z0-9\-_]{8,19}$/, msg: '身份证号或组织机构代码格式错误'}
                    ]}
                />
                <View style={[estyle.marginTop]}>
                    <Text style={[estyle.note,{textAlign:'center'}]}>
                        组织机构代码无需输入“-”
                    </Text>
                </View>

                <View style={[estyle.fxRow, estyle.paddingTop]}>
                    <Text style={[estyle.text]}>&nbsp;</Text>
                </View>
                <View style={[estyle.fxRowCenter]}>
                    <SubmitButton doing={this.state.doing} size="large" onPress={this.nextStep.bind(this)}>下一步</SubmitButton>
                </View>

                <View style={[estyle.fxCenter,estyle.marginTop]}>
                    <Text style={[estyle.note]}>发票样例图</Text>
                    <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({'isShowInvoiceImage':true})}}>

                        <Image source={invoiceImage}
                               style={{
                               width:Env.screen.width * 0.4,
                               height:Env.screen.width * .4 * .75,
                               borderWidth:Env.font.base * 14,
                               borderColor:'#FFF'
                               }}
                               resizeMode={Image.resizeMode.contain}

                        />
                    </TouchableOpacity>

                </View>

                <Modal visible={this.state.isShowInvoiceImage} transparent={true} onRequestClose={() => {}}>
                    <View style={[estyle.fx1, {backgroundColor: Env.color.modalBg}]}>
                        <ImageZoom onClick = {() => this.setState({'isShowInvoiceImage':false})} cropWidth={Env.screen.width}
                                   cropHeight={Env.screen.height}
                                   imageWidth={Env.screen.width}
                                   imageHeight={Env.screen.width * 0.75}>
                            <Image style={{width:Env.screen.width, height:Env.screen.width * 0.75}}
                                   source={invoiceImage} resizeMode={Image.resizeMode.contain}/>
                        </ImageZoom>
                    </View>
                </Modal>
            </View>
        );
    }
}


export default connect(function (stores) {
    return {addCarStore: stores.TDSStore}
})(AddCar);