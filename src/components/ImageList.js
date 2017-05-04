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
import ImagePickButton from './ImagePickButton';
import ImageModal from './ImageModal'
import { IconMinus , IconPlusCircle,IconTimesCirle } from './Icons';
import { fileUpLoad } from '../services/AppService';
const estyle = Env.style;

/**
 * prop配置参数
 * title string 列表左侧的文字
 * type string  edit or show 为edit的时候会显示后面的添加删除按钮
 * data Array  []里是每一个图片的uri 展示的模式下 应该传入data  edit模式不需要
* */
export default class ImageList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            alertCActive:false,
            imgArr: [],
            smallImgArr:[],
            isUpLoading:false
        }
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.data === undefined) return false;
    //     this.setState({
    //         imgArr: nextProps.data
    //     })
    // }

    //添加图片
    pushImg(obj){
        let arr= this.state.imgArr,smallArr=this.state.smallImgArr;
        this.setState({isUpLoading:true},()=>{
            fileUpLoad(obj)
                .then((data)=>{
                    data.fullPath && arr.push(data.fullPath);
                    obj.path && smallArr.push(obj.path);
                    this.setState({imgArr:arr,smallImgArr:smallArr},()=>{this.props.onChange(this.state.imgArr)});
                })
                .catch(()=>{
                    Toast.show('文件上传失败', Toast.SHORT);
                })
                .finally(()=>{
                    this.setState({isUpLoading:false})
                })
        })
    }
    //删减图片
    minusImg(url,localUrl){
        let arr= [],smallArr=[];
        this.state.imgArr.forEach((item)=>{
            if(item !== url){
                arr.push(item)
            }
        });
        this.state.smallImgArr.forEach((item)=>{
            if(item !== localUrl){
                smallArr.push(item)
            }
        });
        this.setState({imgArr:arr,smallImgArr:smallArr},()=>{this.props.onChange(this.state.imgArr)});
    }

    //图片缩略图
    smallImgList(){
        let arr = this.props.type == 'edit' ? this.state.smallImgArr : this.props.data;
        if( arr.length === 0) return null;
        return (
            arr.map((item,index)=>{
                return (
                        <View key={index} style={[estyle.padding]}>
                            {
                                item ? <TouchableOpacity  onPress={()=>{this.showBigImg(index)}}>
                                    <Image resizeMode="contain" source={{uri:item}} style={[{width:Env.font.base * 54,height:Env.font.base * 96,marginHorizontal:10*Env.font.base}]} />
                                </TouchableOpacity> : <View/>
                            }
                            {
                                this.props.type === 'edit' ?
                                    <TouchableOpacity style={{position:'absolute',top:0,right:0}} onPress={()=>{
                                        Alert.alert(
                                            '删除图片',
                                            '确认删除该图片?',
                                            [
                                                {text: '确认', onPress: () => {this.minusImg(this.state.imgArr[index],item) } },
                                                {text: '取消', onPress: () => console.log('OK Pressed!')},
                                            ]
                                        )
                                    }}>
                                        <IconTimesCirle size={Env.font.text} color="red" />
                                    </TouchableOpacity> :
                                    <View/>
                            }
                        </View>
                    )
            })
        )
    }
    //查看大图
    showBigImg(index){
        this.refs.imageModal.show(index);
    }

    render (){
        let swiperData= this.props.type == 'edit' ? this.state.smallImgArr : this.props.data;
        return (
            <View>
                <ViewForRightDom
                    rightDom={
                        this.props.type === 'edit' ?
                        <View style={[estyle.fxRow,estyle.fx1,estyle.fxCenter]}>
                            <TouchableOpacity style={estyle.topBtn}
                                              onPress={ ()=>{
                                                  if(!this.state.isUpLoading && this.state.smallImgArr.length < 6){
                                                      this.refs.ImagePickButton.show();
                                                  }else if(this.state.smallImgArr.length>=6){
                                                      Toast.show('最多可添加6张图片', Toast.SHORT);
                                                  }else {
                                                      Toast.show('上传文件中，请稍后再试', Toast.SHORT);
                                                  }
                                              }}><IconPlusCircle/></TouchableOpacity>
                        </View> : <View/>
                    }
                >
                    <View style={[estyle.fxRow,estyle.fxRowCenter,{flexWrap:'wrap' }]}>
                        <Text style={[estyle.text]}>{this.props.title}</Text>
                        {this.smallImgList.bind(this)()}
                    </View>
                </ViewForRightDom>
                <ImagePickButton ref="ImagePickButton"
                                onImagePick={(imageSource)=>{this.pushImg(imageSource) }}
                                 onCancel={()=>{ this.setState({alertCActive:false}) }} />
                <ImageModal ref="imageModal" imgArr={swiperData}/>
            </View>
        );
    }


}