/**
 * Created by ligj on 2016/9/27.
 */
import { TYPES } from '../actions/index';

const LOGIN_STATE = {
	isLogged: false,
	userInfo: {},
	error:{},
	status: TYPES.LOGGED_NULL
};

export function userStore(state = LOGIN_STATE, action){
	switch (action.type){
		case TYPES.LOGGED_DOING:
			return Object.assign({},LOGIN_STATE,{status:action.type});
			break;
		case TYPES.LOGGED_IN:
			return Object.assign({},LOGIN_STATE,{status:action.type, isLogged: true, userInfo: action.user});
			break;
		case TYPES.LOGGED_ERROR:
			return Object.assign({},LOGIN_STATE,{status:action.type, error: action.error});
			break;
		case TYPES.LOGGED_OUT:
			return Object.assign({},LOGIN_STATE,{status:action.type,  isLogged: false, userInfo: {}});
			break;
		default:
			return state;
	}
}
const SEND_CODE_STATE = {
	second: null,
	error:{},
	status: TYPES.SEND_CODE_DONE
};
export function sendCodeStore(state = SEND_CODE_STATE, action) {
	switch (action.type){
		case TYPES.SEND_CODE_ING:
			return Object.assign({},LOGIN_STATE,{status:action.type});
			break;
		case TYPES.SEND_CODE_TIMEOUT:
			return Object.assign({},LOGIN_STATE,{status:action.type, second:action.second});
			break;
		case TYPES.SEND_CODE_ERROR:
			return Object.assign({},LOGIN_STATE,{status:action.type, error: action.error});
			break;
		case TYPES.SEND_CODE_DONE:
			return Object.assign({},LOGIN_STATE,{status:action.type});
			break;
		default:
			return state;
	}
}

const STATE = {
	error:{},
	status: null
};

export function regStore(state = STATE, action) {
	switch (action.type){
		case TYPES.REG_STEP1_DOING:
			return Object.assign({},STATE,{status:action.type});
			break;
        case TYPES.REG_STEP1_SUCCESS:
            return Object.assign({},STATE,{status:action.type});
            break;
		case TYPES.REG_STEP1_ERROR:
			return Object.assign({},STATE,{status:action.type});
			break;
		case TYPES.REG_STEP2_START:
			return Object.assign({},STATE,{status:action.type, regInfo: action.regInfo});
			break;
		default:
			return state;
	}
}

export function findPasswordStore(state = STATE, action) {
	switch (action.type){
		case TYPES.FINDPASS_STEP1_DOING:
			return Object.assign({},STATE,action);
			break;
		case TYPES.FINDPASS_STEP1_ERROR:
			return Object.assign({},STATE,action);
			break;
		case TYPES.FINDPASS_STEP2:
			return Object.assign({},STATE,action);
			break;
		case TYPES.FINDPASS_STEP2_DOING:
			return Object.assign({},STATE,action);
			break;
		case TYPES.FINDPASS_STEP2_ERROR:
			return Object.assign({},STATE,action);
			break;
		case TYPES.FINDPASS_STEP3:
			return Object.assign({},STATE,action);
			break;
		case TYPES.FINDPASS_STEP3_DOING:
			return Object.assign({},STATE,action);
			break;
		case TYPES.FINDPASS_STEP3_ERROR:
			return Object.assign({},STATE,action);
			break;
		case TYPES.FINDPASS_STEP3_DONE:
			return Object.assign({},STATE,action);
			break;
		default:
			return state;
	}
}

const USER_PIC_STATE = {
    isLogged: false,
    userPic: {},
    error:{},
    status: null
};

export function userPicStore(state = USER_PIC_STATE, action){
    switch (action.type){
        case TYPES.USER_PIC:
            return Object.assign({}, USER_PIC_STATE, { userPic: action.img });
            break;
        default:
            return state;
    }
}

const COUPON_STATE = {
    error:{},
    status: null,
    couponNum:null
};
export function couponStore(state = COUPON_STATE, action){
    switch (action.type){
        case TYPES.COUPON_IN:
            return Object.assign({}, COUPON_STATE, { couponNum: action.num });
            break;
        default:
            return state;
    }
}