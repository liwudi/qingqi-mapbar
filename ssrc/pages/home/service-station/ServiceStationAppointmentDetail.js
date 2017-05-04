/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet, RefreshControl,
    Alert
} from 'react-native';
import Env from '../../../utils/Env';
import TopBanner from '../../../components/TopBanner';
import ConfirmButton from '../../../components/ConfirmButton'
import TextArea from '../../../components/widgets/TextArea.android';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import {orderDetail, orderOver,queryRated} from '../../../services/ServiceStationService';
import  ImageList from '../../../components/ImageList';
import  Audio from '../../../components/Audio';
import  ServiceStationDetail from './ServiceStationDetail';
import ServiceStationEvaluate from './ServiceStationEvaluate';
import CancleAppointment from './components/CancleAppointment';
import  Toast from '../../../components/Toast';
import Item from './components/ServiceStationAppointmentItem';
import PageList from '../../../components/PageList';
import ListItem from '../../../components/ListItem';
import Server from '../../../service-config/ServerConfig';
import  HelpMeMap from './HelpMeMap';

const estyle = Env.style;
const imgUrlConfig = `${Server.IMG_SERVICE}?userId=`;
export default class ServiceStationAppointmentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isRefreshing: true,
            imgArr: [],
            audioArr: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(callback) {
        orderDetail(this.props.order.woCode)
            .then((data) => {
                let imgArr = [], audioArr = [];
                if (data.files) {
                    imgArr = data.files.split(';')[0].split(',');
                    audioArr = data.files.split(';')[1].split(',');
                }
                callback && callback(data.woStatus);
                this.setState({data: data, imgArr: imgArr, audioArr: audioArr});
            })
            .catch()
            .finally(() => {
                this.setState({isRefreshing: false})
            })
    }
    goToHelpMe = () => {
        this.goTimer && clearTimeout(this.goTimer);
        this.goTimer = setTimeout(() => {
            this.fetchData(()=>{
                this.props.router.push(HelpMeMap, {nav:{woCode:this.state.data.woCode}})
            })
        }, 500);
    };
    confirmedService=()=>{
        this.fetchData( (state)=>{
            if(state == 11){
                Toast.show('因超过72小时未确认服务完成，工单已关闭！', Toast.SHORT);
                return;
            }
            if(state == 5){
                Alert.alert(
                    '确认服务完成',
                    '您确认本次维修保养服务已完成？',
                    [
                        {
                            text: '确认', onPress: () => {
                            orderOver(this.props.order.woCode)
                                .then(()=>{ this.goToServiceStationEvaluate(); this.fetchData()})
                                .catch((err)=>{ Toast.show(err.message,Toast.SHORT);})
                        }
                        },
                        {
                            text: '取消', onPress: () => {}
                        }
                    ]
                )
            }
        } )
    };
    goToServiceStationEvaluate(){
        let data = this.state.data;
        this.props.router.push(ServiceStationEvaluate,{stationId:data.stationId,stationName:data.stationName,woCode:this.props.order.woCode,prantFetch:this.fetchData.bind(this)})
    }

    buttonType() {
        if (!this.state.data.woStatus) return null;
        let status = this.state.data.woStatus,
            orderType = this.state.data.woType,
            rateStatus= this.state.data.rateStatus;
        let cancleDom = <View style={[estyle.fxRowCenter]}>
            <ConfirmButton size="large"
                           onPress={() => {
                               this.refs.cancle.show();
                           }}>取消预约</ConfirmButton>
        </View>
        //判断工单状态
        if (status == 1) {
            return cancleDom
        } else if (status == 2) {
            //判断工单类型
            if (orderType == 1) {
                return cancleDom
            } else if (orderType == 2) {
                return <View style={[estyle.fxRowCenter]}>
                    <ConfirmButton size="large"
                                   style={[estyle.marginBottom]}
                                   onPress={() => {
                                       /**
                                       *
                                       *因不是soket通信，在长时间未操作时状态变化未可知，故再请求一遍接口改变状态,其实特别不合理。。。。
                                       *
                                       **/
                                       this.fetchData(()=>{
                                           Toast.show('请通过400电话取消预约', Toast.SHORT);
                                       })
                                   }}>取消预约</ConfirmButton>
                    <ConfirmButton size="large"
                                   style={[estyle.marginBottom]}
                                   onPress={this.goToHelpMe}>救援人员位置</ConfirmButton>
                </View>
            }
        } else if (status == 5) {
            return <View style={[estyle.fxRowCenter]}>
                <ConfirmButton size="large"
                               onPress={this.confirmedService}>确认服务完成</ConfirmButton>
            </View>
        } else if (status == 6 || status == 7) {
            //判断评价状态
            if (rateStatus == 1) {
                return <View style={[estyle.fxRowCenter]}>
                    <ConfirmButton size="large"
                                   onPress={() => {
                                       this.goToServiceStationEvaluate();
                                   }}>评价</ConfirmButton>
                </View>
            } else if (rateStatus == 2) {
                return <View style={[estyle.cardBackgroundColor]}>
                    <ListItem left='我的评价：'/>
                    <PageList
                        style={[estyle.cardBackgroundColor, estyle.fx1]}
                        reInitField={[this.state.isRender]}
                        renderRow={(row,sectionId,rowId) => {
                            return  <Item
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
                            return queryRated(pageNumber,2,0,1,this.state.data.woCode)
                        }}
                    />
                </View>

            } else if (rateStatus == 3) {
                return <View style={[estyle.fxRowCenter]}>
                    <ConfirmButton size="large"
                                   disabled={true}
                    >评价</ConfirmButton>
                </View>
            }
        } else if(status == 8 ) {
            return <View style={[estyle.fxRowCenter]}>
                <Text>您已取消该预约！</Text>
                <Text>原因：{this.state.data.reason}</Text>
            </View>
        }else if(status == 10 ){
            return <View style={[estyle.fxRowCenter]}>
                <Text>客服/服务站已取消该预约！</Text>
                <Text>原因：{this.state.data.reason}</Text>
            </View>
        }else if(status == 11){
            return <View style={[estyle.fxRowCenter]}>
                <Text>因超过72小时未确认服务完成，工单已关闭！</Text>
            </View>
        }else {
            return <View/>
        }
    }

    render() {
        let data = this.state.data;
        return (
            <View style={[estyle.fx1,
                estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="预约详情"/>
                <ScrollView
                    style={[estyle.fx1]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            colors={[Env.color.main]}
                            progressBackgroundColor="#fff"
                            onRefresh={this.fetchData.bind(this)}
                        />
                    }
                >
                    <Text style={[estyle.padding]}>基本信息</Text>
                    <View style={[estyle.paddingHorizontal, estyle.cardBackgroundColor]}>
                        <ViewForRightArrow style={[estyle.borderBottom]} onPress={ () => {
                            this.props.router.push(ServiceStationDetail, {stationId: data.stationId})
                        } }>
                            <Text
                                style={[estyle.text, estyle.paddingVertical, {color: Env.color.main}]}>{data.stationName}</Text>
                        </ViewForRightArrow>
                        <View style={[estyle.paddingVertical, estyle.borderBottom, estyle.fxRow]}>
                            <Text style={[estyle.text, {color: Env.color.note, width: Env.font.text * 5}]}>工单号</Text>
                            <Text style={[estyle.text]}>{data.woCode}</Text>
                        </View>
                        <View style={[estyle.paddingVertical, estyle.borderBottom, estyle.fxRow]}>
                            <Text style={[estyle.text, {color: Env.color.note, width: Env.font.text * 5}]}>预约人</Text>
                            <Text style={[estyle.text]}>{data.name}</Text>
                        </View>
                        <View style={[estyle.paddingVertical, estyle.borderBottom, estyle.fxRow]}>
                            <Text style={[estyle.text, {color: Env.color.note, width: Env.font.text * 5}]}>电话</Text>
                            <Text style={[estyle.text]}>{data.phone}</Text>
                        </View>
                        <View style={[estyle.paddingVertical, estyle.borderBottom, estyle.fxRow]}>
                            <Text style={[estyle.text,estyle.marginRight, {color: Env.color.note, width: Env.font.text * 6}]}>预约到站时间</Text>
                            <Text style={[estyle.text]}>{data.orderTime}</Text>
                        </View>
                        <View style={[estyle.paddingVertical, estyle.borderBottom, estyle.fxRow]}>
                            <Text style={[estyle.text,estyle.marginRight, {color: Env.color.note, width: Env.font.text * 6}]}>预约提交时间</Text>
                            <Text style={[estyle.text]}>{data.createTime}</Text>
                        </View>

                    </View>
                    <Text style={[estyle.padding, estyle.text]}>预约项目</Text>
                    <View style={[estyle.cardBackgroundColor, estyle.paddingHorizontal]}>
                        <View style={[estyle.borderBottom,estyle.fxColumnCenter]}>
                            <Text style={[estyle.paddingVertical, estyle.text]}>常规保养:</Text>
                            <Text style={[estyle.paddingVertical, estyle.text]}>{data.maintenanceItem || '无'}</Text>
                        </View>
                        <View style={[estyle.borderBottom,estyle.fxColumnCenter]}>
                            <Text style={[estyle.paddingVertical, estyle.text]}>维修服务:</Text>
                            <Text style={[estyle.paddingVertical, estyle.text]}>{data.repairItem || '无'}</Text>
                        </View>
                    </View>
                    <Text style={[estyle.padding, estyle.text]}>预约信息</Text>
                    <View style={[estyle.cardBackgroundColor, estyle.paddingHorizontal,estyle.borderBottom]}>
                        <Text style={[estyle.paddingVertical, estyle.text]}>{data.feedback || '无'}</Text>
                    </View>
                    <View style={[estyle.fxColumnCenter]}>
                        <ImageList title="预约图片" type='show' data={this.state.imgArr}/>
                    </View>
                    {Env.isAndroid ? <View style={[estyle.fxColumnCenter]}>
                        <Audio {...this.props} title="预约录音" type='show' data={this.state.audioArr}/>
                    </View> : null}
                    <View style={[estyle.marginVertical]}>
                        {
                            this.buttonType()
                        }
                    </View>
                    <CancleAppointment ref="cancle" orderId={this.props.order.woCode}
                                       fetchData={this.fetchData.bind(this)}/>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Env.color.bg
    },
    loginView: {
        alignItems: 'center'
    }
});