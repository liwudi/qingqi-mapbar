/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    ListView,
    StyleSheet,
    Image,
    RefreshControl,
    TouchableOpacity
} from 'react-native';

import ViewForRightArrow from '../../../components/ViewForRightArrow';
import {IconCall,IconMobile} from '../../../components/Icons';
import Env from '../../../utils/Env';
const estyle = Env.style;
import TopBanner from '../../../components/TopBanner';
import ConfirmButton from '../../../components/ConfirmButton'
import {stationDetail} from '../../../services/AppService';
import {queryRated} from '../../../services/ServiceStationService';
import ListItem from '../../../components/ListItem';
import BorderButton from '../../../components/BorderButton'
import ServiceStationAppointment from './ServiceStationAppointment';
import ServiceStationAppointmentList from './ServiceStationAppointmentList'
import Item from './components/ServiceStationAppointmentItem';
import PageList from '../../../components/PageList';
import Server from '../../../service-config/ServerConfig';
import defaultImg from '../../../assets/images/serviceStation.png';

import ServiceStationDetailMap from './ServiceStationDetailMap';
const imgUrlConfig = `${Server.IMG_SERVICE}?userId=`;

export default class ServiceStationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isRefreshing:true,
            flag: 1 // 1同车型 2全部车型评价
        };
    }
    componentWillUnmount() {
        this.props.nav && this.props.nav.doBack && this.props.nav.doBack();
    }

    getLevel(value) {
        let type;
        switch (+value) {
            case 3 :
                type = '三星服务站';
                break;
            case 4 :
                type = '四星服务站';
                break;
            case 5 :
                type = '五星服务站';
                break;
            case 6 :
                type = '核心服务站';
                break;
            default:
                type = '合作服务站'
        }
        return type;
    }


    componentDidMount() {
        stationDetail(this.props.stationId)
            .then((data) => {
                /**
                 * name 服务站名
                 * address 地址
                 *  level 等级
                 *  introduce 简介
                 *  phone 电话
                 * */
                this.setState({data: data})
            })
            .finally(() => {
                this.setState({isRefreshing:false});
            })
    }
    goToDetailMap() {
        this.goTimer && clearTimeout(this.goTimer);
        this.goTimer = setTimeout(() => {
            let data = this.state.data || {};
            //   console.info(data, '===================nav params')
            data.lon && data.lat && this.props.router.push(ServiceStationDetailMap,{
                nav: data
            });
        }, 500);

    }

    render() {
        let data = this.state.data;
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="服务站详情" rightView={<View>
                    <BorderButton color="#FFF" onPress={() => { this.props.router.push(ServiceStationAppointmentList)
                    } }>我的预约</BorderButton>
                </View>  }/>
                <ScrollView
                    style={[estyle.fx1]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            colors={[Env.color.main]}
                            progressBackgroundColor="#fff"
                        />
                    }
                >
                    <View style={[estyle.cardBackgroundColor,styles.imgbox]}>
                        {data.photo ? <Image source={{uri: data.photo}} onError={() => {}} style={[styles.image,{position:'absolute',top:0,left:0,zIndex:100}]}/>:null}
                        <Image source={defaultImg} style={styles.image}/>
                    </View>
                    <View
                        style={[estyle.cardBackgroundColor, estyle.fxRow, estyle.fxRowCenter, estyle.padding, estyle.borderBottom, estyle.marginBottom]}>
                        <Text style={[estyle.fx1, estyle.text]}>{this.state.data.name}</Text>
                        <ConfirmButton size="small"
                                       onPress={() => {this.props.router.push(ServiceStationAppointment,{stationId:this.props.stationId})} }>我要预约</ConfirmButton>
                    </View>
                    <View style={[estyle.cardBackgroundColor, estyle.borderBottom, estyle.marginBottom]}>
                        <ViewForRightArrow
                            rightIcon={IconCall}
                            iconSize={Env.vector.call.size}
                            iconColor={Env.color.main}
                            onPress={() => {
                                this.props.callTo(data.tel)
                            }}
                        >
                            <View style={[estyle.fxRow]}>
                                <Text style={[estyle.text]}>电话：</Text>
                                <Text style={[estyle.text]}>{data.tel}</Text>
                            </View>
                        </ViewForRightArrow>
                        <ViewForRightArrow
                            rightIcon={IconMobile}
                            iconSize={Env.vector.call.size}
                            iconColor={Env.color.main}
                            onPress={() => {
                                this.props.callTo(data.phone)
                            }}
                        >
                            <View style={[estyle.fxRow]}>
                                <Text style={[estyle.text]}>手机：</Text>
                                <Text style={[estyle.text]}>{data.phone}</Text>
                            </View>
                        </ViewForRightArrow>
                        <ViewForRightArrow onPress={()=>{
                            this.goToDetailMap();
                        }}>
                            <View style={[estyle.fxRow]}>
                                <Text style={[estyle.text]}>地址：</Text>
                                <Text style={[estyle.fx1,estyle.text]}>
                                    {data.address}
                                </Text>
                            </View>
                        </ViewForRightArrow>
                        <View style={[estyle.borderBottom, estyle.cardBackgroundColor]}>
                            <View style={[estyle.margin, estyle.fxRow]}>
                                <Text style={[estyle.text, {textAlign: 'left'}]}>服务站等级：</Text>
                                <Text style={[estyle.text,estyle.marginLeft,{ color: Env.color.auxiliary, textAlign: 'left'}]}>{data.level}</Text>
                                <Text style={[estyle.fx1,estyle.text,estyle.marginLeft,{color: Env.color.auxiliary, textAlign: 'left'}]}>{data.central}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[estyle.cardBackgroundColor, estyle.marginBottom]}>
                        <ListItem left='本站简介：'/>
                        <View style={[estyle.padding]}>
                            <Text style={estyle.text}>{data.introduce || '无'}</Text>
                        </View>
                    </View>
                    <View style={[estyle.cardBackgroundColor]}>
                        <ListItem left='评价：'/>
                        <View style={[estyle.fxRow,estyle.fxCenter]}>
                            <TouchableOpacity style={[estyle.fx1,{borderBottomWidth:10 * Env.font.base,borderBottomColor: this.state.flag == 1 ? Env.color.main : 'transparent' }]} onPress={ ()=>{this.setState({flag:1})} } >
                                <Text style={[estyle.paddingVertical, {color: this.state.flag == 1 ? Env.color.main : Env.color.text, textAlign:'center'}, estyle.fx1]}>同车型评价</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[estyle.fx1,{borderBottomWidth:10 * Env.font.base,borderBottomColor: this.state.flag == 2 ? Env.color.main : 'transparent' }]} onPress={ ()=>{this.setState({flag:2})} }>
                                <Text style={[estyle.paddingVertical, {color: this.state.flag == 2 ? Env.color.main : Env.color.text, textAlign:'center'}, estyle.fx1]}>全部车型评价</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <PageList
                        style={[estyle.cardBackgroundColor, estyle.fx1]}
                        reInitField={[this.state.flag,this.state.isRender]}
                        noData={'无评价'}
                        renderRow={(row,sectionId,rowId) => {
                            return  <Item
                                {...this.props}
                                name={row.userName}
                                photo={ {uri:imgUrlConfig+row.driverId+`&_rid=${Math.random()}`} }
                                score={row.rate}
                                date={row.date}
                                content={row.content}
                                orderCode={row.woCode}
                                carType={row.carType}
                                ratedId={row.ratedId}
                                {...this.props}
                                RenderList={ ()=>{this.setState({isRender:new Date().getTime() })} }
                            />
                        }}
                        fetchData={(pageNumber) => {
                            return queryRated(pageNumber,2,this.props.stationId,this.state.flag)
                        }}
                    />
                </ScrollView>
            </View>

        );
    }
}
const basefont = Env.font.base;
const styles = StyleSheet.create({
    typeContainer: {
        position: 'absolute',
        bottom: 0,
        zIndex: 100,
        padding: basefont * 30
    },
    image: {
        width: Env.screen.width,
        height: Env.screen.width * .6,
        resizeMode: 'stretch'
    },
    btnContainer: {
        marginBottom: basefont * 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: basefont * 30
    },
    infoContentContainer: {
        alignItems: 'center',
    },
    titleText: {
        flex: 1
    },
    adrContainer: {
        marginBottom: basefont * 30
    },
    commentContainer: {
        flex: 1,
        paddingHorizontal: 30 * basefont
    },
    conmmentItemContainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: Env.color.line,
        paddingVertical: 30 * basefont
    },
    photo: {
        width: basefont * 70,
        height: basefont * 70,
        borderRadius: 70,
        marginRight: 20 * basefont,

    },
    scoreContainer: {
        flexDirection: 'row'
    },
    item: {
        paddingTop: 14 * Env.font.base,
        paddingBottom: 14 * Env.font.base,
        paddingLeft: 30 * Env.font.base,
        borderBottomWidth: 1 * Env.font.base,
        borderColor: '#e5e5e5',
        backgroundColor: '#FFF'
    },
    callName: {
        color: Env.color.text,
        fontSize: Env.font.text
    },
    callPhone: {
        color: Env.color.note,
        fontSize: Env.font.text
    },
    allText: {
        color: Env.color.main
    },
    imgbox: {
        position: 'relative',
        width: Env.screen.width,
        height: Env.screen.width * .6
    }
});