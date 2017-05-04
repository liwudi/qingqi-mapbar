/**
 * Created by ligj on 2016/10/25.
 */
/**
 * Created by ligj on 2016/10/20.
 */
import React, { Component } from 'react';
import { View, WebView , TouchableOpacity, Text } from 'react-native';
import * as Icons from './Icons';

import TopBanner from './TopBanner';

import Env from '../utils/Env';

const estyle = Env.style;
const basefont = Env.font.base;

export default class News extends Component {

    static defaultProps = {
        showBanner : true
    };

    constructor(props){
        super(props);
        this.state = {
            uri: this.props.uri,
            page: {},
            title:'卡友论坛'
        }
    }

    doBack(){
        if(this.state.page.canGoBack){
            this.setState({
                uri: `javascript:window.history.back();var a = '${Math.random()}'`
            })
        }else{
            this.props.doBack();
        }
    }

    onClose(){
        this.props.doBack();
    }

    onPageChange(page){
        this.setState({page});
        this.props.onPageChange && this.props.onPageChange(page);
    }

    render(){
        const _renderButton = () => {
            return (
                <View style={[estyle.fxRow,estyle.fxRowCenter,{paddingLeft: 20 * basefont}]}>
                    <TouchableOpacity onPress={() => this.doBack()}>
                        <Text ><Icons.IconArrowLeft color="#FFF" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 60 * Env.font.base}} onPress={() => this.onClose()}>
                        <Text ><Icons.IconClose color="#FFF" size={basefont  *75} /></Text>
                        {/*<Text style={[{fontSize:basefont*40,color:'#fff'}]}>X</Text>*/}
                    </TouchableOpacity>
                </View>
            )
        };
        return (
            <View  style={[estyle.fx1]}>
                { this.props.showBanner ? <TopBanner
                    {...this.props}
                    leftShow={true}
                    leftView={_renderButton()}
                    doBack={this.doBack.bind(this)}
                    title={this.state.title}
                /> : null}
                <WebView
                    onNavigationStateChange={(page) => {
                        this.onPageChange(page)
                    }}
                    style={{flex:1}}
                    source={{uri: this.state.uri}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                />
            </View>
        )
    }
}