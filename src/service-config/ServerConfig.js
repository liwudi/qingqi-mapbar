/**
 * Created by cryst on 2016/10/16.
 */

import Config from '../config';

const DEBUG = true;
if(!DEBUG) {
    console.info = console.log = () => {}
}

let ServerConfig = {
    ...Config.server,
    defaultPage : {
        page_number: 1,
        page_size: 20,
        page_total: 200
    },
    APP_TYPE: Config.APP_TYPE,
    APP_PRODUCT: Config.APP_PRODUCT,
    DEVICE_ID: '',
    DEVICE_TYPE: Config.DEVICE_TYPE,
    TYPE: Config.TYPE,
    INVERSE_AK: Config.INVERSE_AK
};


export default ServerConfig;