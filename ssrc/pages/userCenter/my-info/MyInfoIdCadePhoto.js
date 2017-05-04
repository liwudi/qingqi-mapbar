/**
 * Created by linyao on 2017/2/9.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import IdCard from '../../../assets/images/IdCard.png';
import IdCardBack from '../../../assets/images/IdCard_back.png';
import  camera from '../../../assets/images/camera.png';
import  ImagePickBotton from '../../../components/ImagePickButton'
import {fileUpLoad} from '../../../services/AppService';
import Toast from '../../../components/Toast';

class MyInfoIdCadePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            type: null
        };
    }

    openMenu = (type) => {
        if (this.state.isUpLoading) {
            Toast.show('文件上传中，请稍等', Toast.SHORT);
        } else {
            this.setState({type: type}, () => {
                this.refs.ImagePickBotton.show();
            })
        }
    };
    onImagePick = (imageSource) => {
        this.setState({isUpLoading: true}, () => {
            fileUpLoad(imageSource)
                .then((data) => {
                    return this.state.type == 1 ? this.props.successFun({idFrontPhoto: data.fullPath}) : this.props.successFun({idBackPhoto: data.fullPath})
                })
                .then(() => {
                    this.state.type == 1 ? this.setState({data: Object.assign({}, this.state.data, {idFrontPhoto: imageSource.path})}) : this.setState({data: Object.assign({}, this.state.data, {idBackPhoto: imageSource.path})})
                })
                .catch(() => {
                    Toast.show('文件服务器错误', Toast.SHORT);
                })
                .finally(() => {
                    this.setState({isUpLoading: false})
                })
        })
    };

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="身份证照片"/>
                <View style={[estyle.marginTop,estyle.fx1,estyle.fxRowCenter]}>
                    <Text style={[estyle.note,estyle.marginVertical]}>注：身份证正面照片</Text>
                    <View style={[styles.imgBox]}>
                        {
                            this.props.data.idCardValidStatus == 1 && !this.state.data.idFrontPhoto ?
                                <Image source={IdCard} style={[{width: 500 * basefont,height: 300 * basefont }]}/> :
                                <Image source={ {uri:this.state.data.idFrontPhoto} } resizeMode={Image.resizeMode.cover}
                                       style={[{width: 500 * basefont,height: 300 * basefont }]}/>
                        }
                        {
                            this.props.data.idCardValidStatus !== 4 ?
                                <TouchableOpacity style={[styles.camera,estyle.fx1,estyle.fxCenter]}
                                                  onPress={ ()=>{ this.openMenu(1)} }>
                                    <Image source={camera} style={[{width: 120 * basefont,height: 120 * basefont }]}/>
                                </TouchableOpacity> : null
                        }
                    </View>
                    <Text style={[estyle.note,estyle.marginVertical]}>注：身份证反面照片</Text>
                    <View style={[styles.imgBox]}>
                        {
                            this.props.data.idCardValidStatus == 1 && !this.state.data.idBackPhoto ?
                                <Image source={IdCardBack} style={[{width: 500 * basefont,height: 300 * basefont }]}/> :
                                <Image source={ {uri:this.state.data.idBackPhoto} } resizeMode={Image.resizeMode.cover}
                                       style={[{width: 500 * basefont,height: 300 * basefont }]}/>
                        }
                        {
                            this.props.data.idCardValidStatus !== 4 ?
                                <TouchableOpacity style={[styles.camera,estyle.fx1,estyle.fxCenter]}
                                                  onPress={ ()=>{ this.openMenu(2)} }>
                                    <Image source={camera} style={[{width: 120 * basefont,height: 120 * basefont }]}/>
                                </TouchableOpacity> : null
                        }
                    </View>
                </View>
                <ImagePickBotton ref="ImagePickBotton" onImagePick={this.onImagePick}/>
            </View>
        );
    }
}
const basefont = Env.font.base;


const estyle = Env.style;
const styles = StyleSheet.create({
    imgBox: {
        position: 'relative',
        overflow: 'hidden',
        width: 500 * basefont,
        height: 300 * basefont
    },
    camera: {
        position: 'absolute',
        width: 500 * basefont,
        height: 300 * basefont,
        top: 0,
        left: 0,
    }
});

export default MyInfoIdCadePhoto