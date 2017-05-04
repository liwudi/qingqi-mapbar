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

import { providerCity, areaCondition} from '../services/ServiceStationService';
import TopBanner from './TopBanner';
import PageList from './PageList';
import CityPicker from './CityPicker';

import Env from '../utils/Env';
const estyle = Env.style;


export default class ProvincePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pro:[],
            selectPro:''
        }
    }
    selectPro(row){
        this.setState({selectPro:row.name});
        this.props.router.push(CityPicker,{proCode:row.id,...this.props});
    }

    render(){
        return (
            <View style={[estyle.fx1,estyle.cardBackgroundColor]}>
                <TopBanner {...this.props} title={this.state.selectPro || '请选择省份'}/>
                <PageList
                    style={[estyle.cardBackgroundColor, estyle.fx1,estyle.padding]}
                    reInitField={[this.state.isRender]}
                    renderRow={(row,sectionId,rowId) => {
                                return(
                                   <TouchableOpacity style={[estyle.padding,estyle.borderBottom,estyle.fxCenter]} onPress={()=>this.selectPro(row) } >
                                        <Text style={[estyle.text]}>{row.name}</Text>
                                   </TouchableOpacity>
                                )
                            }}
                    fetchData={(pageNumber, pageSize) => {
                                if(this.props.type === 'coupon'){
                                    return providerCity(1,50,this.props.id)
                                }else {
                                    return areaCondition().then((data)=>{
                                        return {list:data}
                                    })
                                }
                            }}
                />
            </View>
        );
    }

}