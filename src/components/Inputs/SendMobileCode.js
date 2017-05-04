/**
 * Created by ligj on 2016/10/22.
 */
import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import Env from '../../utils/Env';
const estyle = Env.style,
    emsg = Env.msg.form,
    pattern = Env.pattern;

import LabelInput from '../LabelInput';
import CancelButton from '../CancelButton';
import Toast from '../Toast';

export default class TabBar extends React.Component{

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    constructor(props){
        super(props);
        this.state = {
            status:null
        };
    }
    componentDidMount(){
        if(this.props.isWaiting){
            this.setState ({
                status:'interval',
                second:60,
            });
            this.interval = setInterval(() => {
                if(this.state.second === 0) {
                    this.setState({
                        status: null
                    });
                    clearInterval(this.interval);
                } else {
                    this.setState({
                        second: this.state.second-1,
                    });
                }
            },1000);
        }
    }


    sendCode = () => {
        this.setState ({
            status:'doing',
            second:60,
        });
        let rs = this.props.sendCode();
        if(rs instanceof Promise){
            rs.then(() => {
                Toast.show('验证码已发送', Toast.SHORT);
                this.refs.textInput.focus();
                this.setState ({
                    status:'interval',
                });
                this.interval = setInterval(() => {
                    if(this.state.second === 0) {
                        this.setState({
                            status: null
                        });
                        clearInterval(this.interval);
                    } else {
                        this.setState({
                            second: this.state.second-1,
                        });
                    }
                },1000);
            })
            .catch((e) => {
                Toast.show(e.message || '获取验证码失败', Toast.SHORT);
                this.setState ({
                    status:null
                });
            });
        }else{
            this.setState ({
                status:null
            });
        }
    }

    componentWillUnmount(){
        this.interval && clearInterval(this.interval);
    }

    render (){
        let rightView = () => {
            let disable = this.state.status === 'doing' || this.state.status === 'interval';
            let text = this.state.status === 'doing' ? '正在发送' : this.state.status === 'interval' ? `重新获取${this.state.second}` : '获取验证码';
            return (<CancelButton size="small" disabled={disable} onPress={this.sendCode}>{text}</CancelButton>);
        };
        return (
            <LabelInput
                {...this.props}
                ref="textInput"
                keyboardType="numeric"
                style={[this.props.style]}
                placeholder='短信验证码'
                label="验证码"
                rightView = { rightView() }
                labelSize={this.props.labelSize || 3}
                maxLength={6}
                validates={[
                    {require:true, msg: emsg.code.require},
                    {pattern:pattern.code, msg: emsg.code.pattern}
                ]}
            />
        );
    }
}
