/**
 * Created by Administrator on 2016/10/18.
 */
/**
 * Created by zhaidongyou on 2016/10/18.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ListView,
    ScrollView,
    RefreshControl,
    Image
} from 'react-native';
import {IconRibbon} from '../../../components/Icons';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;
import {queryMonthAvgOilWear, queryMonthAvgOilWearRanking} from '../../../services/TripService';
export default class OilConsumptionList extends Component {
    constructor(props) {
        super(props);
        this.avgData = null;
        this.listData = null;
    }
    finaliy() {
        this.setState({isRefreshing: false});
    }
    onRefresh() {
        this.fetchData();
    }

    componentWillMount() {
        this.fetchData();
    }
    fetchAvg() {
        return queryMonthAvgOilWear()
            .then(((data)=>{
                this.avgData = data;
                this.fetchList();
            }))
            .catch(()=>{this.finaliy()})
            .finally();
    }
    fetchList() {
        return queryMonthAvgOilWearRanking()
            .then(((data)=>{
                this.setState({
                    avgData: this.avgData,
                    listData: data
                });
            }))
            .catch(()=>{this.finaliy()})
            .finally(()=>{this.finaliy()});
    }
    fetchData () {
        this.setState({isRefreshing: true});
        this.fetchAvg();
    }

    getOrder(idx) {
        idx = +idx;
        let view = null,
            size = Env.font.base * 50;
        switch(idx) {
            case 0: view = <IconRibbon color="rgba(255,215,0,1)" size={size}/>;break;
            case 1: view = <IconRibbon color="#c0c0c0" size={size}/>;break;
            case 2: view = <IconRibbon color="#B87333" size={size}/>; break;
            default: view = <Text style={[estyle.text, {color:Env.color.main}]}>{idx + 1}</Text>; break;
        }
        return view;
    }
    renderAvg() {
        let data = this.state.avgData;
        if(data)
            return <View style={[estyle.fxCenter, estyle.marginBottom, estyle.cardBackgroundColor, estyle.paddingVertical]}>
                <Text style={[{color: Env.color.main, fontSize:Env.font.base * 60}]}>{data.avgOilwear}</Text>
                <Text style ={[estyle.text]}>您本月的平均油耗</Text>
                <View style={[estyle.fxRow, estyle.paddingTop, estyle.marginTop]}>
                    <View>
                        <Text style ={[estyle.note, {textAlign:'right'}]}>车型范围：{ data.carModel+' '+data.carBrand }</Text>
                        <Text style ={[estyle.note, {textAlign:'right'}]}>单位：升/百公里</Text>
                    </View>
                </View>
            </View>;
        return <View/>;
    }
    renderList() {
        let data = this.state.listData ? this.state.listData.list : [];
        if(data.length)
            return data.map((rowData, idx) => {
                return <View key={idx} style={[estyle.cardBackgroundColor, estyle.fxRow,estyle.padding, estyle.borderBottom,estyle.fxRowCenter]}>
                    <View style={[{width:Env.font.base * 60}, estyle.fxRowCenter]}>{this.getOrder(idx)}</View>
                    <View style={[estyle.fx1,estyle.paddingHorizontal]}>
                        <View style={[estyle.fxRow]}>
                            <Text style={[estyle.text, {color: Env.color.important}]}>{rowData.carNumber}</Text>
                            <Text style={[estyle.text, estyle.marginHorizontal]}>{rowData.mainDriverName}</Text>
                            <Text style={[estyle.text]}>{rowData.subDriverName}</Text>
                        </View>

                        <Text style={[estyle.note]}>{rowData.carBrand}{rowData.carModel}</Text>
                    </View>
                    <Text style={[estyle.articleTitle, {color:Env.color.main, textAlign:'right'}]}>{rowData.avgOilwear}</Text>
                </View>;
            });
        return <View/>;
    }
    render() {
        return (
            <View style ={[estyle.containerBackgroundColor, estyle.fx1]}>
                <ScrollView style={[estyle.fx1]}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                    colors={Env.refreshCircle.colors}
                                    progressBackgroundColor={Env.refreshCircle.bg}
                                />
                            }>
                    {this.renderAvg()}
                    {this.renderList()}
                </ScrollView>
            </View>
        );
    }
}