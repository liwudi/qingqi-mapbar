/**
 * Created by ligj on 2016/9/27.
 */
import { TYPES } from '../actions/index';

const STATE = {
	error:{},
	status: null
};

export function messageStore(state = STATE, action){
	switch (action.type){
		case TYPES.PUSH_MESSAGE_LIST:
			return Object.assign({}, state ,{ ...action, status: action.type});
			break;
		default:
			return state;
	}
}

export function activePageStore(state = STATE, action) {
    switch (action.type){
        case TYPES.PUSH_MESSAGE_ACTIVE_PAGE:
            return Object.assign({}, state , action );
            break;
        default:
            return state;
    }
}