/**
 * Created by linyao on 2016/10/19.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,Animated,Easing,TouchableOpacity
} from 'react-native';
import Env from '../utils/Env';
import { IconCircle }from  './Icons';

const estyle= Env.style;

class Circle extends Component {
    constructor(props) {
        super(props);
        this.state = {
           deg: new Animated.Value(0),
           showBall: true 
        };
    }


    componentDidMount() {

    }

    animate(){
        Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
            this.state.deg,                 // 将`bounceValue`值动画化
            {
                toValue: 1,                         // 将其值以动画的形式改到一个较小值
                duration:3000,
                easing: Easing.linear
            }
        ).start(()=>{
            this.setState({
                showBall:false
            });
        });
    }

    _onPress(){
        this.props.onPress();
        this.setState({
            deg: new Animated.Value(0),
            showBall:true
        }, this.animate)
    }

    render() {
        let radius = this.props.radius || 50;
        let font= (radius*2+50)*basefont;
        return (
            <TouchableOpacity activeOpacity={.8} onPress={this._onPress.bind(this)}>
                <View style={[estyle.fxCenter,{width:font,height:font}]}>
                    <View style={[styles.circle,{
                              width:radius*2*basefont ,
                              height: radius*2 *basefont,
                              borderRadius:1000}]}>
                        {this.props.children}
                    </View>
                    <View style={[styles.ball ,styles.circleBox, {width: font - 10,height:font - 10,top: 5,left:5,overflow:'visible',borderRadius:1000}]} />
                    <Animated.View
                        style={[styles.ball , {width: font,height:font,top: 0,left:0,overflow:'visible',transform:[{ rotate: this.state.deg.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        '0deg', '1440deg'
                      ]
                    })}]}]} >
                        <View style={{opacity: this.state.showBall ? 1 : 0 , width:10,height:10, backgroundColor: '#fff', position:'absolute',borderRadius:10,left:font/2 - 5,top:0,zIndex:100}}/>
                    </Animated.View >
                </View>
            </TouchableOpacity>
        );
    }
}

const basefont = Env.font.base;
const styles = StyleSheet.create({
    circleBox : {
        borderWidth: 2 * basefont,
        borderStyle: 'dotted',
        borderColor: '#fff'
    },
    circle: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3e3e3'
    },
    ball: {
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0)'
    }
});


export default Circle;