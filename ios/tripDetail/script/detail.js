/**
 * Created by linyao on 2016/10/26.
 */
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
}
var tripId=getQueryString('tripId'),
    userId=getQueryString('userId'),
	share=getQueryString('share')==='false'? false : true ,
    token=getQueryString('token');

function setViewHeight() {
    var _h_ = window.innerHeight || (window.screen.availHeight - 20);
    document.body.style.height = _h_ + 'px';
    $('#map-wrapper').css('height',_h_+'px');
}
function isnotUndefined(str) {
    return typeof str != 'undefined';
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var str = window.location.search || window.location.hash;
    var r = str.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}
var requestAnimFrame = (function(){
    return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
var setTime=function(time){
	var h= Math.floor(time/1000/3600),
		m= Math.floor(time/1000/60)-(h ? h*60 : 0) ;
		s= Math.floor(time/1000)-(h ? h*3600 : 0) -(m ? m*60 : 0 );
	var hh= h.toString().length == 1 ? '0'+ h : h ;
	var mm= m.toString().length == 1 ? '0'+ m : m ;
	var ss= s.toString().length == 1 ? '0'+ s : s ;
	return hh+':'+mm+':'+ss
}

function transData(data) {
    var d = {};
    if(isnotUndefined(data.driveSuggest)) d.driveSuggest = data.driveSuggest;
    if(isnotUndefined(data.speedingCount)) d.speedingCount = data.speedingCount;
    if(isnotUndefined(data.crookCount)) d.crookCount = data.crookCount;
    if(isnotUndefined(data.fastlowCount)) d.fastlowCount = data.fastlowCount;
    if(isnotUndefined(data.fastupCount)) d.fastupCount = data.fastupCount;
    if(isnotUndefined(data.overTime)) d.overTime = setTime(data.overTime);
    if(isnotUndefined(data.highTime)) d.highTime = setTime(data.highTime);
    if(isnotUndefined(data.midTime)) d.midTime = setTime(data.midTime);
    if(isnotUndefined(data.lowTime)) d.lowTime = setTime(data.lowTime);
    if(isnotUndefined(data.slowTime)) d.slowTime = setTime(data.slowTime);
    if(isnotUndefined(data.zeroUpTime)) d.zeroUpTime = setTime(data.zeroUpTime);
    if(isnotUndefined(data.driveLevel)) d.driveLevel = data.driveLevel;
    if(isnotUndefined(data.oilSuggest)) d.oilSuggest = data.oilSuggest;
    if(isnotUndefined(data.avgOilHistory)) d.avgOilHistory = data.avgOilHistory;
    if(isnotUndefined(data.avgOilCarModel)) d.avgOilCarModel = data.avgOilCarModel;
    if(isnotUndefined(data.oilLevel)) d.oilLevel = data.oilLevel;
    if(isnotUndefined(data.tripOil)) d.tripOil = data.tripOil;
    if(isnotUndefined(data.tripTime)) d.tripTime = Math.floor(data.tripTime/1000/60);
    if(isnotUndefined(data.avgSpeed)) d.avgSpeed = data.avgSpeed;
    if(isnotUndefined(data.avgOil)) d.avgOil = data.avgOil; d.avgOil2 = data.avgOil;
    if(isnotUndefined(data.tripLen)) d.tripLen = data.tripLen;
    if(isnotUndefined(data.tripScore)) d.tripScore = data.tripScore;
    if(isnotUndefined(data.endLocal)) d.endLocal = data.endLocal;
    if(isnotUndefined(data.endTime)) d.endTime = new Date(data.endTime).format('yyyy-MM-dd hh:mm');
    if(isnotUndefined(data.startLocal)) d.startLocal = data.startLocal;
    if(isnotUndefined(data.startTime)) d.startTime = new Date(data.startTime).format('yyyy-MM-dd hh:mm');
    d.length={
        meoil: data.avgOil,
        his: data.avgOilHistory,
        type: data.avgOilCarModel
    };
    d.speedPer={
        overPer:data.overPer,
        highPer:data.highPer,
        midPer:data.midPer,
        lowPer:data.lowPer,
        slowPer:data.slowPer,
        zeroUpPer:data.zeroUpPer
    };
    return d;
}
function drawCircle (per, elem, width, animate) {
    if(!per) return;
    animate = typeof animate == 'boolean' ? animate : true;
    var total = per * 360,
        diff = total / 15,
        deg = animate ? 0 : total;
    var cx = Math.floor(width / 2),
        cy = cx;
    function draw () {
        deg = deg >= total ? total : deg;
        var d = describeArc(cx, cy, cx-2 , 0, deg);
        elem.attr('d', d);
        if(deg <= total) {
            requestAnimFrame(draw);
        }
        deg += diff;
    }
    requestAnimFrame(draw);

}
function describeArc(x, y, radius, startAngle, endAngle){
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(" ");
    return d;
}
/*window.tripDetailData = {
    "driveSuggest": "平稳驾驶，减少急刹车次数",
    "speedingCount": 2,
    "crookCount": 3,
    "fastlowCount": 3,
    "fastupCount": 2,
    "overPer": 56.1,
    "overTime": 1475906822,
    "highPer": 10.8,
    "highTime": 1475906822,
    "midPer": 10.8,
    "midTime": 1475906822,
    "lowPer": 10.8,
    "lowTime": 1475906822,
    "slowPer": 10.8,
    "slowTime": 1475906822,
    "zeroUpPer": 10.8,
    "zeroUpTime": 1475906822,
    "driveLevel": 5,
    "oilSuggest": "减少长时间离合次数",
    "avgOilHistory": 58.8,
    "avgOilCarModel": 58.8,
    "oilLevel": 4,
    "tripOil": 58.8,
    "tripTime": 1475906822,
    "avgSpeed": 88.8,
    "avgOil": 8.8,
    "tripLen": 88.8,
    "tripScore": 88.8,
    "endLocal": "辽宁省沈阳市华航大厦",
    "endTime": 1475906822,
    "startLocal": "辽宁省沈阳市华航大厦",
    "startTime": 1475906822
}
share = false;*/
function showTitleBar() {
    document.querySelector('#tit-list').style.display = 'block';
}
function getTripFromId() {
    var tripDetailData = window.tripDetailData;
    if(tripDetailData){
        fill(transData(tripDetailData));
    }else {
        if(tripId && userId && token) {
            showTitleBar();
            $.ajax({
                type:"get",
                url:"http://jfx.mapbar.com/api/qingqi/tripAnalysis/queryTripInfo",
                data:{tripId: tripId, userId: userId , token: token},
                dataType: 'json',
                async:true,
                success: function(data){
                    if(data.resultCode == 200){
                        fill(transData(data.data));
                    }else {
                        alert(data.message);
                    }
                },
                error : function(e){
                    alert('数据获取失败');
                }
            });
        }
    }
}
function  fill(data) {
    var driverStar=[],oilStar=[];
    for(var k in data) {
        var q = $('.' + k).eq(0);
        if(q) q.html(data[k]);
    }
    var per=(+data.tripScore/100) ==1 ? 0.9999 : (+data.tripScore/100);
    drawCircle(per, $('#tripScore'), 120);
    for(var i in data.speedPer){
        $('.'+ i).eq(0).html(data.speedPer[i]);
        var elem= $('.'+ i).eq(1);
        var sPer=(+data.speedPer[i]/100) == 1 ? 0.9999 : (+data.speedPer[i]/100);
        drawCircle(sPer, elem, 80, false);
    }
    var hdata = +(data.length.his || 0),   //历史
    adata = +(data.length.meoil || 0),  //本车
    cdata = +(data.length.type || 0);    //同类型车
    var maxdata = Math.max(hdata, adata, cdata);
    if(adata) $('.car-bar').eq(0).css('width', parseInt(adata / maxdata * 100) + '%');
    if(cdata) $('.same-car-bar').eq(0).css('width', parseInt(cdata / maxdata * 100) + '%');
    $('.history-bar').eq(0).css('width', parseInt(hdata / maxdata * 100) + '%');

    if(data.driveLevel){
        for(var s=0 ; s<5 ; s++ ){
            if(s <= Math.floor(data.driveLevel)-1){
                driverStar[s]='<i class="iconfont star">&#xe620;</i>'
            }else {
                driverStar[s]='<i class="iconfont dark">&#xe620;</i>'
            }
        }
        $('.driveStar').eq(0).html(driverStar.join(''));
    }
    if(data.oilLevel){
        for(var s=0 ; s<5 ; s++ ){
            if(s <= Math.floor(data.oilLevel)-1){
                oilStar[s]='<i class="iconfont star">&#xe620;</i>'
            }else {
                oilStar[s]='<i class="iconfont dark">&#xe620;</i>'
            }
        }
        $('.oilStar').eq(0).html(oilStar.join(''));
    }

}

