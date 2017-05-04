/**
 * Created by ligj on 2016/9/29.
 */

import Server from '../service-config/ServerConfig';
import RequestService, {getToken}  from '../service-config/RequestService';
const serviceUrl = `${Server.SERVICE_STATION}servicestation/`;

const defaultPage = Server.defaultPage;

let _PROVINCE_=''; //缓存省份数据

function makeUrl(path) {
    return serviceUrl + path;
}


//类型下拉列表
export function typeCondition(page_number, page_size, page_total) {
    return RequestService.get(
        makeUrl('typeCondition'),
        {
            page_number: page_number || 1,
            page_size: page_size || 10
        }
    );
}

//服务站列表查询
export function queryStation(page_number = defaultPage.page_number, page_size = defaultPage.page_size, opts) {
    console.info(arguments)
    return RequestService.get(
        makeUrl('queryStation'),
        Object.assign({}, opts, {page_number: page_number, page_size: page_size})
    );
}

//服务站详情-服务站ID
export function stationDetail(stationId) {
    return RequestService.get(
        makeUrl('stationDetail'),
        {stationId: stationId}
    );
}

//服务预约
export function newWo(opts) {
    let user = getToken().userId;
    return RequestService.post(
        makeUrl('newWo'),
        Object.assign({}, {repairId: user}, opts)
    );
}

//预约列表查询
export function orderList() {
    return RequestService.get(
        makeUrl('wo/queryWo')
    );
}
//取消预约
export function orderCancel(woCode, reason) {
    return RequestService.get(
        makeUrl('wo/cancelWo'),
        {
            woCode: woCode,
            reason: reason
        }
    );
}
//确认服务完成
export function orderOver(woCode) {
    return RequestService.get(
        makeUrl('wo/confirmWo'),
        {
            woCode: woCode
        }
    );
}
//服务评价
export function orderConfir(woCode, score, content, stationId) {
    let user = getToken().userId;
    return RequestService.post(
        makeUrl('orderProcess/rateAdd'),
        {
            woCode: woCode,
            score: score,
            content: content,
            stationId: stationId,
            driverId: user
        }
    );
}

//预约详情-预约ID
export function orderDetail(orderId) {
    return RequestService.get(
        makeUrl('wo/getWo'),
        {woCode: orderId}
    );
}

//预约删除-预约ID
export function delOrder(orderId) {
    return RequestService.get(
        makeUrl('delOrder'),
        {orderId: orderId}
    );
}

//服务评价
export function serviceRated(opts) {
    return RequestService.post(
        makeUrl('serviceRated'),
        opts
    );
}

//评价查询
export function queryRated(page_number, page_size, stationId, flag, woCode) {
    let user = getToken().userId;
    return RequestService.get(
        makeUrl('queryRated'),
        {
            page_number: page_number || 1,
            page_size: page_size || 2,
            stationId: stationId,
            flag: flag,
            driverId: user,
            woCode: woCode
        }
    )
}


//服务预约
export function getPosition(woCode) {
    return RequestService.get(
        makeUrl('wo/getPostion'),
        {woCode: woCode}
    );
}

//催单接口
export function urgeWo(woCode) {
    return RequestService.get(
        makeUrl('wo/urgeWo'),
        {woCode: woCode}
    );
}
//删除评论
export function delRated(rateId) {
    return RequestService.get(
        makeUrl('delRated'),
        {rateId: rateId}
    );
}
/**
 * -----------------------优惠券相关接口-------------------------
 * */

//优惠券数量
export function couponNum() {
    //type  1 车主端 2 司机端
    return RequestService.get(
        makeUrl('couponNum'),
        {type: 2}
    );
}
//优惠券列表
export function couponList(page_number, page_size,status) {
    //type  1 车主端 2 司机端
    return RequestService.get(
        makeUrl('couponList'),
        {
            page_number: page_number,
            page_size: page_size,
            type: 2,
            status: status
        }
    );
}
//优惠券详情
export function couponDetail(couponId) {
    return RequestService.get(
        makeUrl('couponDetail'),
        {
            couponId: couponId
        }
    );
}
//消费记录列表
export function recordList(page_number, page_size, coupon, vin) {
    return RequestService.get(
        makeUrl('recordList'),
        {
            page_number: page_number,
            page_size: page_size,
            activityId: coupon,
            vin: vin
        }
    );
}
//消费结果
export function recordDetail(recordId) {
    return RequestService.get(
        makeUrl('recordDetail'),
        {
            recordId: recordId
        }
    );
}
//优惠券服务商列表
export function providerList(activityId, page_number, page_size, regionCode) {
    return RequestService.get(
        makeUrl('providerList'),
        {
            activityId: activityId,
            page_number: page_number,
            page_size: page_size,
            regionCode: regionCode
        }
    );
}
//推荐服务商
export function recommend(opts) {
    return RequestService.get(
        makeUrl('recommend'),
        opts
    );
}
//逆地理 根据经纬度查询城市与cityCode
export function inverse(lon,lat) {
    return RequestService.get(
        makeUrl('inverse'),
        {
            lon:lon,
            lat:lat
        }
    );
}
//获取服务商城市
export function providerCity(page_number,page_size,activityId,code) {
    return RequestService.get(
        makeUrl('providerCity'),
        {
            page_number:page_number || 1 ,
            page_size:page_size || 20,
            activityId: activityId,
            code:code
        }
    );
}
//省市列表查询
export function areaCondition(id){
    if(!id && _PROVINCE_) return Promise.resolve(_PROVINCE_);
    return RequestService.get(
        `${Server.QINGQI}tocapp/areaCondition`,
        {id:id || ''}
    ).then((data)=>{
        if(!id) {
            _PROVINCE_=data;
        }
        return data;
    });
}