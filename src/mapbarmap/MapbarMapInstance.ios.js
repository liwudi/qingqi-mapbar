/**
 * Created by cryst on 2016/11/13.
 */

import React, {Component} from "react";
import {
    NativeModules,
    findNodeHandle
} from "react-native";

const module = NativeModules.MapViewManager;
let mapRef = null;
const e = 100000;
/*
* point=[lng, lat]
* */
export function MPoint(point) {
    let pt = {
        longitude: parseInt(point[0] * e),
        latitude: parseInt(point[1] * e)
    };
    return pt;
}
function getLonLat(opts) {
    let arr = [];
    opts.forEach((v) => {
        if(v.longitude && v.latitude) {
            arr.push(v);
        }
    });
    return arr;
}
export class Marker {
    /**opts=[{
    *   latitude: 1, longitude: 2, id:1, offsetX:12, offsetY:12, click:true, imageName:'',
    *   iconTextColor:'red', iconText:'text', iconTextSize:12,title:'tt',callOut:false
    * }]
     * */
    /*添加标注*/
    static add = (opts) => {
        if(mapRef === null) return;
        let arr = getLonLat(opts);
        arr.length && module.addAnnotations(
            mapRef, arr
        )
    }
    /**opts=[{
    *   latitude: 1, longitude: 2, id:1, offsetX:12, offsetY:12, imageName:'',
    *   iconTextColor:'red', iconText:'text', iconTextSize:12,title:'tt'
     * */
    static update = (opts) => {
        if(mapRef === null) return;
        opts.map((item) => {
            module.refreshAnnotationLocation(mapRef,
                Object.assign({}, item));
        });
    }
    /**opts=[{
    *   id:1, offsetX:12, offsetY:12, imageName:''
    * }]
     * */
    static updateIcon = (opts) => {
        if(mapRef === null) return;
        opts.map(item => {
            module.setIcon(
                mapRef, item
            );
        });

    }

    /*
     opts=[1,2,3]
     id数组
     * */
    static remove = (opts) => {
        if(mapRef === null) return;
        module.removeAnnotation(
            mapRef, opts
        );
    }
    static clear = () => {
        remove([-1]);
    }
}
export class MarkerRotate {
    /**opts=[{
    *   latitude: 1, longitude: 2, id:1,click:true, imageName:'',
    *   direction: 45
    * }]
     * */
    static add = (opts) => {
        if(mapRef === null) return;
        let arr = getLonLat(opts);
        arr.length && module.setIconOverlayIcons(
            mapRef, arr
        );
    }
    /**opts=[{
    *   latitude: 1, longitude: 2, id:1,imageName:'',
    *   direction: 45
    * }]
     * */
    static update = (opts) => {
        if(mapRef === null) return;
        opts.map((item) => {
            module.refreshIconOverlayLocation(mapRef, item);
        });
    }
    /**opts=[{
    *   id:1, imageName:''
    * }]
     * */
    static updateIcon = (opts) => {
        if(mapRef === null) return;
        module.setIconOverlayIcon(
            mapRef, opts
        );
    }
    /**opts=[{
    *   id:1, direction:45
    * }]
     * */
    static updateDirection = (opts) => {
        if(mapRef === null) return;
        module.setIconOverlayDirection(
            mapRef, opts
        );
    }
    /*
     opts=[1,2,3]
     id数组
     * */
    static remove = (opts) => {
        if(mapRef === null) return;
        module.removeIconOverlay(
            mapRef, opts
        );
    }
    static clear = () => {
        remove([-1]);
    }
}

export class Line {
    /**
     * opts=[{
     *      isClose:true, width: '1', strokeColor:'red', outlineColor:'red', lineId:1,
     *      locations: [{latitude: 1, longitude: 2}]
     * }]
     * */
    static add = (opts) => {
        if(mapRef === null) return;
        //console.info(opts)
        opts.map((item) => {
            item.width = +item.width;
            item.outlineColor = item.outlineColor.replace('#', '');
            item.strokeColor = item.strokeColor.replace('#', '');

            //console.info(mapRef,  item)
            module.addLine(mapRef, item);
        });
    }
    /**
     * opts=[1,2,3,4] id数组
     * */
    static remove = (opts) => {
        if(mapRef === null) return;
        module.deleteLine(mapRef, opts)
    }
    static clear = () => {
        if(mapRef === null) return;
        module.deleteLine(mapRef);
    }
    /**
     * opts=[{
     *      line: [], color:'red', width:'20', lineId:1
     * }]
     * */
    static update = (opts) => {
        if(mapRef === null) return;
        module.updateLine(mapRef, opts);
    }
}



/**************************地图方法**************************/
export function initMap(ref) {
    //console.info(module, '**************************', ref)
    setMapRef(findNodeHandle(ref));
}
export function getMapRef() {
    return mapRef;
}
export function setMapRef(ref) {
    //console.info('setMapRef--------------------', ref,mapRef)
    mapRef = ref;
}

export function finalize () {
    if(mapRef === null) return;
    module.onDestroyMap(mapRef);
    mapRef = null;
}

/**
 * opts={
 *      longitude: 1,
 *      latitude: 1
 * }
 * */
export function setCenter(opts) {
    if(mapRef === null) return;
    module.setWorldCenter(mapRef, opts);
}
export function setZoomLevel(zoom) {
    if(mapRef === null) return;
    module.setZoomLevel(mapRef, zoom);
}
export function getZoomLevel() {
    if(mapRef === null) return;
    return module.getZoomLevel(mapRef);
}
export function zoomIn() {
    if(mapRef === null) return;
    module.setZoomIn(mapRef);
}
export function zoomOut() {
    if(mapRef === null) return;
    module.setZoomOut(mapRef);
}

const MIN_LNG = 72.5,
    MIN_LAT = 10.5,
    MAX_LNG = 135.05,
    MAX_LAT = 53.55;
export function getBounds() {
    if(mapRef === null) return;
    return module.getWorldRect(mapRef).then(bounds => {
        let minlng = +bounds.minLongitude / e,
            minlat = +bounds.minLatitude / e,
            maxlng = +bounds.maxLongitude / e,
            maxlat = +bounds.maxLatitude / e;
        let _bounds = {
            minLongitude: minlng < MIN_LNG ? MIN_LNG : minlng,
            minLatitude: minlat < MIN_LAT ? MIN_LAT : minlat,
            maxLongitude: maxlng > MAX_LNG ? MAX_LNG : maxlng,
            maxLatitude: maxlat > MAX_LAT ? MAX_LAT : maxlat
        }
        console.info('getBounds', bounds);
        return _bounds;
    });
}

/**
 * opts={
 *      minLongitude: 1,
 *      minLatitude: 1,
 *      maxLongitude: 1,
 *      maxLatitude: 1
 * }
 * */
let diff = 0;
export function setBounds(pt1, pt2) {
    if(mapRef === null) return;
    let p1lat = pt1.latitude,
        p1lng = pt1.longitude,
        p2lat = pt2.latitude,
        p2lng = pt2.longitude;
    module.fitWorldArea(mapRef, {
        minLongitude: Math.min(p1lng, p2lng) - diff,
        minLatitude: Math.min(p1lat, p2lat) - diff,
        maxLongitude: Math.max(p1lng, p2lng) + diff,
        maxLatitude: Math.max(p1lat, p2lat) + diff
    });
    setTimeout(() => {
        getZoomLevel().then((level) => {
            level = Math.floor(level);
            setZoomLevel(level);
        });
    }, 300);
}
export function pause() {
 //   module.setForbidGesture(mapRef, true);
    //module.onPauseMap(mapRef);
}
export function resume() {
//    module.setForbidGesture(mapRef, false);
    //module.onResumeMap(mapRef);
}
export function clearOverlays() {
    if(mapRef === null) return;
    module.removeAllOverlayAndAnnotation(mapRef);
}
export function disposeMap (ref=null) {
    if(mapRef === null) return;
    setMapRef(ref);
    pause();
    clearOverlays();
    finalize();
    console.info('dispose', mapRef);
    mapRef = null;
}
