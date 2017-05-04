/**
 * Created by linyao on 2016/12/1.
 */
import React, {Component} from 'react';
import {Platform, TouchableOpacity, View, Text, StyleSheet, Modal,Alert} from 'react-native';

import Env from '../utils/Env';
import ModalBox from './widgets/Modal';
import ConfirmButton from './ConfirmButton'
import CancelButton from './CancelButton';
import Toast from './Toast';
import CommonModule from './CommonModule';
import {IconMicrophone} from './Icons';
const estyle = Env.style;


export default class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            time:+0,
            action:1,
            audio:'',
            txt:'点击录音'
        }
    }

    show = () => {
        this.setState({
            visible: true
        })
    }

    close = () => {
        this.setState({
            visible: false,
            txt:'点击录音',
            action:1,
            time:0
        })
    }

    startRecord = () => {
        CommonModule.startAudio()
            .then(()=>{
                this.setState({action:2,txt:'录音中'});
                console.log('启动成功');
                this.timer=setInterval(()=>{
                    this.setState({time: this.state.time + 1})
                },1000)
            })
            .catch(()=>{
                console.log('启动失败')
            })

    };

    stopRecord = () => {
        if(this.state.action != 2){ Toast.show('请先开始录音', Toast.SHORT); return false}
        CommonModule.stopAudio()
            .then((data)=>{
                this.setState({txt:'录音结束'});
                clearInterval(this.timer);
                this.props.alert(
                    '保存',
                    '是否保存？',
                    [
                        {text: '确认', onPress: () => {this.props.save(data);this.close()}},
                        {text: '取消', onPress: () => {this.close()}}
                    ]
                )
            })
            .catch(()=>{
                console.log('停止失败')
            })
    };

    actionType(){
        switch (this.state.action){
            case 1 : return  <View style={[styles.box,estyle.fxCenter]}><TouchableOpacity onPress={this.startRecord}><View style={[styles.play]} /></TouchableOpacity></View>; break;
            case 2 : return  <View style={[styles.box,estyle.fxCenter]}><TouchableOpacity onPress={this.stopRecord}><View style={[styles.stop]} /></TouchableOpacity></View>; break;
            default: return null;
        }
    }

    setTime(){
        let m='00',s='00',time=this.state.time;
        m= parseInt( time/60 )<10 ? '0'+ parseInt( time/60 ) : parseInt( time/60 );
        s= (time- m*60)<10 ? '0'+ (time- m*60): (time - m*60);
        return m+':'+s;
    }

    cancel(){
        if (this.state.action == 1 ){
            this.close();
        }else {
            CommonModule.stopAudio().finally(()=>{ clearInterval(this.timer); this.close()});
        }
    }

    render() {
        return (
            <ModalBox visible={this.state.visible} style={[]} onClose={() => {}}>
                <View style={[estyle.fx1]}/>
                <View style={[estyle.padding,estyle.marginBottom, estyle.fxColumn]}>
                    <View style={[ estyle.fxCenter, estyle.paddingTop]}>
                        <View style={[estyle.marginVertical]}><Text style={{color:'#fa0404',fontSize: Env.font.base*50}}>{this.state.txt}</Text></View>
                        <View style={[estyle.marginBottom]}><Text style={{color:'#fff',fontSize: Env.font.base*120}}>{this.setTime()}</Text></View>
                        {
                            this.actionType()
                        }
                    </View>
                    <View style={[estyle.fxRow]}>
                        <View style={[estyle.fx1]}><TouchableOpacity onPress={ ()=>{ this.cancel() } }><Text style={[{textAlign:'left',color:'#fff'}]}>取消</Text></TouchableOpacity></View>
                        <TouchableOpacity onPress={this.stopRecord.bind(this)}><Text style={[{color:'#fff'}]}>保存</Text></TouchableOpacity>
                    </View>
                </View>
            </ModalBox>
        );
    }
}
const base=Env.font.base;
const styles = StyleSheet.create({
    box:{
        width: base*150,
        height:base*150,
        borderWidth:base*5,
        borderRadius:base*150,
        borderColor:'#fff'
    },
    play:{
        width: base*100,
        height:base*100,
        borderRadius:base*100,
        backgroundColor:'#fa0404'
    },
    stop:{
        width: base*80,
        height:base*80,
        backgroundColor:'#fa0404'
    }
});