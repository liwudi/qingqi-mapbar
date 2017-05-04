/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import { requireNativeComponent, View } from 'react-native';
import Env from '../utils/Env';
const estyle = Env.style;

class MapView extends React.Component {

    constructor(props) {
        super(props);
    }

    _onZoomIn(event) {
        if (!this.props.onZoomIn) {
            return;
        }
        this.props.onZoomIn(event.nativeEvent.zoomIn);
    }

    _onZoomOut(event) {
        if (!this.props.onZoomOut) {
            return;
        }
        this.props.onZoomOut(event.nativeEvent.zoomOut);
    }

    _onZoomMax(event) {
        if (!this.props.onZoomMax) {
            return;
        }
        this.props.onZoomMax(event.nativeEvent.zoomMax);
    }

    _onZoomMin(event) {
        if (!this.props.onZoomMin) {
            return;
        }
        this.props.onZoomMin(event.nativeEvent.zoomMin);
    }

    _onSpan(event) {
        if (!this.props.onSpan) {
            return;
        }
        this.props.onSpan(event.nativeEvent.onSpan);
    }

    _onRotate(event) {
        if (!this.props.onRotate) {
            return;
        }
        this.props.onRotate(event.nativeEvent.rotate);
    }

    _onInit(event) {
        if (!this.props.onInit) {
            return;
        }
        this.props.onInit(event.nativeEvent.init);
    }
    _onSingleClick(event) {
        if (!this.props.onSingleClick) {
            return;
        }
        this.props.onSingleClick(event.nativeEvent.singleClick);
    }

    _onShowBubble(event) {
        if (!this.props.onShowBubble) {
            return;
        }
        this.props.onShowBubble(event.nativeEvent);
    }

    _onAnnotationClick(event) {
        if (!this.props.onAnnotationClick) {
            return;
        }
        this.props.onAnnotationClick(event.nativeEvent.pointId);
    }

    _onLocationChanged(event) {
        if (!this.props.onLocationChanged) {
            return;
        }
        this.props.onLocationChanged(event.nativeEvent);
    }
    _onIconOverlayClick(event){
        if(!this.props.onIconOverlayClick){return;}
        this.props.onIconOverlayClick(event.nativeEvent.pointIconOverlayId);
    }
    render() {
        return <RCTMapView {...this.props}
                           style={[estyle.containerBackgroundColor, estyle.fx1]}
            onZoomIn={this._onZoomIn.bind(this)}
            onZoomOut={this._onZoomOut.bind(this)}
            onZoomMax={this._onZoomMax.bind(this)}
            onZoomMin={this._onZoomMin.bind(this)}
            onSpan={this._onSpan.bind(this)}
            onRotate={this._onRotate.bind(this)}
            onInit={this._onInit.bind(this)}
            onSingleClick={this._onSingleClick.bind(this)}
            onShowBubble={this._onShowBubble.bind(this)}
            onAnnotationClick={this._onAnnotationClick.bind(this)}
            onLocationChanged={this._onLocationChanged.bind(this)}
            onIconOverlayClick={this._onIconOverlayClick.bind(this)}
                           forbidGesture={true}
            />;
    }
}

MapView.name = 'MapView';
MapView.propTypes = {
    useBuiltInControl: PropTypes.bool,
    zoomLevel: PropTypes.number,
    worldCenter: PropTypes.object,
    forbidGesture: PropTypes.bool,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func,
    onZoomMax: PropTypes.func,
    onZoomMin: PropTypes.func,
    onRotate: PropTypes.func,
    onSpan: PropTypes.func,
    onInit: PropTypes.func,
    onSingleClick: PropTypes.func,
    onShowBubble: PropTypes.func,
    onAnnotationClick: PropTypes.func,
    onLocationChanged: PropTypes.func,
    onIconOverlayClick: PropTypes.func,
    ...View.propTypes
}

var RCTMapView = requireNativeComponent('MapView', MapView, {
    nativeOnly: { onChange: true }
});

module.exports = MapView;