/**
 * Created by linyao on 2016/10/21.
 */
import { TYPES } from '../actions/index';

const TDS_STATE = {
    isRefreshing: false,
    data: null,
    error:{},
    type: null
};

export function TDSStore(state = TDS_STATE, action){
    switch (action.type){
        case TYPES.TDS_DATA_DOING:
            return Object.assign({},TDS_STATE,{type:action.type, isRefreshing: true});
            break;
        case TYPES.TDS_DATA_SUCCESS:
            return Object.assign({},TDS_STATE,{type:action.type, isRefreshing: false, data: action.data});
            break;
        case TYPES.TDS_DATA_ERROR:
            return Object.assign({},TDS_STATE,{type:action.type, isRefreshing: false, error: action.error});
            break;
        default:
            return state;
    }
}