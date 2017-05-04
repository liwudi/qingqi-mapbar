/**
 * Created by cryst on 2016/10/11.
 */
import React, {Component} from 'react';
import {Platform, TouchableHighlight, View, Text, StyleSheet, Modal} from 'react-native';

import Env from '../utils/Env';
import ModalBox from './widgets/Modal';
import ConfirmButton from './ConfirmButton'
import CancelButton from './CancelButton';
import Toast from './Toast';
const estyle = Env.style;
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'react-native-fetch-blob';
import * as ImagePicker from 'react-native-image-picker';
//https://github.com/marcshilling/react-native-image-picker

let options = {
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    // cancelButtonTitle: '取消',
    // title:'222',
    // takePhotoButtonTitle:'344',
    // chooseFromLibraryButtonTitle:'ddd'
};

export default class ImagePickButton extends Component {

    static defaultProps = {
        maxHeight: 500,
        maxWidth: 500
    };

    constructor(props) {
        super(props);
        this.state = {
            visible:false
        }
    }

    show = () => {
        this.setState({
            visible: true
        })
    }

    close = () => {
        this.setState({
            visible: false
        })
    }

    _getImage = (response) => {
        this.close();
        if (response.didCancel) {
        }
        else if (response.error) {
            Toast.show('获取图像失败', Toast.SHORT);
        }
        else {
            response.path = response.path  || response.uri;
            ImageResizer.createResizedImage(response.path, this.props.maxWidth, this.props.maxHeight, 'JPEG', 100, 0)
                .then((resizedImageUri) => {
                    RNFetchBlob.fs.readFile(resizedImageUri, 'base64')
                        .then((data) => {
                            response.uri = resizedImageUri;
                            this.props.onImagePick && this.props.onImagePick({
                                ...response,
                                path: resizedImageUri,
                                data: data,
                                //type:'image/jpeg',
                                fileName: `IMG_${new Date().getTime()}.JPG`
                            });
                        });
                }).catch((err) => {
                    Toast.show('获取图像失败', Toast.SHORT);
                });
        }
    }

    launchCamera = () => {
        ImagePicker.launchCamera(options, this._getImage);
    }

    launchImageLibrary = () => {
        ImagePicker.launchImageLibrary(options, this._getImage);
    }

    render() {
        return (
            <ModalBox visible={this.state.visible} style={{zIndex:999}} onClose={() => {}}>
                <View style={[estyle.fx1]}/>
                <View style={[estyle.cardBackgroundColor, estyle.padding, estyle.fxColumn]}>
                    <View style={[ estyle.fxCenter, estyle.paddingTop]}>
                        <ConfirmButton size="large" style={[estyle.marginTop]} onPress={this.launchCamera}>拍照</ConfirmButton>
                        <ConfirmButton size="large" style={[estyle.marginTop]} onPress={this.launchImageLibrary}>从相册选择</ConfirmButton>
                        <CancelButton size="large" style={[estyle.marginTop]}  onPress={this.close}>取消</CancelButton>
                    </View>
                </View>
            </ModalBox>
        );
    }
}