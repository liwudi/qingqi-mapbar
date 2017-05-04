/**
 * Created by linyao on 2016/11/1.
 */
(function () {
    var map, speedPanel;
    var speedAndColor = [{
        key: 20,
        color: '#ff0000'
    }, {
        key: 35,
        color: '#00ff00'
    }, {
        key: 50,
        color: '#0000ff'
    }, {
        key: 'over',
        color: '#000000'
    }];

    function _decodeNumberEx(line) {
        var _EP_KEY = 6;
        var i = 0;
        var rets = [];
        var strLen = line.length;
        if (strLen <= 0) return rets;
        while (i < strLen) {
            var b = 0;
            var shift = 0;
            var result = 0;
            var currkey = _EP_KEY;
            do {
                b = (line.charCodeAt(i++)) - 63;
                var currValue = (((b >> 1) ^ (currkey++)) & 0x1f);
                result |= currValue << shift;
                shift += 5;
            } while ((b & 0x1) == 0);
            result = ((result & 0x01) == 0x01) ? ~(result >> 1) : (result >> 1);
            rets.push(result);
        }
        return rets;
    }

    function decodeSpt(encode, first) {
        var times = [],
            speeds = [];
        var items = _decodeNumberEx(encode);
        first = first.split(',');
        var speed = +first[0];
        var time = +first[1];
        speeds.push(speed);
        times.push(time);
        for (var i = 0; i < items.length; i += 2) {
            speed += +items[i];
            time += +items[i + 1];
            speeds.push(speed);
            times.push(time);
        }
        return {
            times: times,
            speeds: speeds
        };
    }

    function getBrush(color) {
        var brush = {};
        brush.color = color;
        return brush;
    }

    function getColor(speed) {
        var color = null;
        speedAndColor.some(function (v) {
            if (speed <= v.key) {
                color = v.color;
                return true;
            }
        });
        if (!color) color = speedAndColor[speedAndColor.length - 1].color;
        return color;
    }

    var speeds = [],
        times = [];
    window.mpts = [];

    function detailShow(item) {
        var infos = decodeSpt(item.spt, item.firstSpt);
        mpts = MMap.decodeLine(item.points, item.levels);
        speeds = infos.speeds;
        times = infos.times;

        var line = new MPolyline(mpts, getBrush(speedAndColor[0].color));
        var bounds = map.overlaysBounds([line]);
        map.setViewport(bounds);
        //map.addOverlay(line);
        addPartLine();
    }

    function addPartLine() {
        var subpts=[];
        var lowSpeed = speedAndColor[0].key;
        var lines = [];
        var npt;
        mpts.forEach(function (pt, index) {
            var speed = speeds[index];
            //pt = new MPoint(pt.lng, pt.lat)
            npt = mpts[index + 1];
            npt = npt && new MPoint(npt.lng, npt.lat)
            var ccolor = getColor(speed);
            var ncolor = getColor(speeds[index+1]);
            subpts.push(pt);
            subpts.color = ccolor;
            if(npt) {
                if(ncolor != ccolor) {
                    subpts.push(npt);
                    lines.push(new MPolyline(subpts, getBrush(subpts.color)));
                    subpts = [npt];
                }
            } else {
                lines.push(new MPolyline(subpts, getBrush(subpts.color)));
            }
        })
        lines.forEach(function (line) {
            map.addOverlay(line);
        })

    }

    function initMap() {
        MEvent.ready(function() {
            map = new MMap('mapDiv', {
                center: new MPoint(116.3997, 39.9158),
                standardControl: false,
                //enabledHighResolution: true,
                zoom: 10
            });
            console.log(map);
            // $.ajax({
            //     type:"get",
            //     url:"data.json",
            //     async:true,
            //     success: function(data){
            //         ColorLine.detailShow(data.data);
            //     },
            //     error : function(){
            //         alert('获取数据失败')
            //     }
            // });
        })
    }

    ColorLine = {
        detailShow: detailShow,
        initMap: initMap
    }

    return ColorLine;
})()