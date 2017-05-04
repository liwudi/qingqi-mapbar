/**
 * Created by linyao on 2017/4/10.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import driver from '../../../assets/images/driver.png';
import  camera from '../../../assets/images/camera.png';
import  ImagePickBotton from '../../../components/ImagePickButton'
import { fileUpLoad } from '../../../services/AppService';
import Toast from '../../../components/Toast';

class MyInfoDrivingCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        };
    }
    openMenu = () => {
        if(this.state.isUpLoading){
            Toast.show('文件上传中，请稍等', Toast.SHORT);
        }else {
            this.refs.ImagePickBotton.show();
        }
    };
    onImagePick= (imageSource) => {
        this.setState({isUpLoading:true},()=>{
            fileUpLoad(imageSource)
                .then((data)=>{
                    return this.props.successFun({ memberPhoto:data.fullPath})
                })
                .then(()=>{
                    this.setState({data:Object.assign({},this.state.data,{memberPhoto:imageSource.path})})
                })
                .catch(()=>{
                    Toast.show('文件服务器错误', Toast.SHORT);
                })
                .finally(()=>{
                    this.setState({isUpLoading:false})
                })
        })
    };

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="真实头像"/>
                <View style={[estyle.marginTop,estyle.fx1,estyle.fxRowCenter]}>
                    <View style={[styles.imgBox]}>
                        {
                            this.props.data.memberPhotoValidStatus == 1 && !this.state.data.memberPhoto ?
                                <Image source={driver} style={[{width: 500 * basefont,height: 300 * basefont }]} /> :
                                <Image source={ {uri:this.state.data.memberPhoto} } resizeMode={Image.resizeMode.cover} style={[{width: 500 * basefont,height: 300 * basefont }]} />
                        }
                        {
                            this.props.data.memberPhotoValidStatus !== 4 ?
                                <TouchableOpacity style={[styles.camera,estyle.fx1,estyle.fxCenter]} onPress={ this.openMenu }>
                                    <Image source={camera} style={[{width: 120 * basefont,height: 120 * basefont }]} />
                                </TouchableOpacity>: null
                        }
                    </View>
                </View>
                <ImagePickBotton ref="ImagePickBotton" onImagePick={this.onImagePick} />
            </View>
        );
    }
}
const basefont = Env.font.base;


const estyle = Env.style;
const styles=StyleSheet.create({
    imgBox:{
        position: 'relative',
        overflow: 'hidden',
        width : 500 * basefont,
        height : 300 * basefont
    },
    camera:{
        position: 'absolute',
        width : 500 * basefont,
        height : 300 * basefont,
        top:0,
        left:0,
    }
});

export default MyInfoDrivingCard