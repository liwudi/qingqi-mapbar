/**
 * Created by cryst on 2016/9/29.
 */
import Server from '../service-config/ServerConfig';
import RequestService, { getToken } from '../service-config/RequestService';
const serviceUrl = `${Server.QINGQI}userManage/`;
/************************测试数据id**************************/
const userId = '1';
/************************************************************/
function makeUrl(path) {
	return serviceUrl + path;
}
//修改车辆信息
export function modifyCar(carId, carCode){
	return RequestService.get(
		makeUrl('modifyCar'),{
			carId: carId,
			carNo: carCode,
			userId: userId
		}
	);
}