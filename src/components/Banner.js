/**
 * Created by linyao on 2017/4/10.
 */
import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Navigator,Image
} from 'react-native';

import Swiper from 'react-native-swiper';
import Env from '../utils/Env';
const estyle = Env.style;


export default class Error extends React.Component{
    render (){
        return (
             <View {...this.props} >
                 <Swiper style={{backgroundColor:'red'}} height={300*basefont}>
                     <View style={styles.slide}>
                         <Text style={styles.text}>第1页</Text>
                     </View>
                     <View style={styles.slide}>
                         <Text style={styles.text}>第2页</Text>
                     </View>
                     <View style={styles.slide}>
                         <Text style={styles.text}>第3页</Text>
                     </View>
                 </Swiper>
             </View>
        );
    }
}

const basefont = Env.font.base;

const styles = StyleSheet.create({
    wrapper: {
        height:300 * basefont,
        backgroundColor:'black',
        zIndex:100
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300 * basefont
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})