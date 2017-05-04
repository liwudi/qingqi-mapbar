/**
 * Created by ligj on 2016/9/23.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    Navigator,
    View,
    Text,
    StatusBar,
    Linking,
    DeviceEventEmitter,
    NetInfo,
    Switch,
    NativeModules,
    Image,
    AppState,
    Keyboard,
    Alert,
    PushNotificationIOS
} from 'react-native';

import Toast from '../components/Toast';
import {MessageActions} from '../actions/index';
import Guide2 from './guide2';
import {addEventSystemBack} from '../utils/CommModule';
import Router from '../services/RouterService';
import Env from '../utils/Env'
import { registerApp } from '../services/IosPushService';
import ServerConfig from '../service-config/ServerConfig';


const estyle = Env.style;

class Main extends Component {

    navigator = null;
    router = null;

    toMessagePage() {
        //this.router.resetTo(HomeRouter, {initPage:0});
    }

    initPush(){
        //请求权限
        PushNotificationIOS.requestPermissions();
        console.log('PushNotificationIOS');

        //注册服务
        PushNotificationIOS.addEventListener('register', (id) => {
            registerApp(id);
            global.storage.save({
                key: 'deviceId',
                rawData: {
                    deviceId:id
                },
                expires: null
            });
            ServerConfig.DEVICE_ID = id;
        });

        //收到推送消息
        PushNotificationIOS.addEventListener('notification', (e) => {

            /*

             params.putString("Content", payload.getString("Content"));
             params.putString("Title", payload.getString("Title"));
             params.putString("CustomContent", payload.getString("CustomContent"));
             params.putInt("noticeId", payload.getInt("noticeId"));


             { _data:
                { remote: true,
                    notificationId: 'F72FEC57-C09A-47BF-9BAC-FAA0ABD79CEC',
                    '附加字段1': '附加字段1内容',
                    title: '标题',
                    msgId: 'a61f4f6865b44080b04363eee2eb9627',
                    '附加字段2': '附加字段2内容'
                 },
                 _remoteNotificationCompleteCalllbackCalled: false,
                 _isRemote: true,
                 _notificationId: 'F72FEC57-C09A-47BF-9BAC-FAA0ABD79CEC',
                 _alert: '内容',
                 _sound: 'default.caf',
                 _badgeCount: 1
             }
             */

            console.log('PushNotificationIOS', e)
        });

        //用户通过点击推送通知来冷启动应用（即：之前应用不在运行状态），此函数会返回一个初始的通知
        // PushNotificationIOS.popInitialNotification()

    }

    newPushMessage(message, isNotificationClick = false) {
        this.props.dispatch(MessageActions.addMessage(message));
    }

    constructor(props) {
        super(props);
        this.state = {
            isConnected: true
        };

        DeviceEventEmitter.addListener("notificationClick", (event) => {
            try {
                event.CustomContent = event.CustomContent ? JSON.parse(event.CustomContent || '{}') : {};
            } catch (e) {
                event.CustomContent = {};
            }
            this.newPushMessage(event, true);
        });
        DeviceEventEmitter.addListener("notificationReceive", (event) => {
            try {
                event.CustomContent = event.CustomContent ? JSON.parse(event.CustomContent || '{}') : {};
            } catch (e) {
                event.CustomContent = {};
            }
            this.newPushMessage(event);
        });
        // DeviceEventEmitter.addListener("messageReceiver", (event) => {
        //     event.CustomContent = event.CustomContent ? JSON.parse(event.CustomContent) : {};
        //     console.log('接收到消息：', event);
        //     this.props.dispatch(MessageActions.addMessage(event));
        // });

        this.props.dispatch(MessageActions.getMessages());

        NetInfo.isConnected.fetch().done(isConnected => {
            global.NetIsConnected = isConnected;
            this.setState({NetIsConnected: isConnected});
        });
        NetInfo.addEventListener('change', isConnected => {
            isConnected = isConnected.toUpperCase();
            global.NetIsConnected = (isConnected !== 'NONE');
            this.setState({NetIsConnected: isConnected !== 'NONE'});
        });

        // global.storage.load({
        //     key: 'preLoginUserName'
        // })
        //     .then(rs => this.setState({preLoginUserName: rs.name}))
        //     .catch(e => console.log(e));
        this.initPush();

    }

    callTo = (phone) => {
        let url = 'tel:' + phone;
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Toast.show('拨打电话' + url + '失败', Toast.SHORT);
            }
        });
    };
    doBack = (exitApp) => {
        let routeIdx = this.router.currentIndex();
        if (routeIdx > 1) {
            /**
             * 页面退出之前收起键盘
             * */
            Keyboard.dismiss();
            this.navigator.pop();
        } else {
            Alert.alert(
                '提示',
                '是否要退出应用?',
                [
                    {
                        text: '确定',
                        onPress: () => {
                            exitApp();
                        }
                    },
                    {
                        text: '取消'
                    }
                ]
            );
        }
        return true;
    };

    componentDidMount() {
        addEventSystemBack(
            (exitApp) => {
                return this.doBack(exitApp);
            }
        );
    }

    componentWillUnmount() {
        clearTimeout(this.timer);

    }

    componentWillReceiveProps(props) {
        // console.log(props)
    }

    renderMain() {
        return <View style={[estyle.fx1]}>
            <Navigator
                initialRoute={Router.Page(Guide2)}
                renderScene={(page, navigator) => {
                    this.router = this.router || new Router(navigator);
                    this.navigator = navigator;
                    let Component = page.component;
                    return (
                        <Component
                            navigator={navigator}
                            router={this.router}
                            callTo={this.callTo}
                            doBack={() => {
                                this.doBack();
                            }}
                            NetIsConnected={this.state.NetIsConnected}
                            preLoginUserName={this.state.preLoginUserName}
                            alert={(a, b, c) => {
                                Alert.alert(a, b, c);
                            }}
                            {...page.props}
                        />
                    );
                }}
            />
        </View>
    }

    render() {
        return (
            <View style={[estyle.fx1]}>
                {this.renderMain()}
            </View>
        );
    }
}

export default connect(function (stores) {
    return {messageStore: stores.messageStore}
})(Main);
