/**
 * Created by linyao on 2016/12/1.
 */
/**
 * Created by linyao on 2016/11/28.
 */
import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Navigator,
    Image,
    Alert
} from 'react-native';

import Toast from '../components/Toast';
import Env from '../utils/Env';
import ViewForRightDom from './ViewForRightDom';
import BorderButton from './BorderButton';
import {IconMinus, IconPlusCircle, IconMicrophone,IconTimesCirle} from './Icons';
import CommonModule from './CommonModule';
import {fileUpLoad} from '../services/AppService';
import Record from './Record';
import AudioPlay from './AudioPlay';
const estyle = Env.style;

export default class Audio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertCActive: false,
            audioArr: [],
            playUrl: null,
            showBigImg: false,
            isUpLoading:false
        }
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.data === undefined) return false;
    //     this.setState({
    //         audioArr:nextProps.data
    //     })
    // }

    //添加录音
    pushAudio(obj) {
        let arr = this.state.audioArr,
            nameList = obj.audioPath.split('/');
        this.setState({isUpLoading:true},()=>{
            fileUpLoad({path: obj.audioPath, fileName: nameList[nameList.length - 1], type: 'audio/amr'})
                .then((data) => {
                    arr.push(data.fullPath);
                    this.setState({audioArr: arr},()=>{this.props.onChange(this.state.audioArr)});
                })
                .catch()
                .finally(()=>{
                    this.setState({isUpLoading:false})
                })
        })

    }

    //删减录音
    minusImg(url){
        let arr= [];
        this.state.audioArr.forEach((item)=>{
            if(item !== url){
                arr.push(item)
            }
        });
        this.setState({audioArr:arr},()=>{this.props.onChange(this.state.audioArr)});
    }

    //音频缩略图
    audioImgList() {
        let arr = this.props.type == 'edit' ? this.state.audioArr : this.props.data;
        if( arr.length === 0) return null;
        return (
            arr.map((item, index) => {
                return (
                    <View key={index} style={[estyle.padding]}>
                        {
                            item ? <TouchableOpacity onPress={() => {
                            this.setState({playUrl: item}, () => {
                                this.refs.audioPlay.show();
                            });
                        }}>
                                <IconMicrophone />
                            </TouchableOpacity> : <View/>
                        }
                        {
                            this.props.type === 'edit' ?
                                <TouchableOpacity style={{position: 'absolute', top: 0, right: 0}} onPress={() => {
                                    Alert.alert(
                                        '删除录音',
                                        '确认删除该录音?',
                                        [
                                            {text: '确认', onPress: () => {this.minusImg(item) } },
                                            {text: '取消', onPress: () => console.log('OK Pressed!')},
                                        ]
                                    )
                                }}>
                                    <IconTimesCirle size={Env.font.text}  color="red"/>
                                </TouchableOpacity> :
                                <View/>
                        }
                    </View>
                )
            })
        )
    }

    render() {
        return (
            <View>
                <ViewForRightDom
                    rightDom={
                        this.props.type === 'edit' ?
                            <View style={[estyle.fxRow, estyle.fx1, estyle.fxCenter]}>
                                <TouchableOpacity style={estyle.topBtn}
                                                  onPress={ () => {
                                                      if (!this.state.isUpLoading && this.state.audioArr.length < 6) {
                                                          this.refs.record.show();
                                                      } else if(this.state.audioArr.length >= 6){
                                                          Toast.show('最多可添加6段录音', Toast.SHORT);
                                                      }else {
                                                          Toast.show('上传文件中，请稍后再试', Toast.SHORT);
                                                      }
                                                  }}><IconPlusCircle/></TouchableOpacity>
                            </View> : <View/>
                    }
                >
                    <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                        <Text style={[estyle.text]}>{this.props.title}</Text>
                        {this.audioImgList()}
                    </View>
                </ViewForRightDom>
                <View>
                    <Record {...this.props} ref="record" save={this.pushAudio.bind(this)}/>
                </View>
                <View>
                    <AudioPlay {...this.props} ref="audioPlay" url={this.state.playUrl}/>
                </View>
            </View>
        );
    }
}