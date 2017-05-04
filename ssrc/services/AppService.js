/**
 * Created by linyao on 2016/10/17.
 */

import Server from '../service-config/ServerConfig';
import RequestService,{ getToken } from '../service-config/RequestService';
const serviceUrl = `${Server.QINGQI}tocapp/`;
const upLoadServiceUrl=`${Server.UPLOAD_SERVICE}fsevice/uploadFile`;

let _PROVINCE_=''; //缓存省份数据
let _GOODS_PROVINCE_ = null; //货源信息中的省份缓存
let _PROAbbreviation_=null; //缓存省份的缩略字
let _CARTYPE_=null; //缓存车辆类型

const defaultPage = Server.defaultPage;
function makeUrl(path) {
    return serviceUrl + path;
}

export function choiceCustomer(){
    return RequestService.get(
        `${Server.QINGQI}crm/createDialog`
    ).then(rs => {
        return Object.assign({}, rs, {userId: getToken().userId});
    })
}

export function refreshToken(){
    return RequestService.get(
        `${Server.QINGQI}crm/refreshToken`,
        {
            type:1
        }
    );
}

export function choiceCustomerService(){
    return RequestService.get(
        `${Server.QINGQI}crm/choiceCustomerService`
    );
}

//当前车队信息查询接口
export function carTeamInfo(){
    return RequestService.get(
        makeUrl('carTeamInfo')
    );
}

//车辆详情查询接口
export function carInfo(carId){
    return RequestService.get(
        makeUrl('carInfo'),
        {
            carId: carId
        }
    );
}

//车辆详情参数查询接口
export function carParameter(carId){
    return RequestService.get(
        makeUrl('carParm'),
        {
            carId:carId
        }
    );
}

//车辆删除路线接口
export function delCarRoute(carId){
    return RequestService.get(
        makeUrl('delCarRoute'),
        {
            carId:carId
        }
    );
}

//路线车辆列表查询接口
export function routeCarList(page_number,page_size,routeId){
    return RequestService.get(
        makeUrl('routeCarList'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            routeId:routeId
        }
    );
}

//添加路线接口
export function addRoute(obj){
    return RequestService.post(
        makeUrl('addRoute'),
        obj
    );
}

//更新路线
export function modifyRoute(obj){
    return RequestService.post(
        makeUrl('modifyRoute'),
        obj
    );
}

//删除路线-路线唯一标识ID
export function deleteRoute(routeId){
    return RequestService.get(
        makeUrl('deleteRoute'),
        {
            routeId:routeId
        }
    );
}

//查询线路列表
export function queryRouteList(page_number, page_size){
    return RequestService.get(
        makeUrl('queryRouteList'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20
        }
    );
}

//车辆路线设置状态查询接口
export function queryRouteAddCarList(page_number, page_size, searchKey){
    return RequestService.get(
        makeUrl('queryRouteAddCarList'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            searchKey:searchKey
        }
    );
}

//路线详情接口-线路ID
export function routeInfo(routeId){
    return RequestService.get(
        makeUrl('routeInfo'),
        {
            routeId: routeId
        }
    );
}
//今日营运统计接口
export function queryOperateStatisToday(){
    return RequestService.get(
        makeUrl('queryOperateStatisToday')
    );
}

//区间油耗日统计接口
export function statisOilwearByDay(beginDate,endDate){
    return RequestService.get(
        makeUrl('statisOilwearByDay'),
        {
            beginDate:beginDate,
            endDate:endDate
        }
    );
}

//路线油耗详情统计接口
export function statisRouteOilwearByDay(statisDate){
    return RequestService.get(
        makeUrl('statisRouteOilwearByDay'),
        {
            statisDate:statisDate
        }
    );
}

//单线路车辆油耗列表统计接口01040603
export function statisOilwearForOneRoute(routeId,statisDate){
    return RequestService.get(
        makeUrl('statisOilwearForOneRoute'),
        {
            routeId:routeId,
            statisDate:statisDate
        }
    );
}

//行程路线标杆设置接口
export function standardMark(obj){
    return RequestService.post(
        makeUrl('standardMark'),
        obj
    );
}

//获取车辆信息（保养）接口
export function queryMaintainReminder(){
    return RequestService.get(
        makeUrl('queryMaintainReminder'),{
        }
    );
}

//更新车辆保养信息（点击已保养）
export function carMaintained(){
    return RequestService.get(
        makeUrl('carMaintained'),{
        }
    );
}

//体检故障解决措施接口
export function faultSolutionInfo(faultCode){
    return RequestService.get(
        makeUrl('faultSolutionInfo'),
        {
            faultCode:faultCode
        }
    );
}

//立即体检接口
export function phyExam(){
    return RequestService.get(
        makeUrl('phyExam')
    );
}

//获取上一次体检结果
export function queryLastPhyExamResult(){
    return RequestService.get(
        makeUrl('queryLastPhyExamResult')
    );
}

//删除标杆
export function deleteStandard(routeId){
    return RequestService.post(
        makeUrl('deleteStandard'),
        {
            routeId:routeId
        }
    );
}

//查看标杆
export function viewStandard(routeId){
    return RequestService.get(
        makeUrl('viewStandard'),
        {
            routeId: routeId
        }
    );
}

//路线-某天-车辆列表接口
export function routeDayCarList(routeId,day){
    return RequestService.get(
        makeUrl('routeDayCarList'),
        {
            routeId:routeId,
            day:day
        }
    );
}

//司机消息查询
export function queryDriverMess(page_number,page_size,id,type){
    return RequestService.get(
        makeUrl('queryDriverMess'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            id:id,
            type:type
        }
    );
}

//标记已读
export function markReadmessage(obj){
    return RequestService.post(
        makeUrl('markReadmessage'),
        obj
    );
}
//车主消息查询
export function queryCarOwnerMessage(page_number,page_size,userId){
    return RequestService.get(
        makeUrl('queryCarOwnerMessage'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            userId:userId
        }
    );
}


//里程按天统计接口
export function statisMileageByDay(page_number, page_size, page_total, statisDate){
    return RequestService.get(
        makeUrl('statisMileageByDay'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            statisDate:statisDate
        }
    );
}

//紧急电话配置-查询(按照Sort降序排列)【app用，查询carType】
export function queryUrgentCall(page_number=defaultPage.page_number, page_size=defaultPage.page_size, type ){
    return RequestService.get(
        `${Server.QINGQI}tocapp/queryUrgentCall`,
        {
            page_number:page_number,
            page_size:page_size,
            type:type
        }
    );
}
//司机端-我的车辆列表
export function driverCarList(page_number = defaultPage.page_number) {
    return RequestService.get(
        makeUrl('driverCarList'),
        {page_number: page_number}
    );
}
//司机端-我的车辆列表
export function setCurrentCar(carId) {
    return RequestService.get(
        makeUrl('setCurrentCar'),{
            carId: carId
        }
    );
}
//车辆查询（从TDS系统获取车辆数据）
export function getCarList(opts,page_number=defaultPage.page_number,page_size=defaultPage.page_size) {
    //todo 产品要求组织机构代码可以输入-_ 但是提交的时候去除掉- 比较奇葩。。。
    let carOpts = Object.assign({},opts,{page_number: page_number,page_size : page_size});
    if(carOpts.identityCard) carOpts.identityCard = carOpts.identityCard.replace(/[\-_]/g,'');
    return RequestService.get(
        `${Server.QINGQI}tocapp/getCarList`,
        carOpts
    );
}
//添加/编辑车辆-评价ID
export function addCar(opts){
    return RequestService.get(
        `${Server.QINGQI}tocapp/addCar`,
        Object.assign({}, opts)
    );
}
//司机端获取最新位置（服务站）
export function getPosition() {
    return RequestService.get(
        makeUrl('getPosition')
    );
}
//服务站列表查询（服务站）
export function queryStation( page_number, opts, page_size){
    return RequestService.get(
       makeUrl('queryStation'),
       Object.assign({},{page_number:page_number}, opts, {page_size: page_size || defaultPage.page_size})
    );
}
//省市列表查询（服务站）
export function areaCondition(id){
    if(!id && _PROVINCE_) return Promise.resolve(_PROVINCE_);
    return RequestService.get(
        makeUrl('areaCondition'),
        {id:id || ''}
    ).then((data)=>{
        if(!id) {
            data.unshift({id:'200',name:'附近'});
            _PROVINCE_=data;
        }
        return data;
    });
}
//服务站详情
export function stationDetail( stationId ){
    return RequestService.get(
        makeUrl('stationDetail'),
        {stationId:stationId}
    );
}
//查询全部预约项目
export function queryAllAppointmentItemList(){
    return RequestService.get(
        makeUrl('queryAllAppointmentItemList')
    );
}
//查询城市
export function queryCity(searchKey){
    return RequestService.get(
        makeUrl('queryCity'),
        {searchKey: searchKey}
    ).then(rs => {
        return {
            list : rs
        }
    });
}

//上传文件接口
export function fileUpLoad(file){
    let user=getToken().userId;
    return RequestService.post(
        upLoadServiceUrl,
        {file:file,account:user},
        null, true
    );
}
//获取用户认证审核状态
export function getUserInfoStatus() {
    return RequestService.get(
        makeUrl('getUserInfoStatus')
    )
}
//提交认证资料接口
export function validateUserInfo() {
    return RequestService.get(
        makeUrl('validateUserInfo')
    )
}
//保存用户信息接口
export function saveUserInfo(opt) {
    return RequestService.post(
        makeUrl('saveUserInfo'),
        opt
    )
}
//省份简称-数据字典
export function getProAbbreviation() {
    if(_PROAbbreviation_){ return Promise.resolve(_PROAbbreviation_) }
    return (
        RequestService.get(
            `${Server.QINGQI}operate/common/basedata`,
            {
                type:'A',
                code: 'A050'
            }
        )
            .then((data)=>{
                _PROAbbreviation_=data;
                return data
            })
    )
}
//车辆类型-数据字典
export function getCarType() {
    if(_CARTYPE_){ return Promise.resolve(_CARTYPE_) }
    return (
        RequestService.get(
            `${Server.QINGQI}operate/common/basedata`,
            {
                type:'A',
                code: 'A051'
            }
        )
            .then((data)=>{
                _CARTYPE_=data;
                return data
            })
    )
}

//货源信息始发地目的地选择列表
export function goodsAreaList(code, level){
    if(level === 1 && _GOODS_PROVINCE_) {
        return Promise.resolve(_GOODS_PROVINCE_)
    }
    return RequestService.get(
        makeUrl('goodsAreaList'),
        {code: code, level: level}
    ).then(data => {
        data.list.unshift({});
        if(level === 1) _GOODS_PROVINCE_ = data;
        return data;
    });
}

export function userAuth() {
    return RequestService.get(
        makeUrl('userAuth')
    );
}
//货源信息列表
export function goodsSourceList(page_number=defaultPage.page_number, page_size=defaultPage.page_size, opts){
    return RequestService.get(
        makeUrl('goodsSourceList'),
        Object.assign({},opts, {page_size: page_size,page_number:page_number})
    );
}