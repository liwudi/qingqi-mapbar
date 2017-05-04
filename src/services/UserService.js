/**
 * Created by ligj on 2016/9/29.
 */


import {
    NativeModules
} from 'react-native';

import RNFetchBlob from 'react-native-fetch-blob';

import Server from '../service-config/ServerConfig';
import RequestService, {getToken} from '../service-config/RequestService';

import Env from '../utils/Env';

const loginUrl = `${Server.WD_SERVICE}user/login`;


export function sendModifyMobileSendCode() {
    return new Promise((resolve, reject) => {
        //模拟登录成功
        setTimeout(() => {
            resolve({username: 1111});
        }, 2000);
        //模拟登录失败
        // setTimeout(() => {
        // 	reject({message:'密码错误'});
        // },2000);
    });
}


//车主端司机查询接口
export function queryDriver(page_number, page_size, keyWord) {
    return new Promise((resolve, reject) => {
        let url = 'queryDriver';
    });
}

//车主端添加司机
export function addDriver(name, phone) {
    return new Promise((resolve, reject) => {
        let url = 'addDriver';
    });
}

//删除司机-司机ID
export function delDriver(driverId) {
    return new Promise((resolve, reject) => {
        let url = 'delDriver';
    });
}

/**
 * 登录
 * @param phone
 * @param password
 * @returns {*}
 */
/*export function login(phone, password, captcha = '') {
 return RequestService.post(loginUrl,{
 "loginName": phone,
 "autoLogin": '1',
 "captcha": captcha,
 "password": password,
 "product": Server.APP_PRODUCT
 });
 }*/

export function login(phone, password, captcha = '') {
    return RequestService.post(`${Server.QINGQI}tocapp/login`, {
        loginName: phone,
        autoLogin: '1',
        captcha: captcha,
        password: password,
        product: Server.APP_PRODUCT,
        deviceId: Env.isAndroid ? Server.DEVICE_ID : 'ios-device',//todo ios推送key
        deviceType: Server.DEVICE_TYPE,
        appType: Server.APP_TYPE,
        type: Server.TYPE
    });
}

export const SEND_SMS_TYPE_REG = 'register';
export const SEND_SMS_TYPE_REG_RESEND = 'resentRegister';
export const SEND_SMS_TYPE_QUICK_LOGIN = 'quickLogin';
export const SEND_SMS_TYPE_CHANGE_BIND = 'changeBind';
export const SEND_SMS_TYPE_BIND_NEW = 'bind';


/**
 * 快捷登录 发送验证码
 * @param phone
 * @returns {*}
 */
export function fastLoginSendCode(phone, next) {
    return RequestService.post(`${Server.WD_SERVICE}user/sendSms`, {
        mobile: phone,
        product: Server.APP_PRODUCT,
//		product : "webUser",
        type: SEND_SMS_TYPE_QUICK_LOGIN
    });
}

/**
 * 快捷登录
 * @param phone
 * @param smsCode
 * @returns {*}
 */
export function fastLogin(phone, smsCode) {
    return RequestService.post(`${Server.QINGQI}tocapp/quickLogin`, {
        mobile: phone,
        product: Server.APP_PRODUCT,
        autoLogin: '1',
        smsCode: smsCode,
        deviceType: Server.DEVICE_TYPE,
        deviceId: Env.isAndroid ? Server.DEVICE_ID : 'ios-device',//todo ios推送key
        appType: Server.APP_TYPE,
        type: Server.TYPE
    });
}


export const CAPTCHA_TYPE_REGISTER = 'register';
export const CAPTCHA_TYPE_FIND_PASSWORD = 'findPassword';
export const CAPTCHA_TYPE_LOGIN = 'login';

/**
 * 获取图形验证码
 * @param phone
 * @returns {string}
 */
export function getCaptcha(phone, type = CAPTCHA_TYPE_REGISTER) {
    console.info(`${Server.WD_SERVICE}user/getCaptcha?identifier=${phone}&type=${type}&product=${Server.APP_PRODUCT}&__rid=${Math.random()}`)
    return `${Server.WD_SERVICE}user/getCaptcha?identifier=${phone}&type=${type}&product=${Server.APP_PRODUCT}&__rid=${Math.random()}`;
}

/**
 * 验证图形验证码
 * @param phone
 * @returns {string}
 */
export function checkCaptcha(phone, verifyCode) {
    return RequestService.post(`${Server.WD_SERVICE}user/checkCaptcha`, {
        identifier: phone,
        //product: 'webUser',
        product: Server.APP_PRODUCT,
        type: "register",
        verifyCode: verifyCode
    });
}


/**
 * 注册 发送验证码
 * @param phone
 * @returns {*}
 */
export function regSendCode(phone, captcha, isRetry = false) {
    return RequestService.post(`${Server.WD_SERVICE}user/sendSms`, {
        captcha: isRetry ? '' : captcha,
        mobile: phone,
        product: Server.APP_PRODUCT,
        //	product : "webUser",
        type: isRetry ? SEND_SMS_TYPE_REG_RESEND : SEND_SMS_TYPE_REG
    });
}

/**
 * 注册
 * @param phone
 * @param trueName
 * @param password
 * @param smsCode
 * @returns {*}
 */
export function reg(phone, trueName, password, smsCode) {
    console.info(arguments)
    //return RequestService.post(`${Server.WD_SERVICE}user/mobileRegister`,{
    return RequestService.post(`${Server.QINGQI}tocapp/register`, {
        phone: phone,
        name: trueName,
        password: password,
        smsCode: smsCode,
        product: Server.APP_PRODUCT,
        type: Server.TYPE,
        appType: Server.APP_TYPE
    });
}

/**
 * 找回密码发送验证码
 * @param phone
 * @param captcha
 * @returns {*}
 */
export function findPasswordSendCode(phone, captcha) {
    return RequestService.post(`${Server.WD_SERVICE}user/findPasswordBySms`, {
        captcha: captcha,
        mobile: phone,
        //	product : "webUser",
        product: Server.APP_PRODUCT,
        type: Server.APP_TYPE
    });
}

/**
 * 找回密码 重新发送验证码
 * @param phone
 * @returns {*}
 */
export function findPasswordReSendCode(phone) {
    return RequestService.post(`${Server.WD_SERVICE}user/sendSms`, {
        mobile: phone,
        product: Server.APP_PRODUCT,
        type: 'findPassword'
    });
}

/**
 * 找回密码 验证短信验证码
 * @param phone
 * @param smsCode
 * @returns {*}
 */
export function findPasswordCheckSmsCode(phone, smsCode) {
    return RequestService.post(`${Server.WD_SERVICE}user/validateFindPasswordSms`, {
        mobile: phone,
        product: Server.APP_PRODUCT,
        //product : "webUser",
        smsCode: smsCode
    });
}

/**
 * 找回密码-重置密码
 * @param phone
 * @param newPassword
 * @param smsCode
 * @returns {*}
 */
export function findPasswordResetPassword(phone, newPassword, smsCode) {
    return RequestService.post(`${Server.WD_SERVICE}user/resetPassword`, {
        identifier: phone,
        verifyCode: smsCode,
        newPassword: newPassword,
        product: Server.APP_PRODUCT
//		product : "webUser"
    });
}


/**
 * 用户相信信息
 * @returns {*}
 */
//
// export function userDetail() {
//     return RequestService.post(`${Server.WD_SERVICE}user/userDetail`,
// 		{"product":Server.APP_PRODUCT}).then(getUserInfo);
//         /*{"product":Server.APP_PRODUCT}).then((userInfo) => {
//         	console.info(userInfo)
//         return getUserInfo().then((userData) => {
//         	return userData;
//             //return Object.assign(userInfo, userData);
//         });
//     });*/
// }
//用户信息查询
export function getUserInfo() {
    return RequestService.get(
        `${Server.QINGQI}tocapp/getUserInfo`, {
            product: Server.APP_PRODUCT
        }
    ).then(rs => {
        console.log(Object.assign({}, getToken(), rs))
        return Object.assign({}, getToken(), rs);
    });
}

/**
 * 用户头像
 * @returns {string}
 */
export function userPic() {
    return `${Server.WD_SERVICE}user/queryPic?token=${encodeURIComponent(getToken())}`;
}


/**
 * 上传头像
 * @param pic
 * @returns {*}
 */
export function uploadUserPic(pic) {
    return RequestService.post(`${Server.WD_SERVICE}user/uploadPic`, {
        file: pic,
    }, null, true);
}

/**
 * 修改绑定手机发送验证码
 * @param phone
 * @returns {*}
 */
export function changeBindSendCode(phone, type = SEND_SMS_TYPE_CHANGE_BIND) {
    return RequestService.post(`${Server.WD_SERVICE}user/applyBindMobile`, {
        mobile: phone,
        product: Server.APP_PRODUCT,
//		product : "webUser",
        type: type
    });
}

/**
 * 验证重新绑定手机短信验证码
 * @param phone
 * @param smsCode
 * @returns {*}
 */
export function checkChangeBindSmsCode(phone, smsCode) {
    return RequestService.post(`${Server.WD_SERVICE}user/checkChangeBindMobile`, {
        mobile: phone,
        product: Server.APP_PRODUCT,
//		product : "webUser",
        smsCode: smsCode
    });
}

/**
 * 绑定新手机
 * @param phone
 * @param smsCode
 * @param oldMobile
 * @param oldSmsCode
 * @returns {*}
 */
export function bindNewMobile(phone, smsCode, oldMobile, oldSmsCode) {
    return RequestService.post(`${Server.WD_SERVICE}user/bindMobile`, {
        "mobile": phone,
        "smsCode": smsCode,
        "type": "changeBind",
        "oldMobile": oldMobile,
        "oldSmsCode": oldSmsCode,
        product: Server.APP_PRODUCT
//		"product":"webUser"
    });
}

export function bindMobile(phone, smsCode, oldMobile, oldSmsCode) {
    return RequestService.post(`${Server.QINGQI}tocapp/bindMobile`, {
        "mobile": phone,
        "smsCode": smsCode,
        "type": "changeBind",
        "oldMobile": oldMobile,
        "oldSmsCode": oldSmsCode,
        product: Server.APP_PRODUCT
//		"product":"webUser"
    });
}

/**
 * 退出登陆
 * @returns {*}
 */
export function logout() {
    return RequestService.get(`${Server.QINGQI}tocapp/logout`, {
        product: Server.APP_PRODUCT,
        appType: Server.APP_TYPE,
        type: Server.TYPE
    });
    //return RequestService.post(`${Server.WD_SERVICE}user/logout`, {product: Server.APP_PRODUCT});
}

/**
 * 修改密码
 * @param oldPassword
 * @param newPassword
 * @returns {*}
 */
export function modifyPassword(oldPassword, newPassword) {
    return RequestService.post(
        `${Server.WD_SERVICE}user/updatePassword`,
        {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            //		product : "webUser",
            product: Server.APP_PRODUCT
        }
    );
}

export function queryPicById() {
    return RNFetchBlob.fetch(
        'GET',
        `${Server.WD_SERVICE}user/queryPicById?userId=${getToken().userId}&_=${Math.random()}`,
        {}
    )
        .then((res) => {
            let _b = res.base64();
            if(_b){
                return `data:image/jpg;base64,${res.base64()}`
            } else {
                return Promise.reject({
                    message:'',
                    code: 500
                })
            }

        })
        .catch((errorMessage, statusCode) => {
            return Promise.reject({
                message:'',
                code: 500
            })
        });
    // return `${Server.WD_SERVICE}user/queryPicById?userId=${getToken().userId}&_=${Math.random()}`;
}


//修改用户信息
export function modifyUserInfo(name, phone) {
    return RequestService.get(
        `${Server.QINGQI}tocapp/modifyUserInfo`,
        {
            product: Server.APP_PRODUCT,
            name: name,
            phone: phone
        }
    );
}

export function modifyDriverInfo(identityCard, drivingLicense) {
    return RequestService.get(
        `${Server.QINGQI}tocapp/modifyDriverInfo`,
        {
            product: Server.APP_PRODUCT,
            identityCard: identityCard,
            drivingLicense: drivingLicense
        }
    );
}

/**
 * 验证手机号是否被使用
 * @param mobile
 * @returns {*}
 */
export function checkMobile(mobile) {
    return RequestService.get(
        `${Server.WD_SERVICE}user/checkMobile`,
        {
            mobile
        },
        (rs) => {
            if(rs.code === 1007){
                return Promise.resolve({});
            }else{
                return Promise.reject(rs);
            }
        }
    );
}
