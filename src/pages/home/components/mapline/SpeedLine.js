const SPEED_1 = 'SPEED_1';
const SPEED_2 = 'SPEED_2';
const SPEED_3 = 'SPEED_3';
const SPEED_4 = 'SPEED_4';
const SPEED_5 = 'SPEED_5';
const SPEED_6 = 'SPEED_6';
let type = null;
let getSpeedType = (speed) => {
    if(type === 'oil') {
        if (0 <= speed && speed <= 10) {
            return SPEED_1;
        } else if (10 < speed && speed <= 20) {
            return SPEED_2;
        } else if (20 < speed && speed <= 30) {
            return SPEED_3;
        } else if (30 < speed && speed <= 40) {
            return SPEED_4;
        } else {
            return SPEED_5;
        }
    } else {
        if (0 <= speed && speed <= 30) {
            return SPEED_1;
        } else if (30 < speed && speed <= 60) {
            return SPEED_2;
        } else if (60 < speed && speed <= 80) {
            return SPEED_3;
        } else if (80 < speed && speed <= 100) {
            return SPEED_4;
        } else {
            return SPEED_5;
        }
    }

};

let getSpeedColor = (speedType) => {
    if(type === 'oil') {
        switch (speedType) {
            case SPEED_1:
                return '#99CC59';
            case SPEED_2:
                return '#3EB6AD';
            case SPEED_3:
                return '#02B9F2';
            case SPEED_4:
                return '#FF8400';
            case SPEED_5:
                return '#FF1E1E';
        }
    } else {
        switch (speedType) {
            case SPEED_1:
                return '#FFBA25';
            case SPEED_2:
                return '#3EB6AD';
            case SPEED_3:
                return '#02B9F2';
            case SPEED_4:
                return '#FF8400';
            case SPEED_5:
                return '#FF1E1E';
        }
    }

};
let maxLevel, minLevel;
let groupIdx;
let pointGroup = [];
const inLevelRange = function (pt, mapLevel) {
    if (mapLevel >= 0 && mapLevel <= 3 && pt.levelGroup == 3) {
        maxLevel = 3;
        minLevel = 0;
        groupIdx = 1;
        return true;
    } else if (mapLevel >= 4 && mapLevel <= 7 && pt.levelGroup >= 2) {
        maxLevel = 7;
        minLevel = 4;
        groupIdx = 2;
        return true;
    } else if (mapLevel >= 8 && mapLevel <= 11 && pt.levelGroup >= 1) {
        maxLevel = 11;
        minLevel = 8;
        groupIdx = 3;
        return true;
    } else if (mapLevel >= 12 && mapLevel <= 18 && pt.levelGroup >= 0) {
        maxLevel = 18;
        minLevel = 12;
        groupIdx = 4;
        return true;
    } else {
        return false;
    }
};
const clear = () => {
    pointGroup = [];
};
const get = (line, mapLevel, paint, typeIdx) => {
    let idx = 0;
    let lines = [], _tmp1 = null;
    type = typeIdx ? 'oil' : 'speed';
    //console.info(type, 'type')
    //console.info('map level', mapLevel);
    if(! (mapLevel >= minLevel && mapLevel <= maxLevel) || paint) {
        mapLevel = Math.floor(mapLevel);
        let baseType = 'SPEED_1',
            pts = [];
        let baseLine = {
            locations: [],
            speedType: baseType
        }
        lines.push(baseLine);
        addBaseLine = (_line) => {
            baseLine.locations.push({latitude: _line.latitude, longitude: _line.longitude, levelGroup: _line.levelGroup, id: idx ++});
        };
        if(!pointGroup[groupIdx]) {
            line.map((_line, index) => {
                if (!index || index === line.length - 1 || inLevelRange(_line, mapLevel)) {
                    addBaseLine(_line);
                    pts.push(Object.assign({}, _line));
                }
            });
            pointGroup[groupIdx] = {
                locations : baseLine.locations,
                pts : pts
            }
        } else {
            baseLine.locations = pointGroup[groupIdx].locations;
            pts = pointGroup[groupIdx].pts
        }
    //    pts = baseLine.locations;
        /*addBaseLine = (_line) => {
            baseLocations.push({latitude: _line.latitude, longitude: _line.longitude, levelGroup: _line.levelGroup});
        };
        console.info(line.length, 'line.length')
        line.map((_line, index) => {
            if (!index || index === line.length - 1 || inLevelRange(_line, mapLevel)) {
                addBaseLine(_line);
                pts.push(Object.assign({}, _line));
            }
        });*/
    //    console.info(pts.length, 'pts.length')
        pts.map((_line, index) => {
            _tmp1 = _tmp1 || {
                    locations: [],
                    speedType: getSpeedType(_line[type])
                };
            if (_tmp1.locations.length === 0 && index > 0) {
                _tmp1.locations.push({latitude: pts[index - 1].latitude, longitude: pts[index - 1].longitude, id: idx ++});
            }
            _tmp1.locations.push({latitude: _line.latitude, longitude: _line.longitude, id: idx ++});

            if (index === pts.length - 1 || getSpeedType(pts[index + 1][type]) !== _tmp1.speedType) {
                lines.push(Object.assign({}, _tmp1));
                _tmp1 = null;
            }
        });

//        console.info(lines.length)
  //      console.info('levelGroup')
        //    console.info('baseLocations', baseLocations.length)
    }




    //console.info('lines', lines.length)
   // console.info(pointGroup.length);
    return lines.map((line, index) => {
        line.isClose = false;
        line.lineId = index;
        line.strokeColor = getSpeedColor(line.speedType);
        line.width = index ? '8' : '12';
        line.outlineColor = index ? line.strokeColor : '#666666';
        return line;
    });
};
export default {
    get: get,
    clear: clear
}