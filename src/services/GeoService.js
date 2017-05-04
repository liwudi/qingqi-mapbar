/**
 * Created by linyao on 2016/10/18.
 */

import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';


//月行程数据查询接口
export function getInverseGeocoding(lon,lat){
    return RequestService.get(
        `${Server.INVERSE_SERVICE}`,
        {
            lat:lat,
            lon: lon,
            ak: Server.INVERSE_AK,
            inGb: '02',
            outGb: '02',
            zoom: 11,
            resType: 'json'
        },
        (data) => {
            return data;
        }
    );
}