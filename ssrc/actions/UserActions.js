/**
 * Created by ligj on 2016/9/27.
 */

import * as TYPES from './types';
import * as UserService from '../services/UserService';
import { setToken } from '../service-config/RequestService';
import Toast from '../components/Toast';
import { couponNum } from '../services/ServiceStationService';

const defUserPic = require('../assets/images/driver.png');

function sendCodeDispatch(dispatch, sendFun, then = (rs, error)=>{}) {
	dispatch({'type': TYPES.SEND_CODE_ING});
/*	then({}, null);
	return;*/
	sendFun()
		.then((res)=>{
			console.info('sendCodeDispatch')
			console.info(res)
			Toast.show('验证码已发送', Toast.SHORT);
			let second = 60;
			let intval = setInterval(() => {

				if(second === 0){
					clearInterval(intval);
					dispatch({'type': TYPES.SEND_CODE_DONE});
					return;
				}
				dispatch({'type': TYPES.SEND_CODE_TIMEOUT, second});
				second--;
			},1000);
			console.info('sendCodeDispatch')
			console.info(res)
			then(res || {}, null);
		}).catch((e)=>{
			Toast.show(e.message, Toast.SHORT);
			dispatch({'type': TYPES.SEND_CODE_ERROR, error: e});
			then(null, e);
		});
}



/**
 * token验证
 * @param logged
 * @param noLogged
 * @returns {function(*)}
 */
export function checkToken(logged, noLogged) {
	return (dispatch) => {
		UserService.getUserInfo()
			.then(res => {
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				logged && logged(res);
			})
			.catch((e)=>{
				dispatch({'type': TYPES.LOGGED_NULL});
				noLogged && noLogged();
			})
	}
}

/**
 * 获取用户信息
 * @returns {function(*)}
 */
export function getUserDetail() {
	return (dispatch) => {
		UserService.getUserInfo()
			.then(res => {
				dispatch({'type': TYPES.LOGGED_IN, user: res});
			})
			.catch((e)=>{
				dispatch({'type': TYPES.LOGGED_NULL});
			});
	}
}

/**
 * 退出登陆
 * @param next
 * @returns {function(*)}
 */
export function logout(next) {
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		UserService.logout()
			.then(res => {
				Toast.show('退出成功', Toast.SHORT);
				dispatch({'type': TYPES.LOGGED_OUT});
			})
			.catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			}).finally(next);
	}
}

/**
 * 账号密码登录
 * @param UserParams
 * @param next
 * @returns {function(*)}
 */
export function doLogin(UserParams, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});

		UserService.login(UserParams.phone, UserParams.password, UserParams.captcha)
			.then((res)=>{
				let userToken = {token:res.token, userId: res.userId};
				setToken(userToken);
				global.storage.save({
					key: 'token',
					rawData: userToken,
					expires: null
				});
                global.storage.save({
                    key: 'preLoginUserName',
                    rawData: {
                    	name:UserParams.phone
					},
                    expires: null
                });
				return UserService.getUserInfo();
			})
			.then(res => {
				// Toast.show('登录成功', Toast.SHORT);
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				next(res);
			})
			.catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			});
	}
}

/**
 * 注册-验证图片验证码
 * @param phone
 * @param trueName
 * @param password
 * @param captcha
 * @param next
 * @returns {function(*)}
 */
export function doRegCheckCaptcha(phone, trueName, password, captcha, next, err) {
	return (dispatch) => {
		dispatch({'type': TYPES.REG_STEP1_DOING});
		UserService.checkCaptcha(phone, captcha)
			.then((rs)=>{
				dispatch({'type': TYPES.REG_STEP2_START, regInfo: {
					phone, trueName, password, captcha
				}});
				next && next({
                    phone, trueName, password, captcha
                });
			}).catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
				dispatch({'type': TYPES.REG_STEP1_ERROR, error: e});
				err && err();
			});
	}
}

/**
 * 找回密码-验证图片验证码，并发送短信
 * @param phone
 * @param captcha
 * @param next
 * @returns {function(*)}
 */
export function doFindPasswordCheckCaptcha(phone, captcha, next,err) {
	console.info(arguments)
	return (dispatch) => {
		dispatch({'type': TYPES.FINDPASS_STEP1_DOING});
		// sendCodeDispatch(
		// 	dispatch,
		// 	UserService.findPasswordSendCode.bind(this, phone, captcha),
		// 	(rs, error) => {
		// 	if(rs){
		// 		console.info('rs')
		// 		console.info(rs)
		// 		dispatch({'type': TYPES.FINDPASS_STEP2, phoneInfo:{phone, captcha}});
		// 		console.info('next')
		// 		console.info(next)
		// 		next && next();
		// 	}else if(error){
		// 		dispatch({'type': TYPES.FINDPASS_STEP1_ERROR, error});
		// 		err && err();
		// 	}
		// }
		// );
        UserService.findPasswordSendCode(phone, captcha)
            .then((rs)=>{
                dispatch({'type': TYPES.FINDPASS_STEP2, phoneInfo:{phone, captcha}});
                next && next();
            })
            .catch((error)=>{
                Toast.show(error.message, Toast.SHORT);
                dispatch({'type': TYPES.FINDPASS_STEP1_ERROR, error});
                err && err();
            })
	}
}

/**
 * 找回密码 重新发送短信验证码
 * @param phone
 * @returns {function(*=)}
 */
export function findPasswordReSendCode(phone, next) {
	console.info('findPasswordReSendCode');

	return (dispatch) => {
		sendCodeDispatch(
			dispatch,
			UserService.findPasswordReSendCode.bind(null, phone),
            next
		);
	}
}

/**
 * 找回密码 验证短信验证码
 * @param phone
 * @param smsCode
 * @param next
 * @returns {function(*)}
 */
export function findPasswordCheckSmsCode(phone, smsCode, next) {
	console.info('findPasswordCheckSmsCode')
	return (dispatch) => {
		dispatch({'type': TYPES.FINDPASS_STEP2_DOING});
		UserService.findPasswordCheckSmsCode(phone, smsCode)
			.then((rs)=>{
				dispatch({'type': TYPES.FINDPASS_STEP3, phoneInfo: {phone, smsCode}});
				next();
			}).catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
				dispatch({'type': TYPES.FINDPASS_STEP2_ERROR, error: e});
			});
	}
}

/**
 * 找回密码-重置密码
 * @param phone
 * @param newPassword
 * @param smsCode
 * @param next
 * @returns {function(*)}
 */
export function findPasswordNewPassword(phone, newPassword, smsCode, next) {
	console.info('findPasswordNewPassword');
	return (dispatch) => {
		dispatch({'type': TYPES.FINDPASS_STEP3_DOING});
		UserService.findPasswordResetPassword(phone, newPassword, smsCode)
			.then((rs)=>{
				dispatch({'type': TYPES.FINDPASS_STEP3_DONE, phoneInfo: {phone}});
				next();
			}).catch((e)=>{
			Toast.show(e.message, Toast.SHORT);
			dispatch({'type': TYPES.FINDPASS_STEP3_ERROR, error: e});
		});
	}
}

/**
 * 注册
 * @param phone
 * @param trueName
 * @param password
 * @param smsCode
 * @param next
 * @returns {function(*)}
 */
export function doReg(phone, trueName, password, smsCode, next) {
	console.info('doReg');

	return (dispatch) => {
		dispatch({'type': TYPES.REG_STEP1_DOING});
		UserService.reg(phone, trueName, password, smsCode)
            .then((res)=>{
                let userToken = {token:res.token, userId: res.userId};
                setToken(userToken);
                global.storage.save({
                    key: 'token',
                    rawData: userToken,
                    expires: null
                });
                global.storage.save({
                    key: 'preLoginUserName',
                    rawData: {
                        name: phone
                    },
                    expires: null
                });
                return UserService.getUserInfo();
            })
            .then(res => {
                Toast.show('恭喜您注册成功，快去完善资料吧！', Toast.SHORT);
                dispatch({'type':TYPES.REG_STEP1_SUCCESS});
                dispatch({'type': TYPES.LOGGED_IN, user: res});
                next({phone, password});
            })
			.catch((e)=>{
				console.info(e)
				Toast.show(e.message, Toast.SHORT);
				dispatch({'type': TYPES.REG_STEP1_ERROR, error: e});
			});
	}
}

/**
 * 快捷登陆
 * @param phone
 * @param code
 * @param next
 * @returns {function(*)}
 */
export function doQuickLogin(phone, code, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		UserService.fastLogin(phone, code)
			.then((res)=>{
				let userToken = {token:res.token, userId: res.userId};
				setToken(userToken);
				global.storage.save({
					key: 'token',
					rawData: userToken,
					expires: null
				});
                global.storage.save({
                    key: 'preLoginUserName',
                    rawData: {
                        name:phone
                    },
                    expires: null
                });
				Toast.show('登录成功', Toast.SHORT);
				UserService.getUserInfo().then(userInfo => {
					console.info(userInfo)
					dispatch({'type': TYPES.LOGGED_IN, user: userInfo});
					next(userInfo);
				});
				// dispatch({'type': TYPES.LOGGED_IN, user: res});
			})
			/*.then(res => {
				Toast.show('登录成功', Toast.SHORT);
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				next(res);
			})*/
			.catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			});
			/*.then((res)=>{
				console.info(res)
				Toast.show('登录成功', Toast.SHORT);
				setToken(res.token);
				UserService.userDetail().then(userInfo => {
					console.info(userInfo)
					dispatch({'type': TYPES.LOGGED_IN, user: userInfo});
					next(userInfo);
				});
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				//next();
			}).catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			});*/
	}
}

/**
 * 快捷登陆-发送验证码
 * @param phone
 * @returns {function(*=)}
 */
export function sendQuickLoginCode(phone, next) {
	console.info('sendQuickLoginCode');

	return (dispatch) => {
		sendCodeDispatch(dispatch, UserService.fastLoginSendCode.bind(null, phone), next);
	}
}

/**
 * 发送注册手机验证码
 * @param phone
 * @param captcha
 * @param isReSend
 * @returns {function(*=)}
 */
export function sendRegCode(phone, captcha, isReSend, next) {
	console.info('sendRegCode');

	return (dispatch) => {
		return sendCodeDispatch(dispatch, UserService.regSendCode.bind(null, phone, captcha, isReSend), next);
	}
}

/**
 *
 * @returns {function(*=)}
 */
export function sendModifyMobileCode() {
	return (dispatch) => {
		dispatch({'type': TYPES.SEND_CODE_ING});
		UserService.sendModifyMobileSendCode()
			.then((res)=>{
				console.info('sendModifyMobileCode')
				Toast.show('验证码已发送', Toast.SHORT);
				let second = 60;
				let intval = setInterval(() => {

					if(second === 0){
						clearInterval(intval);
						dispatch({'type': TYPES.SEND_CODE_DONE});
						return;
					}

					dispatch({'type': TYPES.SEND_CODE_TIMEOUT, second});
					second--;

				},1000);
			}).catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
				dispatch({'type': TYPES.SEND_CODE_ERROR, error: e});
			});
	}
}

// export function modifyPassword(oldPassword, newPassword, next) {
// 	return (dispatch) => {
// 		if(oldPassword == newPassword){
// 			Toast.show('新密码不能与原始密码相同', Toast.SHORT);
// 			return;
// 		}
// 		dispatch({'type': TYPES.MODIFY_PASSWORD_DOING});
// 		UserService.modifyPassword(oldPassword, newPassword)
// 			.then((res)=>{
// 				Toast.show('密码修改成功', Toast.SHORT);
// 				dispatch({'type': TYPES.MODIFY_PASSWORD_NULL, user: res});
// 				next();
// 			})
// 			.catch((e)=>{
// 				Toast.show(e.message, Toast.SHORT);
// 				dispatch({'type': TYPES.MODIFY_PASSWORD_DOING, error: e});
// 			});
// 	}
// }

/**
 * 获取用户头像
 * @returns {function(*)}
 */
export function getUserPic() {
    return (dispatch) => {
        UserService.queryPicById()
			.then(img => {
                dispatch({'type': TYPES.USER_PIC, img : {uri: img}});
			})
			.catch(e => {
                dispatch({'type': TYPES.USER_PIC, img: defUserPic});
			})
    }
}
/**
 * 获取用户当前车辆的优惠券数量
 * @returns {function(*)}
 */
export function getCouponNum() {
    return (dispatch) => {
        couponNum()
            .then(res => {
                dispatch({'type': TYPES.COUPON_IN, num: res.num});
            })
            .catch((e)=>{
            });
    }
}