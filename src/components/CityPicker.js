/**
 * Created by linyao on 2017/1/5.
 */
import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Navigator,
    Image,
    Alert,
    ScrollView
} from 'react-native';

import { providerCity,areaCondition } from '../services/ServiceStationService';
import TopBanner from './TopBanner';
import PageList from './PageList';

import Env from '../utils/Env';
const estyle = Env.style;


export default class ProvincePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city:[],
            selectCity:''
        }
    }
    selectCity(row){
        this.setState({selectCity:row.name});
        this.props.changeCity(row);
        this.props.router.popN(2);
    }

    render(){
        return (
            <View style={[estyle.fx1,estyle.cardBackgroundColor]}>
                <TopBanner {...this.props} title={this.state.selectPro || '请选择城市'}/>
                <PageList
                    style={[estyle.cardBackgroundColor, estyle.fx1,estyle.padding]}
                    reInitField={[this.state.isRender]}
                    renderRow={(row,sectionId,rowId) => {
                                return(
                                   <TouchableOpacity style={[estyle.padding,estyle.borderBottom,estyle.fxCenter]} onPress={()=>this.selectCity(row) } >
                                        <Text style={[estyle.text]}>{row.name}</Text>
                                   </TouchableOpacity>
                                )
                            }}
                    fetchData={(pageNumber, pageSize) => {
                                 if(this.props.type === 'coupon'){
                                    return providerCity(1,50,this.props.id,this.props.proCode)
                                }else {
                                    return areaCondition(this.props.proCode).then((data)=>{
                                        return {list:data}
                                    })
                                }
                            }}
                />
            </View>
        );
    }

}