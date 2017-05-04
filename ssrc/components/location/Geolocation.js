/**
 * Created by admin on 2017/2/20.
 */
import {NetInfo} from 'react-native';
import Coord from './Coord';
import {fetchLocation, stopLocation} from './FetchLocation';
import {getInverseGeocoding} from '../../services/GeoService';
let coords = null, fetching;

function stopFetch() {
    fetching && stopLocation();
    fetching = false;
    console.info('geo-stop', coords)
}
NetInfo.isConnected.fetch().done(processer);
NetInfo.addEventListener('change', processer);

function processer (isConnected) {
    isConnected = typeof isConnected === 'string' ? isConnected.toUpperCase() !== 'NONE' : isConnected;
    if(isConnected && !coords && !fetching) {
        global.NetIsConnected = isConnected;
        fetching = true;
        console.info('geo-init')
        fetchLocation().then((_coords) => {
            console.info('geo-get')
            let ll = Coord.wgs84togcj02(Math.abs(_coords.longitude),Math.abs(_coords.latitude));
            coords = {longitude: ll[0], latitude: ll[1]};
            return coords;
        }).then((data) => {
            getInverseGeocoding(data.longitude, data.latitude).then((result={resultCode: 100}) => {
                if(!result.resultCode) {
                    console.info('geo-inverse')
                    coords = Object.assign(result, data);
                    global.locationInfo = coords;
                }
            }, (error) => {}).finally(() => {
                NetInfo.removeEventListener('change', processer);
            });
        }).finally(stopFetch);
        setTimeout(stopFetch, 60 * 1000);   //N秒之后停止定位
    }
}

export function geolocation () {
    return new Promise((resolve, reject) => {
        coords ? resolve(coords) : reject()
    });
}