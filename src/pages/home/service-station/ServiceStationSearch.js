/**
 * Created by linyao on 2016/11/23.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView, StyleSheet,
    ListView,
    RefreshControl,
    Keyboard
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ServiceStationItem from './components/ServiceStationItem';
import Env from '../../../utils/Env';
import Button from '../../../components/widgets/Button'
import RangeOptionList from './components/RangeOptionList'
import TypeOptionList from './components/TypeOptionList'
import DistanceOptionList from './components/DistanceOptionList'
import CoreOptionList from './components/CoreOptionList';
import {IconArrowDown, IconSearch , IconMap} from '../../../components/Icons'
import ServiceStationDetail from './ServiceStationDetail'
import ServiceStationSearch from './ServiceStationSearch'
import ServiceBtn from './components/ServiceBtn';
import PageList from '../../../components/PageList';
import  LabelInput from '../../../components/LabelInput'
import {queryStation} from '../../../services/AppService';
import imgsrc from '../../../assets/images/icon-4.png';
const estyle = Env.style;
export default class ServiceStationList extends Component {
    constructor(props) {
        super(props);
        /**
         * level 等级 6-3
         * sortType 排序条件
         * keyWord 关键字
         * */
        this.state = {
            options: {
                level: '',
                sortType: 0,
                keyWord: '',
                centralFlag: 0
            },
            active:'',
            distanceTxt:'排序',
            coreTxt:'类型',
            typeTxt:'星级',
            showList:false, //控制列表是否显示 当输入框为空时隐藏
            isSearch:false
        };
    }

    _onPressOption(option) {
        let active = this.state.active === option ? '' : option;
        this.setState({active: active,isSearch:true});
    }
    //选择星级
    checkType(obj){
        this.setState(
            {
                options: Object.assign(this.state.options,{ level: obj.key }),
                typeTxt: obj.value,
                active:'',
                isRender:new Date().getTime()
            }
        )
    }

    //选择优先级
    checkDistance(obj){
        this.setState(
            {
                options: Object.assign(this.state.options,{ sortType: obj.key }),
                distanceTxt: obj.value,
                active:'',
                isRender:new Date().getTime()
            }
        )
    }
    //选择核心站
    checkCore(obj){
        this.setState(
            {
                options: Object.assign(this.state.options,{ centralFlag: obj.key }),
                coreTxt: obj.value,
                active:'',
                isRender:new Date().getTime()
            }
        )
    }
    //关闭弹出层
    closeModal(){
        this.setState({active:''})
    }

    render() {
        const getRightView=()=>{
            return  <Button onPress={() => { this.refs['search'].validate() && this.setState({isSearch:true,showList:true,isRender:new Date().getTime() });Keyboard.dismiss(); }}>
                         <IconSearch size={basefont*50} />
                    </Button>
        };

        const currentActiveClass = {height: Env.screen.height - 174 * basefont, left:0};
        const noActiveClass = {height: 0, left:-999};
        const activeClass = (currntActive, defaultActive) => {
            if(currntActive == defaultActive){
                return currentActiveClass;
            } else {
                return noActiveClass;
            }
        }

        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="服务站搜索" />
                <View style={[estyle.borderBottom, estyle.fxRow]}>
                    <LabelInput
                        style={[estyle.fx1]}
                        ref="search"
                        onChangeText={(keyWord) => {
                            this.setState({options : { ...this.state.options, keyWord: keyWord }});
                            if(!keyWord) this.setState({ showList:false})
                        }}
                        secureTextEntry={true}
                        placeholder='请输入服务站名称'
                        rightView={getRightView()}
                        controlled={true}
                        validates={[
                            {require:true, msg: '请输入服务站名称'}
                        ]}
                    />
                </View>
                <View style={[estyle.borderBottom, estyle.fxRow,{height: basefont * 90}]}>
                    <ServiceBtn
                        active={this.state.active === 'level'}
                        onPress={this._onPressOption.bind(this, 'level')} title={this.state.typeTxt}/>
                    <ServiceBtn
                        style={{flex:0}}
                        active={this.state.active === 'core'}
                        onPress={this._onPressOption.bind(this, 'core')} title={this.state.coreTxt}/>
                    <ServiceBtn
                        active={this.state.active === 'order'}
                        onPress={this._onPressOption.bind(this, 'order')} title={this.state.distanceTxt}/>
                </View>




                <View style={[estyle.fx1]}>
                    <View style={[styles.optionContainer, activeClass(this.state.active , 'level')]}>
                        <TypeOptionList onPress={this.checkType.bind(this)} close={this.closeModal.bind(this)}/>
                    </View>
                    <View style={[styles.optionContainer, activeClass(this.state.active , 'core')]}>
                        <CoreOptionList onPress={this.checkCore.bind(this)} close={this.closeModal.bind(this)}/>
                    </View>
                    <View style={[styles.optionContainer, activeClass(this.state.active , 'order')]}>
                        <DistanceOptionList onPress={this.checkDistance.bind(this)} close={this.closeModal.bind(this)}/>
                    </View>
                    {
                        this.state.isSearch ? <PageList
                                style={[estyle.cardBackgroundColor, estyle.fx1]}
                                reInitField={[this.state.isRender]}
                                renderRow={(row,sectionId,rowId) => {
                            return <ServiceStationItem
                                number={+rowId + 1}
                                src={row.photo}
                                title={row.name}
                                level={row.level}
                                central={row.central}
                                km={row.distance}
                                adr={row.address}
                                onPress={() =>{this.props.router.push(ServiceStationDetail,{stationId: row.id}) } }
                            />
                        }}
                                fetchData={(pageNumber, pageSize) => {
                            return this.state.showList ? queryStation(pageNumber,this.state.options): Promise.resolve([])
                        }}
                            /> : <View/>
                    }
                </View>
            </View>
        );
    }
}
const basefont = Env.font.base;
const styles = StyleSheet.create({
    optionContainer: {
        position: 'absolute',
        width: Env.screen.width,
        height:0,
        backgroundColor: Env.color.modalBg,
        flexDirection:'column',
        top: 0,
        zIndex: 10,
    }
});
