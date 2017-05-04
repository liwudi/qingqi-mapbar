/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NativeModules,
    DeviceEventEmitter,
    findNodeHandle,
    TouchableHighlight,
    Image,
} from "react-native";

import Toast from './Toast';
import Slider from 'react-native-slider';

var MapView = require('../mapbarmap/MapView');
var module = NativeModules.MapbarMapModule;

import * as Icons from './Icons';
import * as DateUtil from '../utils/Date';

import Env from '../utils/Env';
const eStyles = Env.style;

let line = [{"lat":2868291,"lon":11595380,"s":0,"time":1478066251235},{"lat":2868287,"lon":11595385,"s":1,"time":1478066281235},{"lat":2868273,"lon":11595385,"s":2,"time":1478066311235},{"lat":2868273,"lon":11595412,"s":3,"time":1478066341235},{"lat":2868268,"lon":11595416,"s":4,"time":1478066371235},{"lat":2868259,"lon":11595414,"s":5,"time":1478066401235},{"lat":2868247,"lon":11595404,"s":6,"time":1478066431235},{"lat":2868239,"lon":11595384,"s":7,"time":1478066461235},{"lat":2868248,"lon":11595343,"s":8,"time":1478066491235},{"lat":2868228,"lon":11595340,"s":9,"time":1478066521236},{"lat":2868221,"lon":11595400,"s":10,"time":1478066551236},{"lat":2868201,"lon":11595404,"s":11,"time":1478066581236},{"lat":2868181,"lon":11595417,"s":12,"time":1478066611236},{"lat":2868174,"lon":11595405,"s":13,"time":1478066641236},{"lat":2868169,"lon":11595329,"s":14,"time":1478066671236},{"lat":2868157,"lon":11595274,"s":15,"time":1478066701236},{"lat":2868153,"lon":11595203,"s":16,"time":1478066731236},{"lat":2868171,"lon":11595181,"s":17,"time":1478066761236},{"lat":2868173,"lon":11594975,"s":18,"time":1478066791236},{"lat":2868182,"lon":11594941,"s":19,"time":1478066821236},{"lat":2868197,"lon":11594921,"s":20,"time":1478066851236},{"lat":2868218,"lon":11594908,"s":21,"time":1478066881236},{"lat":2868234,"lon":11594904,"s":22,"time":1478066911236},{"lat":2868476,"lon":11594881,"s":23,"time":1478066941236},{"lat":2868772,"lon":11594819,"s":24,"time":1478066971236},{"lat":2868784,"lon":11594814,"s":25,"time":1478067001236},{"lat":2868793,"lon":11594799,"s":26,"time":1478067031236},{"lat":2868792,"lon":11594775,"s":27,"time":1478067061236},{"lat":2868726,"lon":11594427,"s":28,"time":1478067091236},{"lat":2868712,"lon":11594315,"s":29,"time":1478067121236},{"lat":2868715,"lon":11593999,"s":30,"time":1478067151236},{"lat":2868724,"lon":11593811,"s":31,"time":1478067181236},{"lat":2868718,"lon":11593643,"s":32,"time":1478067211236},{"lat":2868726,"lon":11593537,"s":33,"time":1478067241236},{"lat":2868735,"lon":11593515,"s":34,"time":1478067271236},{"lat":2868741,"lon":11593480,"s":35,"time":1478067301236},{"lat":2868805,"lon":11592735,"s":36,"time":1478067331236},{"lat":2868807,"lon":11592669,"s":37,"time":1478067361236},{"lat":2868815,"lon":11592623,"s":38,"time":1478067391236},{"lat":2868823,"lon":11592613,"s":39,"time":1478067421236},{"lat":2868841,"lon":11592607,"s":40,"time":1478067451236},{"lat":2868951,"lon":11592593,"s":41,"time":1478067481236},{"lat":2869015,"lon":11592566,"s":42,"time":1478067511236},{"lat":2869281,"lon":11592374,"s":43,"time":1478067541236},{"lat":2869353,"lon":11592326,"s":44,"time":1478067571236},{"lat":2869365,"lon":11592326,"s":45,"time":1478067601236},{"lat":2869386,"lon":11592346,"s":46,"time":1478067631236},{"lat":2869524,"lon":11592518,"s":47,"time":1478067661236},{"lat":2869571,"lon":11592538,"s":48,"time":1478067691236},{"lat":2869644,"lon":11592605,"s":49,"time":1478067721236},{"lat":2869747,"lon":11592673,"s":50,"time":1478067751236},{"lat":2869910,"lon":11592748,"s":51,"time":1478067781236},{"lat":2869934,"lon":11592764,"s":52,"time":1478067811236},{"lat":2869965,"lon":11592810,"s":53,"time":1478067841236},{"lat":2869997,"lon":11592939,"s":54,"time":1478067871236},{"lat":2870011,"lon":11592963,"s":55,"time":1478067901236},{"lat":2870238,"lon":11593103,"s":56,"time":1478067931236},{"lat":2870311,"lon":11593140,"s":57,"time":1478067961236},{"lat":2870396,"lon":11593197,"s":58,"time":1478067991236},{"lat":2870421,"lon":11593209,"s":59,"time":1478068021236},{"lat":2870447,"lon":11593216,"s":60,"time":1478068051236},{"lat":2870541,"lon":11593227,"s":61,"time":1478068081236},{"lat":2870563,"lon":11593222,"s":62,"time":1478068111236},{"lat":2870557,"lon":11593098,"s":63,"time":1478068141236},{"lat":2870556,"lon":11592855,"s":64,"time":1478068171236},{"lat":2870550,"lon":11592789,"s":65,"time":1478068201236},{"lat":2870543,"lon":11592781,"s":66,"time":1478068231236},{"lat":2870531,"lon":11592778,"s":67,"time":1478068261236},{"lat":2870488,"lon":11592781,"s":68,"time":1478068291236},{"lat":2870416,"lon":11592777,"s":69,"time":1478068321236},{"lat":2870325,"lon":11592786,"s":70,"time":1478068351236},{"lat":2870191,"lon":11592787,"s":71,"time":1478068381236},{"lat":2870177,"lon":11592800,"s":72,"time":1478068411236},{"lat":2870174,"lon":11592813,"s":73,"time":1478068441236},{"lat":2870176,"lon":11592925,"s":74,"time":1478068471236},{"lat":2870184,"lon":11592923,"s":75,"time":1478068501236},{"lat":2870187,"lon":11592917,"s":76,"time":1478068531236},{"lat":2870186,"lon":11592907,"s":77,"time":1478068561236},{"lat":2870175,"lon":11592892,"s":78,"time":1478068591236},{"lat":2870176,"lon":11592819,"s":79,"time":1478068621236},{"lat":2870185,"lon":11592798,"s":80,"time":1478068651236},{"lat":2870202,"lon":11592789,"s":81,"time":1478068681236},{"lat":2870529,"lon":11592780,"s":82,"time":1478068711236},{"lat":2870543,"lon":11592782,"s":83,"time":1478068741236},{"lat":2870550,"lon":11592788,"s":84,"time":1478068771236},{"lat":2870560,"lon":11592860,"s":85,"time":1478068801236},{"lat":2870561,"lon":11593149,"s":86,"time":1478068831236},{"lat":2870568,"lon":11593203,"s":87,"time":1478068861236},{"lat":2870577,"lon":11593219,"s":88,"time":1478068891236},{"lat":2870704,"lon":11593236,"s":89,"time":1478068921236},{"lat":2870746,"lon":11593247,"s":90,"time":1478068951236},{"lat":2870836,"lon":11593223,"s":91,"time":1478068981236},{"lat":2870979,"lon":11593198,"s":92,"time":1478069011236},{"lat":2871309,"lon":11593169,"s":93,"time":1478069041236},{"lat":2871324,"lon":11593173,"s":94,"time":1478069071236},{"lat":2871362,"lon":11593201,"s":95,"time":1478069101236},{"lat":2871500,"lon":11593310,"s":96,"time":1478069131236},{"lat":2871505,"lon":11593318,"s":97,"time":1478069161236},{"lat":2871502,"lon":11593340,"s":98,"time":1478069191236},{"lat":2871465,"lon":11593443,"s":99,"time":1478069221236},{"lat":2871469,"lon":11593461,"s":100,"time":1478069251236},{"lat":2871460,"lon":11593529,"s":101,"time":1478069281236},{"lat":2871375,"lon":11593704,"s":102,"time":1478069311236},{"lat":2871349,"lon":11593735,"s":103,"time":1478069341236},{"lat":2871246,"lon":11593775,"s":104,"time":1478069371236},{"lat":2871177,"lon":11593822,"s":105,"time":1478069401236},{"lat":2871133,"lon":11593891,"s":106,"time":1478069431236},{"lat":2871127,"lon":11593910,"s":107,"time":1478069461236},{"lat":2871137,"lon":11593979,"s":108,"time":1478069491236},{"lat":2871135,"lon":11594150,"s":109,"time":1478069521236},{"lat":2871131,"lon":11594176,"s":110,"time":1478069551236},{"lat":2871117,"lon":11594206,"s":111,"time":1478069581236},{"lat":2871062,"lon":11594289,"s":112,"time":1478069611236},{"lat":2870997,"lon":11594437,"s":113,"time":1478069641236},{"lat":2870981,"lon":11594495,"s":114,"time":1478069671236},{"lat":2870968,"lon":11594615,"s":115,"time":1478069701236},{"lat":2870959,"lon":11594643,"s":116,"time":1478069731236},{"lat":2870937,"lon":11594666,"s":117,"time":1478069761236},{"lat":2870874,"lon":11594691,"s":118,"time":1478069791236},{"lat":2870858,"lon":11594704,"s":119,"time":1478069821236},{"lat":2870860,"lon":11594953,"s":120,"time":1478069851236},{"lat":2870853,"lon":11594982,"s":121,"time":1478069881236},{"lat":2870834,"lon":11595007,"s":122,"time":1478069911236},{"lat":2870807,"lon":11595030,"s":123,"time":1478069941236},{"lat":2870756,"lon":11595057,"s":124,"time":1478069971236},{"lat":2870723,"lon":11595068,"s":125,"time":1478070001236},{"lat":2870637,"lon":11595074,"s":126,"time":1478070031236},{"lat":2870181,"lon":11595017,"s":127,"time":1478070061236},{"lat":2870034,"lon":11594984,"s":128,"time":1478070091236},{"lat":2869504,"lon":11594844,"s":129,"time":1478070121236},{"lat":2869119,"lon":11594771,"s":130,"time":1478070151236},{"lat":2869034,"lon":11594760,"s":131,"time":1478070181236},{"lat":2868976,"lon":11594760,"s":132,"time":1478070211236},{"lat":2868836,"lon":11594779,"s":133,"time":1478070241236},{"lat":2868513,"lon":11594851,"s":134,"time":1478070271236},{"lat":2868342,"lon":11594876,"s":135,"time":1478070301236},{"lat":2868047,"lon":11594885,"s":136,"time":1478070331236},{"lat":2867735,"lon":11594886,"s":137,"time":1478070361236},{"lat":2867430,"lon":11594881,"s":138,"time":1478070391236},{"lat":2866860,"lon":11594885,"s":139,"time":1478070421236},{"lat":2866671,"lon":11594892,"s":140,"time":1478070451236},{"lat":2866534,"lon":11594907,"s":141,"time":1478070481236},{"lat":2866448,"lon":11594922,"s":142,"time":1478070511236},{"lat":2866375,"lon":11594949,"s":143,"time":1478070541236},{"lat":2866296,"lon":11594996,"s":144,"time":1478070571236},{"lat":2866198,"lon":11595079,"s":145,"time":1478070601236},{"lat":2866183,"lon":11595100,"s":146,"time":1478070631236},{"lat":2866167,"lon":11595141,"s":147,"time":1478070661236},{"lat":2866152,"lon":11595225,"s":148,"time":1478070691236},{"lat":2866105,"lon":11595418,"s":149,"time":1478070721236},{"lat":2866074,"lon":11595421,"s":150,"time":1478070751236},{"lat":2865982,"lon":11595394,"s":151,"time":1478070781236},{"lat":2865973,"lon":11595442,"s":152,"time":1478070811236},{"lat":2865956,"lon":11595447,"s":153,"time":1478070841236},{"lat":2865934,"lon":11595442,"s":154,"time":1478070871236},{"lat":2865928,"lon":11595433,"s":155,"time":1478070901236}];

let totalTime = 1; //总回放时间  单位  分钟
let onePonitTime = 1000 * 1 / (line.length / totalTime / 60); //一个点的时间 毫秒
let currentPonit = {}; //当前点
let progress = 0; //进度
const STATE_STOPING = 1;//状态 播放停止
const STATE_RUNING = 2;//状态 播放中
let state = STATE_STOPING;
let interVal = null;
let index = 0;

const PLAY_TYPE_SPEED = 0;
const PLAY_TYPE_OIL = 1;

const legend = {
    0:[
        {
            value:'0~30km/h',
            color:'#FFBA25'
        },
        {
            value:'30~60km/h',
            color:'#3EB6AD'
        },
        {
            value:'60~80km/h',
            color:'#02B9F2'
        },
        {
            value:'80~100km/h',
            color:'#FF8400'
        },
        {
            value:'>100km/h',
            color:'#FF1E1E'
        }
    ],
    1:[
        {
            value:'0-10L/100km',
            color:'#3EB6AD'
        },
        {
            value:'10-20L/100km',
            color:'#02B9F2'
        },
        {
            value:'30-40L/100km',
            color:'#FF8400'
        },
        {
            value:'>40L/100km',
            color:'#FF1E1E'
        }
    ]
}

// 根据两个坐标获取连线的角度
function getAngle(pt1, pt2) {
    var angle = 0;
    if (pt1 && pt2) {
        var lon1 = pt1.lon,
            lat1 = pt1.lat,
            lon2 = pt2.lon,
            lat2 = pt2.lat;

        var xDiff = lon2 - lon1,
            yDiff = lat2 - lat1;

        angle = Math.atan(xDiff / (yDiff || 1)) / Math.PI * 180;


        if(xDiff > 0 && yDiff < 0){
            angle = 180 + angle;
        }else if(xDiff < 0 && yDiff < 0){
            angle = angle - 180;
        }

    }
    return angle;
}

export default class MapbarApi extends Component {
    constructor() {
        super();
        this.state = {
            showLegend:false,
            playType:PLAY_TYPE_SPEED,
            text: "TextView",
            zoom: 8,
            center: {
                longitude: 11595380,//2868291,11595380
                latitude: 2868291
            },
            isZoom: true,
            isMove: true,
            isRotate: true,
            forbidGesture: true,
        }
    }

    _printLog(info) {
        console.log("====MapView:" + info);
    }

    addMarker() {
        module.addAnnotations(
            findNodeHandle(this.refs.mapView),
            [
                {
                    latitude: line[0].lat,
                    longitude: line[0].lon,
                    title: '起点',
                    imageName: "ic_start",
                    iconText: "",
                    iconTextColor: "#ff4b4b",
                    iconTextSize: 18,
                    id: 1,
                    offsetX: 0.5,
                    offsetY: 0.8,
                    click: true
                },
                {
                    latitude: line[line.length - 1].lat,
                    longitude: line[line.length - 1].lon,
                    title: '终点',
                    imageName: "ic_end",
                    iconText: "",
                    iconTextColor: "#ff4b4b",
                    iconTextSize: 18,
                    id: 2,
                    offsetX: 0.5,
                    offsetY: 0.8,
                    click: true
                }
            ]
        )
    }

    addCar = () => {
        let mapRef = findNodeHandle(this.refs.mapView);

        module.setIconOverlayIcons(mapRef,
            [
                {
                    latitude: line[0].lat,
                    longitude: line[0].lon,
                    id: 1,
                    click: true,
                    imageName: "res/icons/1003.png",
                    direction: Math.floor(Math.random() * 100)

             /*       latitude: line[0].lat,
                    longitude: line[0].lon,
                    id: 1,
                    click: true,
                    imageName: "res/icons/1003.png",
                    direction: Math.floor(Math.random() * 100)*/
                }
            ]);
        // module.addAnnotations(findNodeHandle(this.refs.mapView),
        // 	[
        // 		{
        // 			latitude: line[0].lat,
        // 			longitude: line[0].lon,
        // 			title: line[0].s + '',
        // 			imageName: "hotel",
        // 			iconText: line[0].s + '',
        // 			iconTextColor:"#ff4b4b4c",
        // 			iconTextSize:18,
        // 			id: 3,
        // 			offsetX: 0.5,
        // 			offsetY: 0.8,
        // 			click: true,
        // 			callOut: false
        // 		}
        // 	]);
    }

    pauseMoveCar = () => {
        if(interVal){
            this._stopCar();
        }
    }

    progressTo = (progress) => {
        index = Math.round(line.length * (progress / 100));
        if(state === STATE_RUNING){
            //this.startMoveCar();
        }else if(state === STATE_STOPING){
            this._moveCar(Object.assign({}, line[index], {index}));
        }
    }

    _moveCar = (point, nextPoint) => {
        currentPonit = point;
        index = point.index;
        progress = (point.index / line.length) * 100;
        this.setState({});
        module.refreshIconOverlayLocation(findNodeHandle(this.refs.mapView), [{
            latitude: point.lat,
            longitude: point.lon,
            id: 1,
            direction: nextPoint ? getAngle(point,nextPoint) : 0//0//Math.floor(Math.random() * 100)
        }]);
        console.log(point)
        // module.refreshAnnotationLocation(findNodeHandle(this.refs.mapView),
        // 	[
        // 		{
        // 			latitude: point.lat,
        // 			longitude: point.lon,
        // 			id: 3,
        // 			title: (point.s + ''),
        // 			iconText: (point.s + ''),
        // 		}
        // 	]
        // );
    }

    _stopCar = () => {
        clearInterval(interVal);
        interVal = null;
        state = STATE_STOPING;
        this.setState({});
    }

    startMoveCar = () => {
        if(interVal) return;
        interVal = setInterval(() => {
            this._moveCar(Object.assign({}, line[index], {index}), line[index+1]);
            index++;
            if(index === line.length){
                this._stopCar();
                setTimeout(() => {
                    this._moveCar(Object.assign({}, line[0], {index:0}));
                },500);
            }
        },onePonitTime);
        state = STATE_RUNING;
    }


    addLine() {

        const SPEED_1 = 'SPEED_1';
        const SPEED_2 = 'SPEED_2';
        const SPEED_3 = 'SPEED_3';
        const SPEED_4 = 'SPEED_4';
        const SPEED_5 = 'SPEED_5';
        const SPEED_6 = 'SPEED_6';

        let getSpeedType = (speed) => {
            if (0 < speed && speed <= 30) {
                return SPEED_1;
            } else if (30 < speed && speed <= 60) {
                return SPEED_2;
            } else if (60 < speed && speed <= 90) {
                return SPEED_3;
            } else if (90 < speed && speed <= 120) {
                return SPEED_4;
            } else {
                return SPEED_5;
            }
        };

        let getSpeedColor = (speedType) => {
            switch (speedType) {
                case SPEED_1:
                    return '#FFA500';
                case SPEED_2:
                    return '#A2CD5A';
                case SPEED_3:
                    return '#7EC0EE';
                case SPEED_4:
                    return '#27408B';
                case SPEED_5:
                    return '#FF0000';
                case SPEED_6:
                    return '#080808';
            }
        }

        let lines = [], _tmp1 = null;

        line.map((_line, index) => {


            _tmp1 = _tmp1 || {
                    locations: [],
                    speedType: getSpeedType(_line.s)
                };
            if (_tmp1.locations.length === 0 && index > 0) {
                _tmp1.locations.push({latitude: line[index - 1].lat, longitude: line[index - 1].lon});
            }
            _tmp1.locations.push({latitude: _line.lat, longitude: _line.lon});

            if (index === line.length - 1 || getSpeedType(line[index + 1].s) !== _tmp1.speedType) {
                lines.push(Object.assign({}, _tmp1));
                _tmp1 = null;
            }

        });

        console.log(lines);

        module.addLine(findNodeHandle(this.refs.mapView),
            lines.map((line, index) => {
                line.isClose = false;
                line.width = '12';
                line.strokeColor = getSpeedColor(line.speedType);
                line.outlineColor = '#ff8c2b';
                line.lineId = index;
                return line;
            })
        )
    }

    _onInit = () => {
        //this.addLine();
        //this.addMarker();
        this.addCar();
    }

    changePlayType(){
        if(this.state.playType === PLAY_TYPE_SPEED){
            this.setState({playType:PLAY_TYPE_OIL});
            Toast.show(`已切换到油耗模式`, Toast.SHORT);
        } else {
            this.setState({playType:PLAY_TYPE_SPEED});
            Toast.show(`已切换到速度模式`, Toast.SHORT);
        }
    }

    render() {

        const startPauseButton = () => {
            if(state === STATE_RUNING){
                return <Text onPress={this.pauseMoveCar}><Icons.IconPause size={50} color={Env.color.main}/></Text>
            }else{
                return <Text onPress={this.startMoveCar}><Icons.IconPlay  size={50} color={Env.color.main}/></Text>;
            }
        }

        return (
            <View style={[eStyles.fx1]}>
                <View style={[eStyles.fxRow,eStyles.fxCenter,eStyles.paddingHorizontal,{paddingTop:5}]}>
                    {startPauseButton()}
                    <Image source={require('../assets/images/start.png')} style={{width:25,height:25,marginLeft:10}} resizeMode={Image.resizeMode.cover}/>
                    <Slider
                        style={{flex:1}}
                        maximumValue={100}
                        onSlidingComplete={(progress) => {
                            this.progressTo(progress);
                        }}
                        onValueChange={(progress) => {
                            this.progressTo(progress);
                        }}
                        value={progress}
                        minimumTrackTintColor='#169ADA'
                        maximumTrackTintColor="#E5E5E5"
                        thumbTintColor='#169ADA'
                        thumbTouchSize={{width: 30, height: 30}}
                        trackStyle={{height:5}}
                        thumbStyle={{height:15,width:15}}
                    />
                    <Image source={require('../assets/images/end.png')} style={{width:25,height:25}} resizeMode={Image.resizeMode.cover}/>
                </View>
                <View style={[eStyles.fxRow,eStyles.fxCenter,eStyles.paddingHorizontal,{paddingLeft:70,marginTop:-10,paddingBottom:5}]}>
                    <Text style={[eStyles.text]}>{DateUtil.format(line[0].time,'MM-dd hh:mm')}</Text>
                    <Text style={[eStyles.fx1,eStyles.text,{textAlign:'center',color:Env.color.main}]}>{DateUtil.format(currentPonit.time,'MM-dd hh:mm')}</Text>
                    <Text style={[eStyles.text]}>{DateUtil.format(line[line.length - 1].time,'MM-dd hh:mm')}</Text>
                </View>

                <View>{this.props.topView}</View>

                <MapView style={{flex: 1}}
                         zoomLevel={this.state.zoom}
                         worldCenter={this.state.center}
                         forbidGesture={this.state.forbidGesture}
                         isZoom={this.state.isZoom}
                         isMove={this.state.isMove}
                         isRotate={this.state.isRotate}
                         onInit={this._onInit}
                         ref="mapView"
                />

                <View style={styles.controlView}>
                    <TouchableOpacity
                        onPress={() => module.setZoomIn(findNodeHandle(this.refs.mapView),1)}
                        style={styles.controlButton}>
                        <Icons.IconAdd size={Env.font.base * 60}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => module.setZoomOut(findNodeHandle(this.refs.mapView),1)}
                        style={[styles.controlButton,eStyles.borderTop]}>
                        <Icons.IconRemove size={Env.font.base * 60}/>
                    </TouchableOpacity>
                </View>

                <View style={[styles.controlView,{bottom:Env.font.base * 130}]}>
                    <TouchableOpacity
                        onPress={() => this.changePlayType()}
                        style={[styles.controlButton]}>
                        {
                            this.state.playType === PLAY_TYPE_SPEED
                                ? <Icons.IconSpeed size={Env.font.base * 60}/>
                                : <Icons.IconDrums size={Env.font.base * 60}/>
                        }
                    </TouchableOpacity>
                </View>

                <View style={[styles.controlView,{bottom:Env.font.base * 30}]}>
                    <TouchableOpacity
                        onPress={() => this.setState({showLegend:!this.state.showLegend})}
                        style={[styles.controlButton]}>
                        <Icons.IconBrowsers size={Env.font.base * 60}/>
                    </TouchableOpacity>
                </View>

                {this.state.showLegend && <View style={styles.legendView}>
                    {legend[this.state.playType].map((item, index) =>
                        <View style={[styles.legendItem]} key={index}>
                            <View style={[styles.legendColor,{backgroundColor:item.color}]}></View><Text style={styles.legendText}>{item.value}</Text>
                        </View>
                    )}
                </View>}
                {
                    this.props.rightButtomView
                }
            </View>
        );
    }
}



const styles = StyleSheet.create({
    controlView:{
        position:'absolute',
        bottom: Env.font.base * 330,
        right: Env.font.base * 30,
        borderRadius:Env.font.base * 10,
        ...eStyles.border,
        backgroundColor:'#FFF',
        borderWidth:1
    },
    controlButton:{
        width: Env.font.base * 80,
        height: Env.font.base * 80,
        justifyContent:'center',
        alignItems:'center'
    },
    legendView : {
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.5)',
        bottom: Env.font.base * 30,
        right: Env.font.base * 150,
        borderRadius:Env.font.base * 10,
        padding:Env.font.base * 10
    },
    legendItem:{
        flexDirection:'row',
        padding: Env.font.base * 4,
        alignItems:'center'
    },
    legendColor:{
        width: Env.font.base * 30,
        height: Env.font.base * 30,
        backgroundColor:'blue',
        borderRadius:Env.font.base * 4,
        marginRight:Env.font.base * 10
    },
    legendText:{
        color:'#FFF',
        fontSize:Env.font.note
    }

});