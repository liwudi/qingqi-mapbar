/**
 * Created by linyao on 2016/10/18.
 */
import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';
const serviceUrl = `${Server.QINGQI}realTimeMonitor/`;

function makeUrl(path) {
    return serviceUrl + path;
}

//车辆实时监控列表接口
export function queryRealTimeCarList(page_number,page_size,key){
    return RequestService.get(
        makeUrl('queryRealTimeCarList'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            key:key
        }
    );
}

//海量打点接口
export function queryCarPolymerize(item){
    return RequestService.get(
        makeUrl('queryCarPolymerize'),
        item
    );
}

//单车辆实时监控接口
export function queryRealTimeCar(item){
    return RequestService.get(
        makeUrl('queryRealTimeCar'),
        item
    );
}

//轨迹回放查询抽析
export function queryTrack(item){
    return RequestService.get(
        makeUrl('queryTrack'),
        item
    );
}
//获取统计数据
export function queryShareSummary(item){
    return RequestService.get(
        makeUrl('queryShareSummary'),
        item
    );
}
//查询车况列表接口
export function queryCarCondition(page_number, page_size, carId) {
    return RequestService.get(
        makeUrl('queryCarCondition'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            carId: carId
        }
    );
}

//消息推送，车况详情
export function queryCarConditionDetail(item) {
    return RequestService.get(
        makeUrl('queryCarConditionDetail'),
        item
    );
}

