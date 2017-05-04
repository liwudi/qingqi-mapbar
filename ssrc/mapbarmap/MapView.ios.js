import React, { Component } from 'react';
import { View,requireNativeComponent } from 'react-native';
import Env from '../utils/Env';
const estyle = Env.style;

export default class MapView extends React.Component {
    // 与OC中 RCTViewManager子类中导出的属性对应

    static propTypes = {
        value:                      React.PropTypes.number,
        isTest1:                    React.PropTypes.bool,
        num:                        React.PropTypes.number,
        infoDict:                   React.PropTypes.object,
        annotationDtas:                React.PropTypes.array,
        showUserLocation:           React.PropTypes.bool,
        annotation:                 React.PropTypes.object,
        zoomLevel:                  React.PropTypes.number,
        forbidGesture:              React.PropTypes.bool,
        mapCenter:                React.PropTypes.object,

        onIconOverlayClick:      React.PropTypes.func,
        onAnnotationClick:       React.PropTypes.func,
        onZoom:                  React.PropTypes.func,
        onSpan:                  React.PropTypes.func,
        onTap:                   React.PropTypes.func,
        onRotation:              React.PropTypes.func,
        onInit:                  React.PropTypes.func,
        onZoomOut:                 React.PropTypes.func,
        onZoomIn:                  React.PropTypes.func,
        // annotations:React.PropTypes.arrayOf(React.PropTypes.shape({
        //     latitude: React.PropTypes.number.isRequired,
        //     longitude: React.PropTypes.number.isRequired,
        //     title:React.PropTypes.string,
        //     imageName:React.PropTypes.string,
        //
        //
        // })),
        // latitude:                   React.PropTypes.number,
        // longitude:                  React.PropTypes.number,
        // title:                      React.PropTypes.string,
        // subtitle:                      React.PropTypes.string,
        // imageName:                      React.PropTypes.string,

    };

    componentDidMount() {

        console.log("MyView被加载了");
    }

    render() {
        return(
            <RCTMapView
                {...this.props}
                style={[estyle.fx1]}
                onAnnotationClick = {(event)=> {this.props.onIconOverlayClick(event.nativeEvent.pointId);}}
                onIconOverlayClick = {(event)=> {this.props.onIconOverlayClick(event.nativeEvent.pointId);}}
                onTap = {()=>{}}
                onZoom = {()=>{}}
                onZoomOut = {(e)=>{
                    this.props.onZoomOut(e.nativeEvent.zoomLevel);
                }}
                onZoomIn = {(e)=>{
                    this.props.onZoomIn(e.nativeEvent.zoomLevel);
                }}
                forbidGesture={false}
                mapCenter={this.props.worldCenter}
            >
            </RCTMapView>
        );
    }
}
/**
 //这个文件中,凡是用到RCTMyView的地方,应该与OC中
 //RCTViewManager子类中RCT_EXPORT_MODULE()括号中的参数一致,
 //如果没有参数,应为RCTViewManager子类的类名去掉manager
 */
var RCTMapView = requireNativeComponent('RCTMapView', MapView);
