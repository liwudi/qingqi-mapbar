/**
 * Created by ligj on 2016/9/27.
 */
import { DO_LOGIN } from '../actions/UserActions';

export default function user(state = {isLogged:false,userInfo:{}}, action){
	switch (action.type){
		case DO_LOGIN:
			return {isLogged:false,userInfo:{}}
			break;
		default:
			return state;
	}
}