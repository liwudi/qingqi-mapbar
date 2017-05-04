/**
 * Created by ligj on 2017/1/11.
 */

import {Platform, NativeModules} from 'react-native';

const commonModule = NativeModules.CommonModule;

const Config = {
    mainColor: '#169ada',  //司机端主色
    packageName: commonModule.APPLICATION_ID, //应用包名
    uploadCk: '52b376899aaf4714a4e40e902a1f5aa5', // 应用商店更新key
    APP_TYPE: 'qingqi_driver_mobile', //    qingqi_owner_mobile(青汽车主版本)  qingqi_driver_mobile（青汽司机版本）
    APP_PRODUCT: 'qingqi',
    DEVICE_TYPE: Platform.OS === 'android' ? '1' : '2',//1:android,  2:ios   /////qingqi_owner_mobile
    TYPE: '1', //0 车主端 1 司机端
    //server_type: Platform.OS === 'android' ? commonModule.server_type : 'release'
    server_type: commonModule.server_type,

    // pushKey: '93785c2c3dae47a4a5ecbb257450202f',
    pushKey: 'test-93785c2c3dae47a4a5ecbb257450202f',
    pushSecretKey: 'a9c1edef3ea94287aa0999262249e5ac',
    deviceName: commonModule.deviceName || '',
    versionCode: commonModule.VERSION_CODE,
    INVERSE_AK: '79bd7f3bd5d240e888b2c84b4c3bc617'
};

const UPDATE_SERVICE = `http://wdservice.mapbar.com/appstorewsapi/checkexistlist/21?package_name=${Config.packageName}&ck=${Config.uploadCk}`;


const ServerBase = {
    QINGQI: 'http://jfx.mapbar.com/api/qingqi/',
    WD_SERVICE: 'http://jfx.mapbar.com/usercenter/',
    SERVICE_STATION:'http://jfx.qdfaw.com:8081/api/qingqi/',
    BBS_PAGE: 'http://jfx.mapbar.com/forum/yqlt.php',
    GOODS_PAGE: 'https://www.lujing56.com/activities/gooddetail/index.html',
    //GOODS_PAGE: 'https://www.lujing56.com/activities/goodsource/view/find_goods.html',
    NEWS_SERVICE: 'http://219.146.249.190:10106/',
    IMG_SERVICE: 'http://jfx.mapbar.com/usercenter/user/queryPicById',//用于头像相关
    UPLOAD_SERVICE: 'http://jfx.mapbar.com/fsm/',
    UPDATE_SERVICE,
    PUSH_SERVICE: 'http://wdservice.mapbar.com/pushapi/',
    INVERSE_SERVICE: 'http://wedrive.mapbar.com/opentsp/gis/api/inverse'
};


const Servers = {
    debug151:{ //与线上同步内网环境
        ...ServerBase,
        QINGQI: 'http://10.30.50.151:8950/qingqi/',
        WD_SERVICE: 'http://119.255.37.167:8808/',
        BBS_PAGE: 'http://61.161.238.158:8071/mapbar/yqlt.php',
        GOODS_PAGE: 'https://statictest.tf56.com/lujing/activities/gooddetail/index.html',
        SERVICE_STATION: 'http://10.30.50.151:8950/qingqi/',
        IMG_SERVICE: 'http://119.255.37.167:8808/user/queryPicById',//用于头像相关
        INVERSE_SERVICE: 'http://geocode.mapbar.com/inverse/getInverseGeocoding.json'
    },
    debug152:{  //内网开发联调环境
        ...ServerBase,
        QINGQI: 'http://10.30.50.152:8950/qingqi/',
        WD_SERVICE: 'http://119.255.37.167:8808/',
        BBS_PAGE: 'http://61.161.238.158:8071/mapbar/yqlt.php',
        GOODS_PAGE: 'https://statictest.tf56.com/lujing/activities/gooddetail/index.html',
        SERVICE_STATION: 'http://10.30.50.152:8950/qingqi/',
        IMG_SERVICE: 'http://119.255.37.167:8808/user/queryPicById',//用于头像相关
        INVERSE_SERVICE: 'http://geocode.mapbar.com/inverse/getInverseGeocoding.json'
    },
    debug153:{  //内网qa测试环境
        ...ServerBase,
        QINGQI: 'http://10.30.50.153:8950/qingqi/',
        WD_SERVICE: 'http://119.255.37.167:8808/',
        BBS_PAGE: 'http://61.161.238.158:8071/mapbar/yqlt.php',
        GOODS_PAGE: 'https://statictest.tf56.com/lujing/activities/gooddetail/index.html',
        SERVICE_STATION: 'http://10.30.50.153:8950/qingqi/',
        IMG_SERVICE: 'http://119.255.37.167:8808/user/queryPicById',//用于头像相关
        INVERSE_SERVICE: 'http://geocode.mapbar.com/inverse/getInverseGeocoding.json'
    },
    debug8071:{  //预上线环境（ 什么鬼！）
        ...ServerBase,
        QINGQI: 'http://10.30.50.152:8071/apipre/qingqi/',
        WD_SERVICE: 'http://119.255.37.167:8808/',
        BBS_PAGE: 'http://61.161.238.158:8071/mapbar/yqlt.php',
        GOODS_PAGE: 'https://statictest.tf56.com/lujing/activities/gooddetail/index.html',
        SERVICE_STATION: 'http://10.30.50.152:8071/apipre/qingqi/',
        IMG_SERVICE: 'http://119.255.37.167:8808/user/queryPicById',//用于头像相关
        INVERSE_SERVICE: 'http://geocode.mapbar.com/inverse/getInverseGeocoding.json'
    },
    release:{  //线上环境
        ...ServerBase,
    }
}

export default {
    ...Config,
    //android端默认使用gradle配置，ios端默认release，注意开发时需要特殊修改的情况，请不要上传这段代码
    server: Servers[Config.server_type]
    //,server: Servers['debug153']
};