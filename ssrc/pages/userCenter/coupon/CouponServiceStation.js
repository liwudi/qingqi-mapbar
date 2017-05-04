/**
 * Created by linyao on 2016/12/28.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Button from '../../../components/widgets/Button';
import  PageList from '../../../components/PageList';
import Env from '../../../utils/Env';
import MyLineSetStartEnd from './MyLineSetStartEnd';
import imgsrc from '../../../assets/images/noPic.png';
import {providerList, inverse} from '../../../services/ServiceStationService';
import {IconCall} from  '../../../components/Icons';
import ProvincePicker from  '../../../components/ProvincePicker';
import Toast from '../../../components/Toast';
const estyle = Env.style;

export default class CouponServiceStation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            cityCode: '',
            doing: false
        }
    }

    componentDidMount() {
        if (this.props.lonlat) {
            this.setState({doing: true})
            inverse(this.props.lonlat.longitude, this.props.lonlat.latitude)
                .then((data) => {
                    this.setState({cityName: data.name, cityCode: data.id})
                })
                .catch((err) => {
                    Toast.show(err.message, Toast.SHORT)
                })
                .finally(() => {
                    this.setState({doing: false})
                })
        }
    }

    changeCity(data) {
        this.setState({
            cityName: data.name,
            cityCode: data.id
        })
    }

    phoneList(phones) {
        if (!phones) return null;
        return phones.map((item, index) => {
            return <TouchableOpacity key={index} style={[estyle.marginLeft]} onPress={() => {
                this.props.callTo(item)
            }}>
                <Text style={[estyle.note]}>{item}</Text>
            </TouchableOpacity>
        })
    }

    render() {
        return (
            <View style={[estyle.fx1, estyle.backgroundColor]}>
                <TopBanner {...this.props} title="服务商列表" rightView={
                    this.state.doing ? null :
                    <Button color="#FFF" onPress={() => {
                        this.props.router.push(ProvincePicker, {
                            changeCity: this.changeCity.bind(this),
                            type: 'coupon',
                            id: this.props.id
                        })
                    }}>
                        <Text style={{
                            color: Env.color.navTitle,
                            fontSize: Env.font.text
                        }}>{this.state.cityName || '请选择城市' }</Text>
                    </Button>
                }/>
                {
                    this.state.doing ?
                        <View style={[estyle.fx1, estyle.fxCenter, estyle.cardBackgroundColor]}>
                            <Text style={[estyle.articleTitle, {color: Env.color.note}]}>正在获取所在城市服务商</Text>
                        </View> :
                        (this.state.cityCode ?
                            <PageList
                                style={[estyle.fx1, {backgroundColor: Env.color.bg}]}
                                reInitField={[this.state.cityCode]}
                                renderRow={(row) => {
                                    return (
                                        <View
                                            style={[estyle.padding, estyle.borderBottom, estyle.cardBackgroundColor, {overflow: 'hidden'}]}>
                                            <View style={[estyle.fxRow, estyle.fxCenter]}>
                                                <View style={[styles.image]}>
                                                    {
                                                        this.props.src ? <Image source={{uri: row.picture} }
                                                                                style={[styles.image, estyle.border, {
                                                                                    position: 'absolute',
                                                                                    top: 0,
                                                                                    left: 0,
                                                                                    zIndex: 100
                                                                                }]}/> : null
                                                    }
                                                    <Image source={imgsrc}
                                                           style={[styles.image, estyle.border]}/>
                                                </View>
                                                <View
                                                    style={[estyle.fx1, estyle.paddingHorizontal, {paddingRight: basefont * 40}]}>
                                                    <Text style={[estyle.text]}>{row.stationName}</Text>
                                                    <View style={[estyle.fxRow]}>
                                                        <IconCall color={Env.color.note}/>
                                                        {this.phoneList(row.phones)}
                                                    </View>
                                                    <Text style={[estyle.note]}>{row.address}</Text>
                                                </View>
                                            </View>
                                            {
                                                row.balance ? <View
                                                    style={[styles.effectiveEnd, estyle.fxCenter, {backgroundColor: row.balance == 1 ? Env.color.note : Env.color.auxiliary}]}>
                                                    <Text
                                                        style={[{fontSize: Env.font.mini, color: Env.color.navTitle}]}>{
                                                        row.balance == 1 ? '已送完' : row.balance == 2 ? '余量紧张' : '余量充足'
                                                    }</Text>
                                                </View> : null
                                            }
                                        </View>
                                    )
                                }}
                                fetchData={(pageNumber, pageSize) => {
                                    return providerList(this.props.id, pageNumber, pageSize, this.state.cityCode)
                                }}/>
                            : <View style={[estyle.fx1, estyle.fxCenter, estyle.cardBackgroundColor]}>
                            <Text style={[estyle.articleTitle, {color: Env.color.note}]}>请选择服务商所在城市</Text>
                        </View>)
                }

            </View>
        );
    }
}
const basefont = Env.font.base;
const styles = StyleSheet.create({
    effectiveEnd: {
        position: 'absolute',
        transform: [{rotate: '45deg'}],
        width: 200 * basefont,
        height: 40 * basefont,
        top: 15 * basefont,
        right: -60 * basefont,
        backgroundColor: Env.color.auxiliary
    },
    image: {
        width: basefont * 200, //200,120 是设计中的图片尺寸
        height: basefont * 120
    },
    infoContainer: {
        flex: 1,
        marginLeft: basefont * 16
    },
    textKm: {
        fontSize: Env.font.text,
        color: Env.color.note,
        flex: 1,
        marginLeft: basefont * 16
    },
    starContainer: {
        flexDirection: 'row',
        marginVertical: basefont * 10,
        marginLeft: basefont * 10,
    },
    adrContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    location: {
        marginTop: basefont * 3,
        marginRight: basefont * 4
    }
})