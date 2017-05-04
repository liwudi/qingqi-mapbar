/**
 * Created by linyao on 2016/10/13.
 */
import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, PanResponder} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import Env from '../utils/Env';
const color = Env.button.color.cancel;

export default class ColorButton extends Component {
    styles = null;
    size = (this.props.size || Env.font.navTitle) * 1.2;
    width = this.size * 5;
    constructor(props) {
        super(props);
        this.state = {
            fullStarNum: -1
        };
        this.styles = StyleSheet.create({
            container: {
                flexDirection: 'row',
                height: this.size,
                width: this.width
            }
        });
    }

    _startX = 0;
    componentWillMount() {
        this._panResponder = PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt) => {
                this._startX = evt.nativeEvent.pageX;
                this._onPress(evt);
            },
            onPanResponderMove: this._onPress,
        });
    }

    _onPress = (evt) => {
        this.setState({
            fullStarNum: Math.floor((evt.nativeEvent.locationX + (evt.nativeEvent.pageX - this._startX)) / this.size)
        },()=>{
            let score= this.state.fullStarNum;
            if(score >4 ) score=4;
            this.props.onChange( score<0 ? '' : score+1);
        })
    }
    getStars () {
        let score = 5,
            color = Env.vector.star.color.highlight,
            startArr= new Array(score),
            startBox= [],
            name = 'star';
        if(startArr.length > 0){
            startBox = startArr.fill(0).map((item,idx)=>{
                let dom;
                if(idx <= this.state.fullStarNum){
                    dom=<Icon name="star" size={this.props.size} color={color} />
                }else {
                    dom=<Icon name="star-o" size={this.props.size} color={color} />
                }
                return <View style={[Env.style.fx1]} activeOpacity={1} key={idx} onPress={this._onPress.bind(this,idx)}>{dom}</View>
            });
        }
        return startBox;
        
    }


    render() {
        // let size = Env.button.size[this.props.type || 'middle'];
        return (
            <View>

                <View style={[this.styles.container,{position:'relative'}]} >
                    {this.getStars()}
                </View>
                <View style={[this.styles.container,{position:'absolute',top:0,backgroundColor:'rgba(0,0,0,0)'}]} {...this._panResponder.panHandlers}>
                </View>
            </View>

        );
    }
}


