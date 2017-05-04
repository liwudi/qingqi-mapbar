import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    NativeModules
} from 'react-native';

const module = NativeModules.MapbarMapModule;

export function stopLocation () {
    module.stopLocation();
}
export function fetchLocation () {
    console.info('fetchLocation-android')
    module.startLocation();
    return new Promise((resolve, reject) => {
        console.info('toFetch-android')
        console.info('fetchLocation-gcoords')
        DeviceEventEmitter.addListener('receiveLocationData', (event={}) => {
            console.info('geo-android', event)
            let _coords = event;
            if(_coords.longitude && _coords.latitude) {
                resolve(_coords);
            } else {
                reject();
            }
        });
    });
}