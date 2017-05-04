/**
 * Created by cryst on 2016/10/16.
 * edit by zhaidongyou on 2016/10/17
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;

import MyInfoId from './MyInfoId';
import ModifyTrueName from '../account-config/ModifyTrueName';
import {UserActions} from '../../../actions';
import {uploadUserPic} from '../../../services/UserService';
import Toast from '../../../components/Toast';
import SubmitButton from '../../../components/SubmitButton';
import notReview from '../../../assets/images/notReview.png';
import reviewing from '../../../assets/images/reviewing.png';
import reviewed from '../../../assets/images/reviewed.png';
import reviewError from '../../../assets/images/reviewError.png';
import {Star_i, IconQuestion} from '../../../components/Icons';
import MyInfoIdCadePhoto from './MyInfoIdCadePhoto';
import MyInfoDriverCard from './MyInfoDriverCard';
import MyInfoDrivingCard from './MyInfoDrivingCard';
import Button from '../../../components/widgets/Button';
import MyInfoQuestion from './MyInfoQuestion';
import MyInfoCarCode from './MyInfoCarCode';
import MyInfoCarType from './MyInfoCarType';
import MyInfoCarLength from './MyInfoCarLength';
import {getUserInfoStatus, validateUserInfo, saveUserInfo} from '../../../services/AppService';
import Server from '../../../service-config/ServerConfig';
import {getToken} from '../../../service-config/RequestService';
import MyInfoRealPhoto from './MyInfoRealPhoto';
import MyInfoItem from './components/MyInfoItem';

const topContent = [
    {
        img: notReview,
        text: '资料未认证',
        color: 'rgb(153,153,153)'
    },
    {
        img: reviewing,
        text: '审核中，请稍后',
        color: 'rgb(255,144,0)'
    },
    {
        img: reviewError,
        text: '认证失败',
        color: 'rgb(255,0,0)'
    },
    {
        img: reviewed,
        text: '资料已通过认证',
        color: 'rgb(88,221,0)'
    }
];


class MyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isRefreshing: true
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    goTo= (page) => {
        this.props.router.push(page, {
            successFun: this.setDataState,
            data: this.state.data
        });
    };

    fetchData() {
         this.setState({isRefreshing: true}, () => {
            getUserInfoStatus()
                .then((data) => {
                    data && this.setState({data: data, top: topContent[data.validStatus - 1]});
                    this.hasFailure(data);
                })
                .catch((err) => {
                    Toast.show(err.message, Toast.SHORT);
                })
                .finally(() => {
                    this.setState({isRefreshing: false});
                })
        })
    }

    /**
     * 产品要求有失败项即可提交，该方法用于判断是否有失败项
     */
    hasFailure(data){
        let hasFail = Object.keys(data).some((item)=>{
            if(item.indexOf('Reason') != -1){
                return data[item] ? true : false
            }
        });
        this.setState({hasFail:hasFail});
    }

    //修改头像
    onImagePick = (imageSource) => {
        uploadUserPic(imageSource)
            .then(rs => {
                Toast.show('头像修改成功', Toast.SHORT);
                saveUserInfo({memberPhoto: `${Server.WD_SERVICE}user/queryPicById?userId=${getToken().userId}&_=/${Math.random()}.jpg`})
                    .then(() => {
                        Toast.show('头像上传成功', Toast.SHORT);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                this.props.dispatch(UserActions.getUserPic());
                this.fetchData();
            })
            .catch(e => {
                Toast.show(e.message, Toast.SHORT);
            });
    };
    //判断每一项右侧的文字类型
    setRightText = (type, value, isPhoto = false) => {
        let text='';
        switch (type) {
            case 1:
                if(isPhoto){
                    text = value ? '已上传' : '未上传';
                }else {
                    text = value || '未输入';
                }
                break;
            case 2:
                text = '审核中';
                break;
            case 3:
                text = '已上传';
                break;
            case 4:
                if(isPhoto){
                    text = '已上传';
                }else {
                    text = value;
                }
                break;
            case 5:
                text = '已在陆鲸认证过';
                break;
            default :
                return '未上传'
        }
        return <Text style={[estyle.note]}>{text}</Text>
    };

    pressFun = (route, reason) => {
        reason ? this.alert(reason, route) : this.goTo(route)
    };
    //审核失败时弹出提示
    alert(reason, route) {
        this.props.alert(
            '提示',
            reason,
            [
                {
                    text: '取消', onPress: () => {
                }
                },
                {
                    text: '立即修改', onPress: () => {
                    this.goTo(route)
                }
                }
            ]
        )
    }

    setDataState = (opts) => {
        return saveUserInfo(opts)
            .then(() => {
                this.fetchData();
            })
    };


    render() {
        let data = this.state.data;
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="陆鲸认证" rightView={
                    <Button onPress={() => {
                        this.goTo(MyInfoQuestion)
                    }} style={estyle.topBtn}>
                        <IconQuestion color={Env.color.navTitle}/>
                    </Button>
                }/>
                <ScrollView style={[estyle.fx1]} refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        colors={[Env.color.main]}
                        progressBackgroundColor="#fff"
                        onRefresh={ this.fetchData.bind(this) }
                    />
                }
                >
                    {
                        this.state.data ?
                            <View style={[estyle.fx1]}>
                                <View style={[styles.top, estyle.fxCenter]}>
                                    <View style={[estyle.fxRowCenter]}>
                                        <Image source={this.state.top.img}
                                               style={{width: 80 * basefont, height: 80 * basefont}}/>
                                        <Text
                                            style={[estyle.text, {color: this.state.top.color}]}>{this.state.top.text}</Text>
                                    </View>
                                </View>
                                <MyInfoItem title="真实姓名" isWarn={data.nameValidReason} state={data.nameValidStatus}
                                            onPress={()=>{this.pressFun(ModifyTrueName,data.nameValidReason)}}
                                            rightDom={this.setRightText(data.nameValidStatus,data.realName)}/>

                                <MyInfoItem title="身份证号" isWarn={data.nameValidReason} state={data.nameValidStatus}
                                            onPress={()=>{this.pressFun(MyInfoId,data.nameValidReason)}}
                                            rightDom={this.setRightText(data.nameValidStatus,data.identityNo)}/>

                                <MyInfoItem title="真实头像" isWarn={data.memberPhotoValidReason}
                                            state={data.memberPhotoValidStatus} isPhoto={true}
                                            onPress={()=>{this.pressFun(MyInfoRealPhoto,data.memberPhotoValidReason)}}
                                            rightDom={this.setRightText(data.memberPhotoValidStatus,data.memberPhoto,true)}/>

                                <MyInfoItem title="身份证照片" isWarn={data.idCardValidReason}
                                            state={data.idCardValidStatus} isPhoto={true}
                                            onPress={()=>{this.pressFun(MyInfoIdCadePhoto,data.idCardValidReason)}}
                                            rightDom={this.setRightText(data.idCardValidStatus,data.idFrontPhoto || data.idBackPhoto,true)}/>

                                <MyInfoItem title="驾驶证照片" isWarn={data.drivingLicenseValidReason}
                                            state={data.drivingLicenseValidStatus} isPhoto={true}
                                            onPress={()=>{this.pressFun(MyInfoDriverCard,data.drivingLicenseValidReason)}}
                                            rightDom={this.setRightText(data.drivingLicenseValidStatus,data.drivingLicensePhoto,true)}/>

                                <View style={[estyle.paddingVertical]}/>

                                <MyInfoItem title="车牌号" isWarn={data.vehicleLicenseValidReason}
                                            state={data.vehicleLicenseValidStatus}
                                            onPress={()=>{this.pressFun(MyInfoCarCode,data.vehicleLicenseValidReason)}}
                                            rightDom={this.setRightText(data.vehicleLicenseValidStatus,data.carNumber)}/>

                                <MyInfoItem title=" 车厢长（米）" isWarn={data.vehicleLicenseValidReason}
                                            state={data.vehicleLicenseValidStatus}
                                            onPress={()=>{this.pressFun(MyInfoCarLength,data.vehicleLicenseValidReason)}}
                                            rightDom={this.setRightText(data.vehicleLicenseValidStatus,data.carLength)}/>

                                <MyInfoItem title="车型" isWarn={data.vehicleLicenseValidReason}
                                            state={data.vehicleLicenseValidStatus}
                                            onPress={()=>{this.pressFun(MyInfoCarType,data.vehicleLicenseValidReason)}}
                                            rightDom={this.setRightText(data.vehicleLicenseValidStatus,data.carType)}/>

                                <MyInfoItem title="行驶证照片" isWarn={data.vehicleLicenseValidReason}
                                            state={data.vehicleLicenseValidStatus} isPhoto={true}
                                            onPress={()=>{this.pressFun(MyInfoDrivingCard,data.vehicleLicenseValidReason)}}
                                            rightDom={this.setRightText(data.vehicleLicenseValidStatus,data.vehicleLicensePhoto,true)}/>

                                {
                                    data.validStatus == 1 || data.validStatus == 3 || this.state.hasFail ?
                                        <View style={[estyle.fxRowCenter, estyle.marginTop]}>
                                            <SubmitButton size="large"
                                                          doing={this.state.doing}
                                                          onPress={() => {
                                                              validateUserInfo().then(() => {
                                                                  Toast.show('提交成功', Toast.SHORT);
                                                                  this.fetchData();
                                                              }).catch((err) => {
                                                                  Toast.show(err.message, Toast.SHORT)
                                                              })
                                                          } }>提交认证</SubmitButton>

                                            <Text style={[estyle.note, estyle.paddingVertical]}>资料会提交给货源信息提供方共同认证</Text>
                                        </View> : <View style={[estyle.paddingVertical]}/>
                                }
                            </View> : <View/>
                    }
                </ScrollView>
            </View>
        );
    }
}
export default connect(function (stores) {
    return {userStore: stores.userStore, userPicStore: stores.userPicStore}
})(MyInfo);


const basefont = Env.font.base;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Env.color.bg
    },
    top: {
        width: Env.screen.width,
        height: 200 * basefont,
        backgroundColor: 'rgb(245,245,245)'
    },
    colorFFF: {
        color: '#FFF'
    },
    text: {
        fontSize: Env.font.text,
        color: Env.color.text
    }
});