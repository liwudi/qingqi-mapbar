/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Env from '../../../utils/Env';
import TopBanner from '../../../components/TopBanner';
import ConfirmButton from '../../../components/ConfirmButton'
import TypeOptionLabel from './components/TypeOptionLabel'
import LabelInput from '../../../components/LabelInput';
import TextArea from '../../../components/widgets/TextArea';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import ListItem from '../../../components/ListItem';
import BorderButton from '../../../components/BorderButton'
import {queryAllAppointmentItemList} from '../../../services/AppService';
import ImageList from '../../../components/ImageList';
import Audio from '../../../components/Audio';
import {newWo} from '../../../services/ServiceStationService';
import Toast from '../../../components/Toast';
/*import DatePicker from '../../../components/picker/DatePicker';
import TimePicker from '../../../components/picker/TimePicker';*/
import DateTimePicker from '../../../components/picker/DateTimePicker.ios';
import ServiceStationAppointmentDetail from './ServiceStationAppointmentDetail';
import moment from 'moment';
import SubmitButton from '../../../components/SubmitButton';
import HelperMeMap from './HelpMeMap';
const estyle = Env.style;
const getBLen = function(str) {
    if (str == null) return 0;
    if (typeof str != "string"){
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g,"01").length;
}
class ServiceStationAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doing:false,
            name: this.props.userStore.userInfo.name,
            phone: this.props.userStore.userInfo.phone,
            date: '', //格式化后的日期
            time: '',//格式化后的时间
            repairList: [],//维修项目
            maintainList: [], //保养项目
            imgUrlList:[],//图片路径列表
            audioUrlList:[], //音频路径列表
            visible: false,
            bottomHeight:0
        };
    }

    componentDidMount() {
        //获取保养与维修服务项
        queryAllAppointmentItemList()
            .then((res) => {
                this.setState({maintainType: res})
            })
            .catch()
    }

    //日期选择器
    datePicker() {
        this.setState({visible: true});
        return;
        DatePicker.open(
            {
                date: this.state.date ? new Date(this.state.date.split('-')[0], this.state.date.split('-')[1] - 1, this.state.date.split('-')[2]) : new Date(),
                minDate: new Date()
            }
        )
            .then((obj) => {
                let month = obj.month < 9 ? '0' + (obj.month + 1) : obj.month + 1,
                    day = obj.day < 10 ? '0' + obj.day : obj.day,
                    date;
                if (obj.action !== DatePicker.dismissedAction) {
                    date = obj.year + '-' + month + '-' + day;
                    this.timePicker(date);
                }
            }).catch()
    }

    onSelectDate(datetime) {
        console.info(datetime)
        let dt = moment(datetime).format('YYYY-MM-DD HH:mm')
        this.setState({dateTime: dt})
        this.setState({visible: false});
    }
    onSelectCancel() {
        this.setState({visible: false});
    }
    //时间选择器
    timePicker(date) {
        return;
        console.info('timepicker')
        TimePicker.open(
            {
                hour: this.state.time ? +this.state.time.split(':')[0] : null,
                minute: this.state.time ? +this.state.time.split(':')[1] : null,
                is24Hour: true
            }
        )
            .then((obj) => {
                let hour = obj.hour < 10 ? '0' + obj.hour : obj.hour,
                    minute = obj.minute < 10 ? '0' + obj.minute : obj.minute;
                if (obj.action !== TimePicker.dismissedAction) {
                    this.setState({time: hour + ':' + minute, date: date}, () => {
                        this.setState({dateTime: this.state.date + ' ' + this.state.time})
                    });
                }
            }).catch()
    }

    //生成保养与维护项目
    /**
     * type 传 repairList（维修项目） 或 maintainList（保养项目）
     * */
    repair(type) {
        if (this.state.maintainType && this.state.maintainType[type]) {
            return this.state.maintainType[type].map((item, index) => {
                return <BorderButton style={[estyle.marginRight,estyle.marginBottom]}
                                     color={this.state[type + index] ? Env.color.auxiliary : Env.color.main}
                                     key={index}
                                     onPress={() => {
                                         this.checkMaintainType(type, index, item)
                                     }}>{item.itemName}</BorderButton>
            })
        } else {
            return null
        }
    }

    //选择保养或维护项目 type(项目类型) index（与类型连接控制每一个的样式）item（数据）
    checkMaintainType(type, index, item) {
        let obj = {}, list = {}, replaceList = [];
        obj[type + index] = !this.state[type + index];
        this.setState(obj);
        //在查找是否有这一项 ,没有的话添加到数组中，存在的话pop
        let isHas = this.state[type].some((name) => {
            if (name == item.itemName) {
                return true
            } else {
                return false
            }
        });
        if (isHas) {
            this.state[type].forEach((name) => {
                if (name != item.itemName) {
                    replaceList.push(name);
                }
            });
            list[type] = replaceList;
        } else {
            this.state[type].push(item.itemName);
            list[type] = this.state[type];
        }
        this.setState(list);
    }

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);
    //校验数据
    nextStep() {
        if(getBLen(this.state.name) > 20){
            Toast.show('姓名不能超过10个汉字或20个字符', Toast.SHORT);
            return;
        }
        if (LabelInput.Validate(this.refs)) {
            if (this.state.dateTime) {
                if (this.state.maintainList.length !== 0 || this.state.repairList.length !== 0) {
                    this.newAppointment();
                } else {
                    Toast.show('请选择预约项目', Toast.SHORT);
                }
            } else {
                Toast.show('请选择时间', Toast.SHORT);
            }
        }
    }


    //提交预约
    newAppointment() {
        if(this.state.doing) return false;
        this.setState({doing:true});
        let opts={
            orderTime: this.state.dateTime+':00',
            serviceCarrepairStype: this.state.repairList.join(','),
            serviceCarmaintainStype: this.state.maintainList.join(','),
            serviceStationId: this.props.stationId,
            userFeedback: this.state.advice,
            fileUrls: this.state.imgUrlList.join(',')+';'+this.state.audioUrlList.join(','),
            repairName:this.state.name,
            repairTel:this.state.phone
        };
        newWo(opts)
            .then((data) => {
                Toast.show('恭喜您，预约提交成功，待客服确认！', Toast.SHORT);
                this.props.router.replace(ServiceStationAppointmentDetail,{order: {woCode:data.woCode}, ...this.props});
            })
            .catch((err) => {
                Toast.show(err.message, Toast.SHORT);
            }).finally(()=>{
                this.setState({doing:false})
            })
    }

    onChange(obj) {
        this.setState(obj);
    }

    render() {
        return (
            <View style={[estyle.fx1,
                estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="服务预约"/>
                <ScrollView style={[estyle.fx1]}>
                    <View style={[styles.loginView, estyle.marginBottom]}>
                        <LabelInput
                            style={[styles.loginInput, estyle.borderBottom]}
                            ref="name"
                            onChangeText={name => this.onChange({name: name})}
                            secureTextEntry={true}
                            placeholder='可输入10个汉字，或20个字符'
                            label="预约人"
                            labelSize="3"
                            maxLength={20}
                            defaultValue={this.props.userStore.userInfo.name}
                            validates={[
                                {require: true, msg: "请填写预约人姓名"}
                            ]}
                        />
                        <LabelInput
                            style={[styles.loginInput, estyle.borderBottom]}
                            ref="phone"
                            onChangeText={phone => this.onChange({phone: phone})}
                            secureTextEntry={true}
                            placeholder='请填写手机号'
                            label="手机 "
                            keyboardType="phone-pad"
                            defaultValue={this.props.userStore.userInfo.phone}
                            validates={[
                                {require: true, msg: "请填写手机号"},
                                {pattern: /^1\d{10}$/, msg: '手机号格式错误'}
                            ]}
                        />
                        <ViewForRightArrow style={[estyle.fxCenter]} onPress={() => {
                            this.datePicker()
                        }}>
                            <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                                <View style={[estyle.fx1, estyle.fxRow, estyle.paddingRight]}>
                                    <Text style={[estyle.text, {textAlign: 'left',color: Env.color.important}]}>预约时间</Text>
                                </View>
                                <View style={[estyle.fxCenter]}>
                                    <Text
                                        style={[estyle.text, {textAlign: 'right'}]}>{ this.state.dateTime || '选择预约时间'}</Text>
                                </View>
                            </View>
                        </ViewForRightArrow>
                    </View>
                    <View style={[estyle.cardBackgroundColor]}>
                        <ListItem left='预约项目' right="(保养或维修最少选择一项)"/>
                        <View style={[estyle.padding]}>
                            <Text style={[estyle.text, {color: Env.color.note}]}>保养服务</Text>
                            <View style={[estyle.fxRow, estyle.padding,{flexWrap:'wrap'}]}>
                                {this.repair.bind(this)('maintainList')}
                            </View>
                            <Text style={[estyle.text, {color: Env.color.note}]}>维修服务</Text>
                            <View style={[estyle.fxRow, estyle.padding,{flexWrap:'wrap'}]}>
                                {this.repair.bind(this)('repairList')}
                            </View>
                        </View>
                    </View>
                    <View style={[estyle.border, estyle.cardBackgroundColor, estyle.padding]}>
                        <Text style={[estyle.text, {color: Env.color.note}]}>故障描述（选填）</Text>
                        <View style={[estyle.fx1,estyle.marginTop]}>
                            <TextInput
                                style={[estyle.text, {height: 100 * Env.font.base}]}
                                onChangeText={advice => this.onChange({advice: advice})}
                                placeholder="请输入故障或保养描述（100个汉字或200个字符)"
                                maxLength={200}
                                multiline={true}
                                placeholderTextColor={Env.color.note}
                                onFocus={()=>{this.setState({bottomHeight:500})}}
                                onBlur={()=>{this.setState({bottomHeight:0})}}
                            />
                        </View>
                    </View>
                    <View>
                        <ImageList title="预约图片" type='edit' onChange={(list)=>{ this.setState({ imgUrlList:list}) }} />
                        {/*<Audio {...this.props} title="预约录音" type='edit' onChange={(list)=>{ this.setState({ audioUrlList:list}) }}/>*/}
                    </View>

                    <View style={[estyle.fxRowCenter,estyle.marginVertical]}>
                        <SubmitButton size="large"
                                      doing={this.state.doing}
                                       onPress={() => {
                                           this.nextStep()
                                       }}>预约</SubmitButton>
                    </View>
                </ScrollView>
                <View style={[{height: this.state.bottomHeight * basefont}]} />
                <DateTimePicker visible={this.state.visible} onCancel={() => {this.setState({visible: false})}} onConfirm={(datetime) => {this.onSelectDate(datetime)}}/>
            </View>
        );
    }
}
export default connect(function (stores) {
    return {userStore: stores.userStore}
})(ServiceStationAppointment);

const basefont= Env.font.base;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Env.color.bg
    },
    loginView: {
        alignItems: 'center'
    }
});