/**
 * Created by linyao on 2016/12/5.
 */
/**
 * Created by linyao on 2016/11/28.
 */
import React, {Component} from 'react';
import {Platform, TouchableOpacity, View, Text, StyleSheet, Modal, Image} from 'react-native';
import Env from '../utils/Env';
import ModalBox from './widgets/Modal';
import CommonModule from './CommonModule';
import {IconAudioPlay, IconPlayStop, IconClose} from './Icons';
const estyle = Env.style;
import Toast from '../components/Toast';

export default class AudioPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            time: +0,
            action: 1,
            audio: '',
            txt: '点击播放'
        }
    }

    show = () => {
        CommonModule.getPlayAudioDuration(this.props.url)
            .then((data) => {
                let mm = parseInt((data.mediaPlayerDuration / 1000) / 60) < 10 ? '0' + parseInt((data.mediaPlayerDuration / 1000) / 60) : parseInt((data.mediaPlayerDuration / 1000) / 60),
                    ss = parseInt((data.mediaPlayerDuration / 1000 - mm * 60) + 1) < 10 ? '0' + parseInt((data.mediaPlayerDuration / 1000 - mm * 60) + 1) : parseInt((data.mediaPlayerDuration / 1000 - mm * 60) + 1),
                    time = mm + ':' + ss;
                this.setState({fullTime: time})
            })
            .catch(() => {
                Toast.show('读取文件信息失败', Toast.SHORT);
            })
        this.setState({
            visible: true
        })
    };

    close = () => {
        clearInterval(this.timer);
        this.setState({
            visible: false,
            txt: '点击播放',
            action: 1,
            time: 0
        })
    }

    play() {
        this.setState({action: 2,txt:'播放中'}, () => {
            CommonModule.playAudio(this.props.url)
                .then((data) => {
                    this.close();
                })
                .catch(() => {
                    Toast.show('播放文件失败', Toast.SHORT);
                })
                .finally(() => {
                    this.setState({isPlaying: false});
                })
        });
        this.timer = setInterval(() => {
            this.setState({time: this.state.time + 1})
        }, 1000)
    };

    stop() {
        clearInterval(this.timer);
        CommonModule.pauseAudioPlay()
            .then(() => {
                this.close();
            })
            .catch()
    }

    actionType() {
        switch (this.state.action) {
            case 1 :
                return <View style={[styles.box, estyle.fxCenter]}><TouchableOpacity onPress={() => {
                    this.play()
                }}><View style={[styles.play]}/></TouchableOpacity></View>;
                break;
            case 2 :
                return <View style={[styles.box, estyle.fxCenter]}><TouchableOpacity onPress={() => {
                    this.stop()
                }}><View style={[styles.stop]}/></TouchableOpacity></View>;
                break;
            default:
                return null;
        }
    }

    setTime() {
        let m = '00', s = '00', time = this.state.time;
        m = parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60);
        s = (time - m * 60) < 10 ? '0' + (time - m * 60) : (time - m * 60);
        return m + ':' + s;
    }

    cancel() {
        if (this.state.action == 1) {
            this.close();
        } else {
            CommonModule.stopAudio().finally(() => {
                clearInterval(this.timer);
                this.close()
            });
        }
    }

    render() {
        return (
            <ModalBox visible={this.state.visible} style={[]} onClose={() => {
            }}>
                <View style={[estyle.fx1]}/>
                <View style={[estyle.padding, estyle.marginBottom, estyle.fxColumn]}>
                    <View style={[estyle.fxCenter, estyle.paddingTop]}>
                        <View style={[estyle.marginVertical]}><Text
                            style={{color: '#fa0404', fontSize: Env.font.base * 50}}>{this.state.txt}</Text></View>
                        <View style={[estyle.marginBottom]}><Text
                            style={{color: '#fff', fontSize: Env.font.base * 60}}>{this.setTime()+' / '+this.state.fullTime}</Text></View>
                        {
                            this.actionType()
                        }
                    </View>
                    <View style={[estyle.fxRow]}>
                        <View style={[estyle.fx1]}><TouchableOpacity onPress={ () => {
                            if (this.state.action == 2) {
                                this.stop()
                            } else {
                                this.close()
                            }
                        } }><Text style={[{textAlign: 'left', color: '#fff'}]}>取消</Text></TouchableOpacity></View>
                    </View>
                </View>
            </ModalBox>
        );
    }
}
const base = Env.font.base;
const styles = StyleSheet.create({
    box: {
        width: base * 150,
        height: base * 150,
        borderWidth: base * 5,
        borderRadius: base * 150,
        borderColor: '#fff'
    },
    play: {
        width: base * 100,
        height: base * 100,
        borderRadius: base * 100,
        backgroundColor: '#fa0404'
    },
    stop: {
        width: base * 80,
        height: base * 80,
        backgroundColor: '#fa0404'
    }
});