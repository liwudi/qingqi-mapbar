/**
 * Created by linyao on 2016/12/14.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView, StyleSheet,
    ListView,
    ActivityIndicator,
    Platform
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Toast from '../../../components/Toast';
import Env from '../../../utils/Env';
import Button from '../../../components/widgets/Button'
import RangeOptionList from './components/RangeOptionList'
import TypeOptionList from './components/TypeOptionList'
import CoreOptionList from './components/CoreOptionList';
import {IconArrowDown, IconSearch , IconList,IconMap} from '../../../components/Icons'
import ServiceStationSearch from './ServiceStationSearch'
import MapbarMap from '../../../mapbarmap/MapbarMap';
import ServiceStationItem from './components/ServiceStationItem';
import DistanceOptionList from './components/DistanceOptionList'
import ServiceStationDetail from './ServiceStationDetail'
import {queryStation, getPosition} from '../../../services/AppService';
import PageList from '../../../components/PageList';
import ServiceBtn from './components/ServiceBtn';
const estyle = Env.style;

let imageName_common = `${Env.marker.icon.pre}10011`,
    imageName_highlight = `${Env.marker.icon.pre}10021`,
    imageName_car = `${Env.marker.icon.pre}91002`;
let minLng, minLat, maxLng, maxLat, df;
minLng = minLat = maxLng = maxLat = 0, df = 0;
const setBounds = (pt) => {
    if(!minLng) minLng = maxLng = pt.longitude;
    if(!minLat) minLat = maxLat = pt.latitude;
    minLng = Math.min(minLng,pt.longitude);
    minLat = Math.min(minLat, pt.latitude);
    maxLng = Math.max(maxLng, pt.longitude);
    maxLat = Math.max(maxLat, pt.latitude);
};
const bounds = () => {
    return {
        min: {longitude: minLng - df,
            latitude: minLat - df},
        max: {longitude: maxLng + df,
            latitude: maxLat + df}
    }
}
export default class ServiceStation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                distance : '200',
                level: '',
                sortType: 0,
                keyWord: '',
                id:'',
                centralFlag: 0
            },
            animating: false,
            active:'',
            distanceTxt:'排序',
            typeTxt:'星级',
            coreTxt:'类型',
            rangeTxt:{ pro:'200公里',city:''},
            contentType:'list'
        };
        this.options = {};
        this.center = {
            longitude: 104.621367,
            latitude: 35.317133
        };
        this.markers = [];
        this.page_size = 5000;
    }
    goTo(page){
        this.props.router.replace(page);
    }

    _onPressOption(option) {
        let active = this.state.active === option ? '' : option;
        this.setState({active: active});
    }
    //选择公里数
    checkKm(obj){
        let options = {
            options: Object.assign(this.state.options,{ distance: obj.id,id:''}),
            isRender:new Date().getTime(),
        }
        this.setState(
            options
        );
        if(obj.name === '附近') {
            this.setState({rangeTxt: { pro: '200公里' ,city:'' }});
        }else {
            this.setState({rangeTxt: { pro:'200公里'  ,city:obj.name },active:''});
        }
        this.state.contentType=='map' && this.fetchData(options);
    }

    //选择省份
    checkPro(obj){
        this.setState(
            {
                options: Object.assign(this.state.options,{ id: obj.id,distance:'' }),
                rangeTxt: { pro: obj.name ,city:''},
                isRender:new Date().getTime()
            },
            ()=>{
                this.state.contentType=='map' && this.fetchData(this.state)
            }
        )
    }
    //选择城市
    checkCity(obj){
        this.setState(
            {
                options: Object.assign(this.state.options,{ id: obj.id ,distance:''}),
                rangeTxt: Object.assign(this.state.rangeTxt,{city: obj.name==='全部' ? obj.showName : obj.name}),
                isRender:new Date().getTime(),
                active:'',
            },
            ()=>{
                this.state.contentType=='map' && this.fetchData(this.state)
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
    //选择星级
    checkType(obj){
        this.setState(
            {
                options: Object.assign(this.state.options,{ level: obj.key }),
                typeTxt: obj.value,
                active:'',
                isRender:new Date().getTime()
            },
            ()=>{
                this.state.contentType=='map' && this.fetchData(this.state)
            }
        )
    }

    //选择核心站
    checkCore(obj){
        let options = {
            options: Object.assign(this.state.options,{ centralFlag: obj.key }),
            coreTxt: obj.value,
            active:'',
            isRender:new Date().getTime()
        }
        this.setState(
            options
        )
        this.state.contentType=='map' && this.fetchData(options);
    }
    //关闭弹出层
    closeModal(){
        this.setState({active:''})
    }


    clearView() {
        minLng = minLat = maxLng = maxLat = 0;
        this.markers = [];
        this.Map.clearOverlays();
        setTimeout(() => {
            this.setState({detail: null});
        }, 300);
    }

    fetchData(options) {
        this.clearView();
        Toast.show('正在查询服务站', Toast.SHORT);
        this.setState({animating: true});
        Promise.all([queryStation(1,options.options, this.page_size), getPosition()]).then((result=[{},{}]) => {
            this.list = result[0].list;
            if(this.list.length) {
                this.setMarker();
            } else {
                Toast.show('没有服务站', Toast.SHORT);
            }
            this.location = result[1];
            this.setLocation();
        }).catch(()=>{
            Toast.show('查询服务站列表异常', Toast.SHORT);
        }).finally(()=>{
            this.setState({animating: false})
        });
    }
    setLocation() {
        let data = this.location,
        pt = this.MPoint([data.longitude, data.latitude]),
        mkOpts = {
            ...Env.marker.car,
                longitude: pt.longitude,
                latitude: pt.latitude,
                title: '我的位置',
                callOut: true,
                id: this.markers.length + 1,
                imageName: imageName_car
            };
        setBounds(pt);
        this.Marker.add([mkOpts]);
    }

    setMarker() {
        let list = this.list || [];
        //    console.info(list)
        if (list.length) {
            let markers = [];
            list.forEach((item, idx) => {
                item.number = idx + 1;
                let mks = this.addMarkerOpts(item, idx);
                markers.push(Object.assign({}, mks));
                this.markers.push(mks);
            });
            let mkBounds = bounds();
            this.Marker.add(markers);
            this.Map.setBounds(mkBounds.min, mkBounds.max);
        }
    }

    addMarkerOpts(data, idx) {
        let pt = this.MPoint([data.longitude, data.latitude]),
            textColor = Platform.OS === 'ios' ? 'ffffff' : '#ffffff',
        mkOpts = {
            ...Env.marker.bubble,
                longitude: pt.longitude,
                latitude: pt.latitude,
                id: idx,
                imageName: imageName_common,
                iconText: data.number.toString(),
                iconTextY: .35,
                iconTextColor: textColor
            };
        setBounds(pt);
        return mkOpts;
        //this.markers.push(mkOpts);
    }
    _onPress() {

    }


    setTopText(type,value){
        let obj={};
        obj[type]=value;
        this.setState(obj);
    }

    clickMarker(idx) {
        //	console.info('click marker')
        let detail = this.state.detail || {},
            detailIdx = detail.number, markers = [];

        if(typeof detailIdx === 'number') {
            let opts = this.markers[--detailIdx];
            opts.imageName = imageName_common;
            markers.push(Object.assign({}, opts));
        }
        //	console.info(detailIdx, idx)
        opts = this.markers[idx];
        opts.imageName = imageName_highlight;
        markers.push(Object.assign({}, opts));
        //	console.info(markers)
        this.Marker.updateIcon(markers);
        detail = this.list[idx];

        this.setState({detail: detail});
    }

    onInit(instance) {
        console.info('station map create')
        this.mapRef = instance.getMapRef();
        this.Map = instance;
        this.MPoint = instance.MPoint;
        this.Marker = instance.Marker;
        this.MarkerRotate = instance.MarkerRotate;
      /*  let options = this.state;
        this.fetchData(options);*/
    }

    topRightView = () => {
        return (
            <View style={estyle.fxRow}>
                <Button onPress={() => { this.props.router.push(ServiceStationSearch) }} style={estyle.topBtn}>
                    <IconSearch color={Env.color.navTitle} />
                </Button>
                <Button onPress={() => {
                    //this.goTo(ServiceStationList)
                    if(this.state.contentType== 'list'){
                        this.setState({contentType:'map', animating: true},()=>{this.fetchData(this.state)})
                    }else {
                        this.setState({contentType:'list'})
                    }
                    this.setState({active:''})
                } }
                        style={estyle.topBtn}>
                    {this.state.contentType== 'list'? <IconMap color={Env.color.navTitle} /> : <IconList color={Env.color.navTitle}  />}
                </Button>
            </View>
        )
    }
    componentWillUnmount() {
        this.Map.disposeMap(this.mapRef);
        this.mapRef = null;
        console.info('monitor map finalize')
    }
    goToDetail(row) {
        this.props.router.push(ServiceStationDetail,{stationId: row.id});
    }
    renderAi () {
        let height = this.state.animating ? Env.screen.height / 3 : 0;
        return <View style={{position:'absolute', zIndex:10, width: Env.screen.width, height: height, marginTop:Env.screen.height / 3 * Env.font.base}}>
            <ActivityIndicator animating={this.state.animating} color={[Env.color.main]} size="large"/>
        </View>
    }
    render() {
        let row = this.state.detail || {};
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
                <TopBanner {...this.props} title="服务站列表" rightView={this.topRightView()}/>
                <View style={[estyle.borderBottom, estyle.fxRow, {height: basefont * 90}]}>
                    <ServiceBtn
                        style={{paddingHorizontal:Env.font.base*20}}
                        active={this.state.active === 'range'}
                        onPress={this._onPressOption.bind(this, 'range')} title={this.state.rangeTxt.city ? this.state.rangeTxt.city : this.state.rangeTxt.pro}/>
                    <ServiceBtn
                        active={this.state.active === 'level'}
                        onPress={this._onPressOption.bind(this, 'level')} title={this.state.typeTxt}/>
                    <ServiceBtn
                        active={this.state.active === 'core'}
                        onPress={this._onPressOption.bind(this, 'core')} title={this.state.coreTxt}/>
                    {
                        this.state.contentType == 'list' ?
                            <ServiceBtn
                                active={this.state.active === 'order'}
                                onPress={this._onPressOption.bind(this, 'order')} title={this.state.distanceTxt}/> : null
                    }
                </View>

                <View style={[estyle.fx1]}>

                    <View style={[styles.optionContainer, activeClass(this.state.active , 'range')]}>
                        <RangeOptionList checkPro={this.checkPro.bind(this)} checkCity={this.checkCity.bind(this)} checkKm={this.checkKm.bind(this)}  close={this.closeModal.bind(this)}/>
                    </View>
                    <View style={[styles.optionContainer, activeClass(this.state.active , 'level')]}>
                        <TypeOptionList onPress={this.checkType.bind(this)} close={this.closeModal.bind(this)}/>
                    </View>
                    <View style={[styles.optionContainer, activeClass(this.state.active , 'core')]}>
                        <CoreOptionList onPress={this.checkCore.bind(this)} close={this.closeModal.bind(this)}/>
                    </View>
                    <View style={[styles.optionContainer, activeClass(this.state.active , 'order')]}>
                        <DistanceOptionList onPress={this.checkDistance.bind(this)} close={this.closeModal.bind(this)}/>
                    </View>

                    <View style={[{position:'absolute',top:0,left:0,width:Env.screen.width, zIndex: 5,height: (this.state.contentType === 'list' ?  Env.screen.height - (174 + (Env.isIOS ? 36 : 0)) * basefont : 0)}]} >
                        <PageList
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
                                    onPress={() =>{
                                        this.goToDetail(row);
                                    }}
                                />;
                            }}
                            fetchData={(pageNumber, pageSize) => {
                                return queryStation(pageNumber,this.state.options).then((rs)=>{
                                    return Promise.resolve(rs);
                                }).catch((err)=>{
                                    Toast.show(err.message, Toast.SHORT);
                                    return Promise.resolve({});
                                })
                            }}
                        />
                    </View>
                    {this.renderAi()}
                    <MapbarMap style={[estyle.fx1]}
                               center={this.center}
                               onInit={(instance)=> {
                                   this.onInit(instance);
                               }}
                               clickMarker={(pointId)=> {
                                   this.clickMarker(pointId)
                               }}
                               router={this.props.router}
                               hideLegend={true}/>
                    <ServiceStationItem
                        style={[{position:'absolute',bottom:0,left:this.state.detail ? 0 : -1000}]}
                        number={row.number}
                        src={row.photo}
                        title={row.name}
                        level={row.level}
                        central={row.central}
                        km={row.distance}
                        adr={row.address}
                        onPress={() =>{this.goToDetail(row)}}
                    />
                </View>
                <View  style={{height:1}}/>
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
        left:-999
    },
    btnContainer: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: Env.color.line,
        height: basefont * 90
    },

    location: {
        marginTop: basefont * 3,
        marginRight: basefont * 4
    }
});
