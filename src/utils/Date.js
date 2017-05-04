function getDate (date) {
    if (typeof date === 'string') {
        date = date.replace(/-/g,'/');

        if(/^(\d{4})\/(\d{2})\/(\d{2})$/.test(date))
        {
            date += ' 00:00:00';
        }
        else if(/^(\d{4})(\d{2})(\d{2})$/.test(date))
        {
            var _t = date.match(/^(\d{4})(\d{2})(\d{2})$/);
            _t.shift();
            date = _t.join('/') + ' 00:00:00';
        }
    }
    return new Date(date);
}
/**
 * 解析 -1d,-3w 时间
 * @param baseTime 基础时间
 * @param matchStr
 * @param format 格式化
 * @returns {*}
 */
function mactchStrToTime(baseTime, matchStr, format){
    var _r =  getDate(baseTime);
    if(matchStr != 0){
        var reg = new RegExp(/(-{0,1}\d+)([d|w|m]{1})/);
        var rs = matchStr.match(reg);
        if(rs && rs.length === 3){
            _r = cale(_r, rs[2], parseInt(rs[1]));
        }
    }
    return format(_r, format);
}
function format(date, fmt) {
    if(!date)return '';
    fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
    var _date = getDate(date);
    var o = {
        "M+": _date.getMonth() + 1, //月份
        "d+": _date.getDate(), //日
        "h+": _date.getHours(), //小时
        "m+": _date.getMinutes(), //分
        "s+": _date.getSeconds(), //秒
        "q+": Math.floor((_date.getMonth() + 3) / 3), //季度
        "S": _date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * 时间计算
 * @param date 基准时间
 * @param type 天or周or月（'d','w','m'）
 * @param num 数量 （ +2 or -4 ....）
 */
function cale(date, type, num) {
    //加一天：+1d；减一天： -1d；加一周： +1w；减一周： -1w；加一月： +1m；减一月： -1m
    function DayNumOfMonth(year,month)
    {
        return new Date(year, month, 0).getDate();
    }

    var _date = getDate(date);
    var _num = 0;

    switch (type){
        case 'd':
            _num = num * 24 * 60 * 60 * 1000;
            break;
        case 'w':
            _num = num * 7 * 24 * 60 * 60 * 1000;
            break;
        case 'm':
            _num = DayNumOfMonth(_date.getYear(), _date.getMonth()) * num * 24 * 60 * 60 * 1000;
            break;
    }
    return new Date(_date.getTime() + _num);

}

export { format, cale }