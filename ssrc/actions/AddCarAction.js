/**
 * Created by ligj on 2016/9/27.
 */
import * as TYPES from './types';
import * as UserService from '../services/UserService';
import * as AppService from '../services/AppService';
import Toast from '../components/Toast';
export function doLogin(UserParams, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		UserService.login(UserParams.phone, UserParams.password)
			.then((res)=>{
				Toast.show('登录成功', Toast.SHORT);
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				next();
			}).catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			});
	}
}

export function doRegCheckCaptcha(phone, trueName, password, captcha, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.REG_STEP1_DOING});
		UserService.checkCaptcha(phone, captcha)
			.then(()=>{
				next({
					phone, trueName, password, captcha
				});
				dispatch({'type': TYPES.REG_STEP2_START, regInfo: {
					phone, trueName, password, captcha
				}});
			}).catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
				dispatch({'type': TYPES.REG_STEP1_ERROR, error: e});
			});
	}
}

export function doReg(phone, trueName, password, smsCode, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.REG_STEP1_DOING});
		UserService.reg(phone, trueName, password, smsCode)
			.then((rs)=>{
				next({phone, password});
			}).catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
				dispatch({'type': TYPES.REG_STEP1_ERROR, error: e});
			});
	}
}

export function doQuickLogin(phone, code, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		UserService.fastLogin(phone, code)
			.then((res)=>{
				Toast.show('登录成功', Toast.SHORT);
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				next();
			}).catch((e)=>{
			Toast.show(e.message, Toast.SHORT);
			dispatch({'type': TYPES.LOGGED_ERROR, error: e});
		});
	}
}

export function sendQuickLoginCode(phone) {
	return (dispatch) => {
		dispatch({'type': TYPES.SEND_CODE_ING});
		UserService.fastLoginSendCode(phone)
			.then((res)=>{
				Toast.show('验证码已发送', Toast.SHORT);
				let second = 10;
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

export function sendRegCode(phone, captcha, isReSend) {
	return (dispatch) => {
		dispatch({'type': TYPES.SEND_CODE_ING});
		UserService.regSendCode(phone, captcha, isReSend)
			.then((res)=>{
				Toast.show('验证码已发送', Toast.SHORT);
				let second = 10;
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


export function sendModifyMobileCode() {
	return (dispatch) => {
		dispatch({'type': TYPES.SEND_CODE_ING});
		UserService.sendModifyMobileSendCode()
			.then((res)=>{
				Toast.show('验证码已发送', Toast.SHORT);
				let second = 10;
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

export function getCarList(state,toList,toVin,errFun) {
	return (dispatch) => {
		dispatch({'type': TYPES.TDS_DATA_DOING});
		AppService.getCarList(state)
			.then((res)=>{
				dispatch({'type': TYPES.TDS_DATA_SUCCESS, data: res});
				if(typeof (res.list) != 'undefined' && res.list.length){
					toList && toList(state);
					// toVin && toVin(state);
				}else {
					toVin();
	/*				console.log(11111111)
					Toast.show('未查询到相关数据', Toast.SHORT);*/
				}
			})
			.catch((e)=>{
			Toast.show(e.message, Toast.SHORT);
			errFun();
			dispatch({'type': TYPES.TDS_DATA_ERROR, error: e});
		});
	}
}