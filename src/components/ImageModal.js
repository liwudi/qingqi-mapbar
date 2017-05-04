/**
 * Created by linyao on 2016/11/28.
 */
import React, {Component} from 'react';
import {Platform, TouchableOpacity, View, Text, StyleSheet, Modal,Image} from 'react-native';
import ConfirmButton from './ConfirmButton'
import Env from '../utils/Env';
import ModalBox from './widgets/Modal';
import Swiper  from 'react-native-swiper';
const estyle = Env.style;


export default class ImagePickModal extends Component {

    static defaultProps = {
        imgArr:[]
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            index:0
        }
    }

    show(index = 0){
        this.setState({
            visible: true
        }, () => {
            this.refSwiper && this.refSwiper.scrollBy && this.refSwiper.scrollBy(index, false)
        });
    }

    close(){
        this.setState({
            visible: false
        });

    }

    onCancel() {
        this.close();
        this.props.onCancel && this.props.onCancel();
    }

    componentWillReceiveProps(nextProps){
        // if(JSON.stringify(nextProps.imgArr) !== JSON.stringify(this.props.imgArr)){
        //     console.log('imgs reload')
            this.swiper = null;
        // }
    }

    render() {
        const swiper = () => {
            if(!this.swiper){
                let imgsV = this.props.imgArr.map((item,index)=>{
                    return <View key={index} style={[estyle.fxCenter,estyle.fx1]}>
                        <TouchableOpacity onPress={()=>{this.close()}}>
                            <Image resizeMode="contain" source={{uri: item}} style={{width:Env.screen.width,height:Env.screen.height*0.8}} />
                        </TouchableOpacity>
                    </View>
                });
                this.swiper =this.props.imgArr.length === 0 ? null
                    : this.props.imgArr.length === 1 ?
                            <View style={[estyle.fx1,{backgroundColor:Env.color.modalBg}]}>
                                {imgsV}
                            </View>
                            :<Swiper ref={(refSwiper => this.refSwiper = refSwiper)} style={[estyle.cardBackgroundColor]} index={0} >
                                {imgsV}
                            </Swiper>
            }
            return this.swiper;
        };

        return (
            <ModalBox visible={this.state.visible} style={[estyle.fxCenter]} onClose={this.onCancel.bind(this)}>
                {swiper()}
            </ModalBox>
        );
    }
}