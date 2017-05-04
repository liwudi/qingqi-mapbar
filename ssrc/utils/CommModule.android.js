/**
 * Created by ligj on 2016/10/10.
 */
import commonAndroid from '../components/CommonModule';
import { BackAndroid, Alert, NativeModules } from 'react-native';

export function addEventSystemBack(bindFun) {
	BackAndroid.addEventListener('hardwareBackPress', () => bindFun(BackAndroid.exitApp));
}
export function logOutKefu(accountId) {
    commonAndroid.logOutKefu(accountId);
}
export const startKefuActivity = commonAndroid.startKefuActivity;


export const pushModule = NativeModules.MarbarPushModule;