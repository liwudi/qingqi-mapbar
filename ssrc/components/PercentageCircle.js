/**
 * Created by linyao on 2016/10/14.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const styles = StyleSheet.create({
    circle: {
        overflow: 'hidden',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3e3e3'
    },
    leftWrap: {
        overflow: 'hidden',
        position: 'absolute',
        top: 0
    },
    rightWrap: {
        position: 'absolute'

    },

    loader: {
        position: 'absolute',
        left: 0,
        top: 0,
        borderRadius: 1000,

    },

    innerCircle: {
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 11,
        color: '#888',

    },
});

/**
* 目前开放的配置： (类型  说明  默认值)
 * percent: number 百分比 外层进度条 默认 0
 * radius: number 半径 默认 50
 * borderWidth : number 进度条宽度 默认 1
 * color: string 进度条颜色 默认 #3498db
 * padding： number 进度条与内容部分之间的区域的宽度 默认 0
 * paddingColor: string padding的颜色 默认 #fff
 * bgColor: string 内容区的背景色
 * disabled : bool 禁用模式 灰色的圆块
 * disabledText：string 禁用模式提示的信息
* */


class PercentageCircle extends Component {
    constructor(props) {
        super(props);
        let percent = this.props.percent;
        let leftTransformerDegree = '0deg';
        let rightTransformerDegree = '0deg';
        if (percent >= 50) {
            rightTransformerDegree = '180deg';
            leftTransformerDegree = (percent - 50) * 3.6 + 'deg';
        } else {
            rightTransformerDegree = percent * 3.6 + 'deg';
        }

        this.state = {
            percent: this.props.percent || 0,
            borderWidth: this.props.borderWidth < 1 || !this.props.borderWidth ? 1 : this.props.borderWidth,
            leftTransformerDegree: 0 + 'deg',
            rightTransformerDegree: 0 + 'deg'
        };
    }


    componentDidMount() {
        let percent = this.props.percent;
        let leftTransformerDegree = 0;
        let rightTransformerDegree = 0;
        if (percent >= 50) {
            rightTransformerDegree = 180;
            leftTransformerDegree = (percent - 50) * 3.6;
        } else {
            rightTransformerDegree = percent * 3.6;
        }
        // this.setState({
        //     percent: this.props.percent,
        //     borderWidth: this.props.borderWidth < 2 || !this.props.borderWidth ? 2 : this.props.borderWidth,
        //     leftTransformerDegree: leftTransformerDegree,
        //     rightTransformerDegree: rightTransformerDegree
        // });
        let speed=3, right=0, left=0;
        if(percent >=50){
            this.timer=setInterval(()=>{
                if(right <= rightTransformerDegree){
                    this.setState({
                        rightTransformerDegree:right+'deg'
                    });
                    right += speed;
                }else {
                    if(left <= leftTransformerDegree){
                        this.setState({
                            leftTransformerDegree:left+'deg'
                        });
                        left += speed;
                    }else {
                        clearInterval(this.timer)
                    }
                }
            },1000/60)
        }else {
            this.timer=setInterval(() => {
                if(right <= rightTransformerDegree){
                    this.setState({
                        rightTransformerDegree:right+'deg'
                    });
                    right += speed;
                }else {
                    clearInterval(this.timer)
                }
            },1000/60)
        }
    }

    render() {
        let radius = this.props.radius || 50;
        let padding = this.props.padding || 0;
        if (this.props.disabled) {
            return (
                <View style={[styles.circle,{
          width:radius*2,
          height: radius*2,
          borderRadius:radius
        }]}>
                    <Text style={styles.text}>{this.props.disabledText}</Text>
                </View>
            );
        }
        return (
            <View style={[styles.circle,{
        width:radius*2,
        height: radius*2,
        borderRadius:radius
      }]}>
                <View style={[styles.leftWrap,{
          width: radius,
          height: radius * 2,
          left:0,
        }]}>
                    <View style={[styles.loader,{
            left: radius,
            width:radius,
            height: radius*2,
            borderTopLeftRadius:0,
            borderBottomLeftRadius:0,
            backgroundColor:this.props.color || '#3498db',
            transform:[{translateX:-radius/2},{rotate:this.state.leftTransformerDegree},{translateX:radius/2}],
          }]} />
                </View>
                <View style={[styles.leftWrap,{
          left:radius,
          width: radius,
          height: radius * 2,
          left:radius,
        }]}>
                    <View style={[styles.loader,{
            left:-radius,
            width:radius,
            height: radius*2,
            borderTopRightRadius:0,
            borderBottomRightRadius:0,
            backgroundColor:this.props.color || '#3498db',
            transform:[{translateX:radius/2},{rotate:this.state.rightTransformerDegree},{translateX:-radius/2}],
          }]} />
                </View>
                <View style={[styles.innerCircle,{
              width:(radius - this.state.borderWidth)*2,
              height:(radius - this.state.borderWidth)*2,
              borderRadius:radius - this.state.borderWidth,
              backgroundColor: this.props.paddingColor || '#fff'
            }]}>
                    <View style={[styles.innerCircle,{
              width:(radius - this.state.borderWidth -padding)*2,
              height:(radius - this.state.borderWidth -padding)*2,
              borderRadius:radius - this.state.borderWidth - padding,
              backgroundColor: this.props.bgColor || '#fff'
            }]}>
                        <View>
                            {this.props.children}
                        </View>
                    </View>
                </View>


            </View>
        );

    }

}
;

module.exports = PercentageCircle;