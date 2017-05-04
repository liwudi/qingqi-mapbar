/**
 * Created by linyao on 2016/10/20.
 */
import { TYPES } from '../actions/index';

const MAINTAIN_STATE = {
    isRefreshing: false,
    data: null,
    error:{},
    type: null
};

export function VehicleStore(state = MAINTAIN_STATE, action){
    switch (action.type){
        case TYPES.TEST_DATA_DOING:
            return Object.assign({},MAINTAIN_STATE,{type:action.type, isRefreshing: true});
            break;
        case TYPES.TEST_DATA_SUCCESS:
            return Object.assign({},MAINTAIN_STATE,{type:action.type, isRefreshing: false, data: action.data});
            break;
        case TYPES.TEST_DATA_ERROR:
            return Object.assign({},MAINTAIN_STATE,{type:action.type, isRefreshing: false, error: action.error});
            break;
        default:
            return state;
    }
}