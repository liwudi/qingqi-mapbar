/**
 * Created by mapbar on 2017/1/12.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Navigator,
    ScrollView,
    NativeModules,
    RefreshControl,
    Image
} from 'react-native';

import QRCode from 'react-native-qrcode';
import TopBanner from '../../../components/TopBanner';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import {IconCall} from '../../../components/Icons';
import Button from '../../../components/widgets/Button';
import {couponDetail, recommend} from '../../../services/ServiceStationService';
import CouponServiceStation from './CouponServiceStation';
import Toast from '../../../components/Toast';

import Env from '../../../utils/Env';
import CouponRecord from './CouponRecord';
import huabian from '../../../assets/images/huabian.png';
import huabian1 from '../../../assets/images/huabian1.png';
import huabian2 from '../../../assets/images/huabian2.png';
import huabian3 from '../../../assets/images/huabian3.png';
import qrcode from '../../../assets/images/qrcode.png';
import qrCode from './CouponQRCode';
//const module = NativeModules.MapbarMapModule;
const estyle = Env.style;
const basefont = Env.font.base;

export default class CouponDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            lonlat: null,
            isRefreshing: true
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        couponDetail(this.props.couponId)
            .then((data) => {
                this.setState({data: data}, () => {
                    if (this.props.isUnUsed) {
                        this.getLocation()
                    }
                })
            })
            .catch((err) => {
                Toast.show(err.message, Toast.SHORT);
            })
            .finally(() => {
                this.setState({isRefreshing: false})
            })
    }

    getLocation() {
        recommend({activityId: this.state.data.id})
            .then((data) => {
                this.setState({serverStation: data})
            })
            .catch((err) => {
                Toast.show(err.message, Toast.SHORT);
            })
    }

    render() {
        let data = this.state.data;
        return (
            <View style={[estyle.fx1, {backgroundColor: Env.color.bg}]}>
                <TopBanner {...this.props} title="优惠券" rightView={
                    data ?
                        <Button color="#FFF" onPress={() => {
                            this.props.router.push(CouponRecord, {coupon: data.id, vin: data ? data.vin : ''})
                        }
                        }><Text style={{color: Env.color.navTitle, fontSize: Env.font.text}}>消费记录</Text></Button> :
                        <View/>
                }/>
                <ScrollView style={[estyle.fx1]} refreshControl={
                    <RefreshControl
                        onRefresh={this.fetchData.bind(this)}
                        refreshing={this.state.isRefreshing}
                        colors={[Env.color.main]}
                        progressBackgroundColor="#fff"
                    />
                }
                >
                    {
                        this.state.data ?
                            <View style={[estyle.fx1]}>
                                <View style={[estyle.padding]}>
                                    <Image source={huabian1} style={styles.huabian1}/>
                                    <View style={[estyle.cardBackgroundColor, estyle.paddingTop, estyle.fxCenter]}>
                                        <Text
                                            style={[estyle.articleTitle, {color: Env.color.main}]}>{data.couponName}</Text>
                                    </View>
                                    <Image source={huabian2} style={styles.huabian2}/>
                                    <View style={[estyle.fxCenter, estyle.cardBackgroundColor]}>
                                        <Text
                                            style={[estyle.text, estyle.marginBottom, {color: Env.color.auxiliary}]}>{data.couponContent}</Text>
                                    </View>
                                    <View style={[estyle.fxCenter, estyle.cardBackgroundColor, estyle.paddingBottom]}>
                                        <View style={[estyle.fxCenter, estyle.fxRow]}>
                                            <Text style={[estyle.articleTitle]}>余额：</Text>
                                            <Text
                                                style={[estyle.articleTitle, {color: Env.color.auxiliary}]}>{data.unUsedNum}</Text>
                                        </View>
                                    </View>
                                    <View style={[estyle.cardBackgroundColor, estyle.paddingLeft]}>
                                        <Text style={[estyle.note]}>总额：{this.props.sum + data.unit}</Text>
                                        <Text style={[estyle.note]}>限使用车辆（车牌/VIN）：</Text>
                                        <Text
                                            style={[estyle.text]}>{data.carNumber + '/' + data.vin}</Text>
                                        <Text
                                            style={[estyle.note, estyle.marginBottom]}>使用有效期：{data.startDate + '至' + data.endDate}</Text>
                                    </View>
                                    <Image source={huabian3} style={styles.huabian1}/>
                                </View>
                                <TouchableOpacity onPress={ () => {
                                    this.props.router.push(qrCode, {data: data})
                                } }
                                                  style={[{backgroundColor: Env.color.auxiliary}, estyle.fxRow, estyle.fxCenter, estyle.padding]}>
                                    <Image source={qrcode} style={{width: 48 * basefont, height: 48 * basefont}}/>
                                    <Text
                                        style={[estyle.articleTitle, {color: '#fff'}, estyle.marginLeft]}>查看消费码和二维码</Text>
                                </TouchableOpacity>
                                <View>
                                    <View style={[estyle.marginTop, estyle.padding]}>
                                        <Text style={[estyle.note]}>服务商信息</Text>
                                    </View>
                                    {
                                        this.state.serverStation ?
                                            <View style={[estyle.cardBackgroundColor, estyle.marginBottom]}>
                                                <ViewForRightArrow
                                                    rightIcon={IconCall}
                                                    iconSize={Env.vector.call.size}
                                                    iconColor={Env.color.main}
                                                    style={{borderBottomWidth: 0}}
                                                    onPress={() => {
                                                        this.props.callTo(this.state.serverStation.phone)
                                                    }}
                                                >
                                                    <View style={[estyle.fx1]}>
                                                        <View style={[estyle.fx1]}>
                                                            <Text
                                                                style={[estyle.text, {color: Env.color.auxiliary}]}>为您推荐</Text>
                                                            <Text
                                                                style={[estyle.text]}>{this.state.serverStation.stationName}</Text>
                                                        </View>
                                                        <View>
                                                            <Text
                                                                style={[estyle.note]}>{this.state.serverStation.address}</Text>
                                                        </View>
                                                    </View>
                                                </ViewForRightArrow>
                                            </View> : null
                                    }
                                    <View
                                        style={[estyle.padding, estyle.cardBackgroundColor, estyle.marginBottom]}>
                                        <TouchableOpacity style={[estyle.fxCenter]} onPress={() => {
                                            this.props.router.push(CouponServiceStation, {
                                                id: data.id,
                                                lonlat: this.state.lonlat
                                            })
                                        }}>
                                            <Text
                                                style={[estyle.articleTitle, {color: Env.color.main}]}>查看更多服务商&gt;</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View> : <View />
                    }
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    huabian1: {
        width: Env.screen.width - 60 * basefont,
        height: 15 * basefont
    },
    huabian2: {
        width: Env.screen.width - 60 * basefont,
        height: 54 * basefont,
    }
})
