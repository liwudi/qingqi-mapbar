/**
 * Created by linyao on 2016/10/17.
 */

import { NetInfo, NativeModules, DeviceEventEmitter } from 'react-native';

import commonModule from './components/CommonModule';
import Toast from '../components/Toast';

import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';

/**
 * 检查更新
 * @returns {*}
 */
export function checkUpdate(){
    return RequestService.get(Server.UPDATE_SERVICE).then(rs => rs[0]);
}

/**
 * 获取应用当前版本信息
 * @returns {*}
 */
export function getAppVersion() {
    return commonModule.getVersionInfo();
}

let Alert = null;

let networkChange = (networkState) => {
    if(networkState != 'NONE' && networkState != 'WIFI'){
        NativeModules.UpdateModule.pauseTask();
        Alert(
            `应用更新`,
            `网络环境已变更为3G/4G，是否继续下载？`,
            [
                {text:'继续下载',onPress:() => {
                    NativeModules.UpdateModule.resumeTask();
                }},
                {text:'暂不下载',onPress:() => {
                    NativeModules.UpdateModule.cancelTask();
                    removeListener();
                }}
            ]
        )
    }
};

let updateStateChange = (e) => {
    console.log('app update',e);
    switch (e.STATE){
        case 1://开始下载
            Toast.show('应用在后台下载中', Toast.SHORT);
            break;
        case 2://取消下载
            break;
        case 3://下载成功
            removeListener();
            break;
        case 4://下载文件校验失败
            Alert(
                `应用更新`,
                `文件已损坏，请重新下载`,
                [
                    {text:'重新下载', onPress:() => {
                        NativeModules.UpdateModule.restartTask();
                    }},
                    {text:'取消', onPress:() => {
                        removeListener();
                    }}
                ]
            );
            break;
        case 5://下载失败
            Alert(
                `应用更新`,
                `服务器开小差了，无法下载新安装，您稍后再试吧！`,
                [
                    {text:'重新下载', onPress:() => {
                        NativeModules.UpdateModule.resumeTask();
                    }},
                    {text:'取消', onPress:() => {
                        removeListener();
                    }}
                ]
            );
            break;
        case 6://下载中
            break;
    }
}

function addListener() {
    removeListener();
    NetInfo.addEventListener('change', networkChange);
    DeviceEventEmitter.addListener('UPDATE_APP_STATE', updateStateChange);
}

function removeListener() {
    NetInfo.removeEventListener('change', networkChange);
    DeviceEventEmitter.removeListener('UPDATE_APP_STATE', updateStateChange);
}

export function updateApp(appInfo, alert,isManual) {
    Alert = alert;
    console.log('本地版本号',NativeModules.CommonModule.VERSION_CODE);
    console.log('线上版本号',appInfo['version_no']);
    if(appInfo['version_no'] <= NativeModules.CommonModule.VERSION_CODE)return;
    if(isManual){
        updateAppAlert(appInfo);
    }else {
        global.storage.load({
            key:'laterUpdateTime',
            autoSync: true
        }).then((rs)=>{
            console.log(rs);
        }).catch(()=>{
            updateAppAlert(appInfo);
        })
    }
}

function updateAppAlert(appInfo) {
    let updateMsg = '应用有新版本了，是否更新？';
    let preNetworkState = '';
    NetInfo.fetch().done(networkState => {
        preNetworkState = networkState;
        if(networkState != 'WIFI'){
            updateMsg = '应用有新版本了，现在是4G/3G网络，需要马上为您升级吗？';
        }
        Alert(
            `应用更新`,
            updateMsg,
            [
                {text:'立即升级', onPress:() => {
                    NativeModules.UpdateModule.update(appInfo.apk_path, appInfo.md5);
                    addListener();
                }},
                {text:'稍后再说',onPress:()=>{
                    global.storage.save({
                        key:'laterUpdateTime',
                        rawData: new Date().getTime(),
                        expires: 1000 * 3600 * 12
                    })
                }}
            ]
        )
    });
}