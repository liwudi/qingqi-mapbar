/**
 * Created by linyao on 2016/10/18.
 */

const userId = '1';
import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';
const serviceUrl = `${Server.QINGQI}tripAnalysis/`;

function makeUrl(path) {
    return serviceUrl + path;
}


/**
 * 读取消息详情
 * @param type
 * @param stype
 * @param msgId
 * @returns {*}
 */
export function queryMessageInfo(type, stype, msgId){
    return Promise.resolve({
        "carId":'12321321322',
        "carNumber": "闽Z23456",
        "mainDriverName": "李冠军",
        "subDriverName": null,
        "position": "河源市东源县顺天镇象咀",
        "carStatus": "油量液位",
        "happenTime": "2017-01-07 08:14:40",
        "todayMileage": 1.67,
        "instantOil": 0,
        "instantSpeed": 30,
        "direction": 11
    });
    return RequestService.get(
        makeUrl('queryMessageInfo'),
        {
            // type, stype, msgId
            type:6,stype:1,msgId:44,userId:20
        }
    );
}

//月行程数据查询接口
export function queryTripByMonth(month){
    return RequestService.get(
        makeUrl('queryTripByMonth'),
        {
            month: month
        }
    );
}
//查询指定日期的行程列表接口
export function queryTripByDay(page_number,page_size,day){
    console.info(arguments)
    return RequestService.get(
        makeUrl('queryTripByDay'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            day:day,
            userId: '20'
        }
    );
}
//查询行程详细信息接口
export function queryTripInfo(tripId,tripDate){
    return RequestService.get(
        makeUrl('queryTripInfo'),
        {
            tripId: tripId,
            tripDate:tripDate
        }
    );
}

//查询昨日平均油耗信息接口
export function queryYesterdayAvgOilWear(){
    return RequestService.get(
        makeUrl('queryYesterdayAvgOilWear'),
        {
            userId: '20'
        }
    );
}

//查询昨日平均油耗排行榜信息接口
export function queryYesterdayAvgOilWearRanking() {
    return RequestService.get(
        makeUrl('queryYesterdayAvgOilWearRanking'),
        {
            userId: '20'
        }
    )
}

//查询当月平均油耗信息接口
export function queryMonthAvgOilWear(){
    return RequestService.get(
        makeUrl('queryMonthAvgOilWear'),
        {
            userId: '20'
        }
    );
}

//查询当月平均油耗排行榜信息接口
export function queryMonthAvgOilWearRanking() {
    return RequestService.get(
        makeUrl('queryMonthAvgOilWearRanking'),
        {
            userId: '20'
        }
    )
}