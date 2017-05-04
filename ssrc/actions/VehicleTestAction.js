/**
 * Created by linyao on 2016/10/20.
 */
import * as AppService from '../services/AppService';
import * as TYPES from './types';
import Toast from '../components/Toast';


/**
 * 格式化时间
 * */
Date.prototype.format =function(format)
{
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4- RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
};


export function queryLastPhyExamResult(next) {
    return (dispatch) => {
        dispatch({'type': TYPES.TEST_DATA_DOING});
        AppService.queryLastPhyExamResult().then(
            (res) => {
                dispatch({'type': TYPES.TEST_DATA_SUCCESS, data: res});
                next && next(res);
            }
        ).catch(
            (e) => {
                Toast.show('获取数据失败，请检查网络', Toast.SHORT);
                dispatch({'type': TYPES.TEST_DATA_ERROR});
            }
        );
    }
}
export function phyExam(next) {
    return (dispatch) => {
        var phyExamTime=new Date();
        phyExamTime=phyExamTime.format('yyyy-MM-dd hh:mm:ss');
        dispatch({'type': TYPES.TEST_DATA_DOING});
        AppService.phyExam().then(
            (res) => {
                res.phyExamTime=phyExamTime;
                dispatch({'type': TYPES.TEST_DATA_SUCCESS, data: res});
                next && next(res);
            }
        ).catch(
            (e) => {
                Toast.show(e.message, Toast.SHORT);
                dispatch({'type': TYPES.TEST_DATA_ERROR});
            }
        );
    }
}