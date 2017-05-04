import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    NativeModules
} from 'react-native';

let opts = {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000};
export function stopLocation () {}

export function fetchLocation () {
    console.info('fetchLocation-ios')
    return new Promise((resolve, reject) => {
        console.info('toFetch-ios')
        navigator.geolocation.getCurrentPosition(
            (position={}) => {
                let _coords = position.coords || {};
                console.info('geo-ios', _coords)
                if(_coords.longitude && _coords.latitude) {
                    resolve(_coords);
                } else {
                    reject();
                }
            },
            reject, opts
        );
    });
}