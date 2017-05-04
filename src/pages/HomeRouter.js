/**
 * Created by ligj on 2016/9/23.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';
import {connect} from 'react-redux'
import HomePage from './home/HomePage';
import UserCenterHome from './userCenter';
import MessageList from './message/MessageList';
import {setCurrentActivePage} from '../actions/MessageActions';
import Login from './user/index';
import MainNavBar from '../components/MainNavBar';
import Env from '../utils/Env';
import {addInterceptor, interceptAlerting, unInterceptAlerting} from '../service-config/RequestService';
const estyle = Env.style;
const basefont = Env.font.base;
const tabs = [
    {component: HomePage, index: 0, name: 'HomePage'},
    {component: MessageList, index: 1, name: 'MessageList2'},
    {component: UserCenterHome, index: 2, name: 'UserCenterHome'}
];
class HomeRouter extends Component {
    constructor(props) {
        super(props);
        this.initialRoute = tabs[0];
        this.state = {
            routeIndex: tabs[0].index
        };
        addInterceptor((res) => {
            if (res && (res.resultCode && res.resultCode === 509) || (res.code && res.code === 1019)) {
                res.message = '账号未登录';
                interceptAlerting();
                this.props.alert(
                    '提示',
                    '您的账号已在其它设备登录，如非本人操作，请修改密码！',
                    [
                        {
                            text: '确定',
                            onPress: () => {
                                unInterceptAlerting();
                                this.props.router.resetTo(Login);
                            }
                        }
                    ]
                );
            }
            return res;
        });
    }

    /**
     * 设置消息条数是否可以增加
     * @param have
     */
    setCurrentPage = (index) => {
        this.props.dispatch(setCurrentActivePage({main: index, message: 0}));
    };
    currentRoute = () => {
        switch (this.state.routeIndex){
            case 0 : return <HomePage {...this.props}/>; break;
            case 1 : return <MessageList {...this.props}/>; break;
            case 2 : return <UserCenterHome {...this.props}/>; break;
            default : return <HomePage {...this.props}/>
        }
    }

    render() {
        let messageStore = this.props.messageStore;
        // console.log('~~~~~~~~~~~~~~~~~~~~~~~this.props.messageStore',messageStore)
        // console.log('~~~~~~~~~~~~~~~~~~~~~~~this.props.messageStore',messageStore && messageStore.unread
        //     ? true : false)
        return (
            <View style={[estyle.fx1]}>
                {/* <Navigator
                 initialRoute={this.initialRoute}
                 navigationBar={<MainNavBar ref={(navBar) => {this.navBar = navBar;}}
                 changeTab={
                 (index, navigator) => {
                 console.log(111111111)
                 console.log(index);
                 navigator.jumpTo(tabs[index])
                 }
                 }
                 sign={this.props.messageStore.AllUnReadCount}
                 />}
                 initialRouteStack={tabs}
                 configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
                 onDidFocus={(router) => {
                 console.log(22222222222)
                 console.log(router.index);
                 this.setState({routeIndex : router.index});
                 this.navBar.changeTab(router.index, false);
                 this.setCurrentPage(router.index)
                 }}
                 renderScene={(route, navigator) => {
                 let Component = route.component;
                 return <Component
                 {...this.props}
                 navigator = {navigator}
                 />
                 }}
                 />*/}
                <View style={[estyle.fx1]}>
                    {this.currentRoute()}
                </View>
                <MainNavBar ref={(navBar) => {
                    this.navBar = navBar;
                }}
                            changeTab={
                                (index, navigator) => {
                                    //navigator.jumpTo(tabs[index])
                                    this.setState({routeIndex : index});
                                    this.setCurrentPage(index)
                                }
                            }
                            sign={this.props.messageStore.AllUnReadCount}
                />
            </View>

        );
    }
}
function select(stores) {
    return {messageStore: stores.messageStore}
}
export default connect(select)(HomeRouter);