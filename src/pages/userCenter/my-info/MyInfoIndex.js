/**
 * Created by linyao on 2017/4/14.
 */
import React, {Component} from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import authentication from '../../../assets/images/authentication.png';
import Authentication2 from '../../../assets/images/Authentication2.png';
import MyInfo from './MyInfo';


export default class MyInfoIndex extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    goto(page){
        this.props.router.push(page);
    }
    render(){
        return(
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="资料认证"/>
                <View style={[estyle.fxRow,{marginTop: 100 * basefont}]}>
                    <View style={[estyle.fx1,estyle.fxCenter]}>
                        <TouchableOpacity style={[estyle.fxCenter]} onPress={()=>{this.goto(MyInfo)}}>
                            <Image source={authentication} style={styles.img} />
                            <Text style={[estyle.articleTitle,estyle.marginTop]}>陆鲸认证</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[estyle.fx1,estyle.fxCenter]}>
                        <TouchableOpacity style={[estyle.fxCenter]}>
                            <Image source={Authentication2} style={styles.img} onPress={()=>{}} />
                            <Text style={[estyle.articleTitle,estyle.marginTop]}>货车帮认证</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const basefont = Env.font.base;
const estyle = Env.style;
const styles = StyleSheet.create({
    img:{
        width: 120 * basefont,
        height: 120 * basefont
    }
});