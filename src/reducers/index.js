/**
 * Created by ligj on 2016/9/27.
 */
import {combineReducers} from 'redux';

import * as userReducers from './UserReducers';
import * as vehicleReduers from './VehicleReduers';
import * as messageReduers from './MessageReducers';

const rootReducer = combineReducers({
	...userReducers,
	...vehicleReduers,
	...messageReduers
});

export default rootReducer;