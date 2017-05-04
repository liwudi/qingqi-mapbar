/**
 * Created by linyao on 2016/10/18.
 */

import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';
import Config from '../config';
const serviceUrl = `${Server.PUSH_SERVICE}`;

function makeUrl(path) {
    return serviceUrl + path;
}


/**
 * 注册设备
 * @param deviceId
 * @param deviceName
 * @param apiKey
 * @param versionCode
 * @returns {*}
 */
export function registerApp(deviceId){
    return RequestService.get(
        makeUrl('ios/registerDevice'),
        {
            deviceId,
            deviceName: Config.deviceName,
            apiKey: Config.pushKey,
            versionCode: Config.versionCode
        }
    );
}

export function setAppTag(name, apiKey){
    return RequestService.get(
        makeUrl('ios/setAppTag'),
        {
            deviceId: Server.DEVICE_ID, name, apiKey
        }
    );
}

export function listAppTags(apiKey){
    return RequestService.get(
        makeUrl('ios/listAppTags'),
        {
            deviceId: Server.DEVICE_ID, apiKey
        }
    );
}

export function deleteAppTag(name, apiKey){
    return RequestService.get(
        makeUrl('ios/deleteAppTag'),
        {
            deviceId: Server.DEVICE_ID, name, apiKey
        }
    );
}

export function setDeviceRegion(regionName){
    return RequestService.get(
        makeUrl('ios/setDeviceRegion'),
        {
            deviceId: Server.DEVICE_ID, regionName
        }
    );
}

/**
 * 消息打开回执
 * @param messageId
 * @param apiKey
 * @param deviceId
 * @param time ”yyyy-mm-dd hh:mm:ss”
 * @returns {*}
 */
export function messageOpenReceipt(messageId, apiKey, deviceId, time){
    return RequestService.get(
        makeUrl('ios/messageOpenReceipt'),
        {
            messageId, apiKey, deviceId, time
        }
    );
}


/**
 * 禁止推送
 * @param deviceId
 * @param permissionType  1：允许推送，2：禁止推送
 * @param apiKey
 * @returns {*}
 */
export function permission(deviceId, permissionType = 1, apiKey){
    return RequestService.get(
        makeUrl('ios/permission'),
        {
            deviceId, permissionType, apiKey
        }
    );
}