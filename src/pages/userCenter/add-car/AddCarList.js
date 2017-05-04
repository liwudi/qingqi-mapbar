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
import LabelInput from '../../../components/LabelInput';
import PageList from '../../../components/PageList';
import Button from '../../../components/BorderButton';
import Env from '../../../utils/Env';
import { getCarList } from '../../../services/AppService';
import AddCarFind from  './AddCarFind';
import AddCarPostCarCode from './AddCarPostCarCode';
const estyle = Env.style;

export default class AddCarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carInfo: this.props.carInfo
        };
    }

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    nextStep (type, data) {
        if(type == 'add'){
            this.props.router.push(AddCarPostCarCode,{carInfo: data});
        }else if(type == 'forback'){
            this.props.router.push(AddCarFind,{carInfo: this.state.carInfo});
        }
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="添加车辆"/>
                <PageList
                    style={[estyle.fx1]}
                    renderRow={(row) => {
                    //    if(row.status != 1 && row.status != 0) return null;
						let dom=<View style={[estyle.cardBackgroundColor, estyle.paddingVertical,estyle.borderBottom, estyle.fxRow, estyle.fx1]}>
                                    <View style={[ estyle.paddingLeft, estyle.fx1]}>
                                         <Text style={[estyle.text, {color:Env.color.main}]}>{row.carType || "车型"}</Text>
                                         <Text style={[estyle.note]}>{'VIN : '+ row.vin}</Text>
                                    </View>
                                    <View style={[estyle.fxCenter, estyle.paddingHorizontal]}>
                                         {
                                            (()=>{
                                                if(row.status == 1){
                                                    return <View style={[estyle.fxCenter,styles.size, {borderColor:Env.color.main}]}><Text style={[estyle.note, {color:Env.color.note}]}>已添加</Text></View>
                                                }else if(row.status == 2) {
                                                    return <View style={[estyle.fxCenter,styles.size, {borderColor:Env.color.main}]}><Text style={[estyle.note, {color:Env.color.note}]}>被占用</Text></View>
                                                }else {
                                                    return <Button onPress={this.nextStep.bind(this,'add', row)}>添加</Button>;
                                                }
                                            })()
                                         }
                                    </View>
                                </View>;

                        return dom;

					}}
                    fetchData={(pageNumber, pageSize) => {
						return getCarList(this.state.carInfo,pageNumber,pageSize)
					}}
                />
            </View>
        );
    }
}
const basefont = Env.font.base;
const styles = StyleSheet.create({
    size: {
        width: basefont * 120,
        height: basefont * 44
    },
    btn: {
        borderWidth: basefont * 2,
        borderRadius: basefont * 5
    }

});