package com.mapbar.react.map.operation;

import android.location.Address;
import android.location.LocationListener;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.text.TextUtils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.mapbar.android.location.AsyncGeocoder;
import com.mapbar.android.location.LocationClient;
import com.mapbar.android.location.LocationClientOption;
import com.mapbar.react.LogUtils;
import com.mapbar.react.map.MapbarMapModule;

import java.util.List;
import java.util.Locale;

/**
 * Created by Administrator on 2016/11/2.
 */

public class Location {
    private static String TAG = "Location";
    private static LocationClient mLocationClient;
    private static final long gpsExpire = 1500;// gps失效时间 毫秒
    private static final int resultType = 0;
    private static int count = 0;// 定位次数
    private static int priority = LocationClientOption.LocationMode.GPS_FIRST;
    private static final String receiveLocationData = "receiveLocationData";

    /**
     * 初始化定位
     */
    public static void initLocation() {
        try {
            if (mLocationClient == null) {
                MyLocationListen myLocationListen = new MyLocationListen();
                mLocationClient = new LocationClient(MapbarMapModule.getReactContext().getApplicationContext());
                LocationClientOption option = new LocationClientOption();
                option.setPriority(priority);
                option.setScanSpanGPS(15000);// 设置GPS定位最小间隔时间
                option.setGpsExpire(gpsExpire);// 设置GPS定位失效时间
                option.setScanSpanNetWork(15000);// 设置基站定位最小间隔时间
                option.setResultType(resultType);// 默认返回逆地理信息
                mLocationClient.setOption(option);
                mLocationClient.addListener(myLocationListen);
            }
            mLocationClient.start();
            LogUtils.logd(TAG, LogUtils.getThreadName() + "-------开始定位---");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static class MyLocationListen implements LocationListener {

        @Override
        public void onLocationChanged(android.location.Location location) {
            if (location != null) {
                count++;
                LogUtils.logd(TAG, LogUtils.getThreadName() + "location:" + location);
                double latitude = location.getLatitude();
                double longitude = location.getLongitude();
                if (location.getExtras() != null) {
                    Bundle bundle = location.getExtras();
                    String address = bundle.getString("address");
                    String city = bundle.getString("city");
                    if (!TextUtils.isEmpty(address)) {
                        resolve(latitude, longitude, address, city);
                    } else {
                        getInverse(latitude, longitude);
                    }
                } else {
                    getInverse(latitude, longitude);
                }
            }
        }


        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
            LogUtils.logd(TAG, LogUtils.getThreadName() + "status:" + status + "extras:" + extras);
        }

        @Override
        public void onProviderEnabled(String provider) {
            LogUtils.logd(TAG, LogUtils.getThreadName() + "provider:" + provider);
        }

        @Override
        public void onProviderDisabled(String provider) {
            LogUtils.logd(TAG, LogUtils.getThreadName() + "provider:" + provider);
        }
    }

    private static void resolve(double latitude, double longitude, String address, String city) {
        WritableMap params = Arguments.createMap();
        params.putDouble("latitude", latitude);
        params.putDouble("longitude", longitude);
        params.putString("address", address);
        params.putString("city", city);
        LogUtils.logd(TAG, LogUtils.getThreadName() + "extras" + "params:" + params);
        sendEvent(receiveLocationData, params);
    }

    /**
     * 逆地理 （新定位中带逆地理功能呢）
     *
     * @param dLat
     * @param dLon
     * @Enclosing_Method : getInverse
     * @Written by : maliwei
     * @Creation Date : 2014-8-18 下午02:37:07
     * @version : v1.00
     * @Description :
     */
    private static void getInverse(final double dLat, final double dLon) {
        try {
            AsyncGeocoder gc = new AsyncGeocoder(MapbarMapModule.getReactContext().getApplicationContext(), Locale.getDefault());
            gc.setResultListener(new AsyncGeocoder.ResultListener() {
                @Override
                public void onResult(Object obj, List<Address> lstAddress) {

                    int flag = Integer.parseInt(String.valueOf(obj));
                    // 判断地址是否为多行
                    if (lstAddress.size() > 0 && count == flag) {
                        StringBuilder sbGeo = new StringBuilder();
                        String city = "";
                        for (int i = 0; i < lstAddress.size(); i++) {
                            Address adsLocation = lstAddress.get(i);
                            for (int j = 0; j <= adsLocation.getMaxAddressLineIndex(); j++) {
                                sbGeo.append(adsLocation.getAddressLine(j));
                            }
//                                sbGeo.append("FeatureName:" + adsLocation.getFeatureName()).append("\n");
//                                sbGeo.append("AdminArea:" + adsLocation.getAdminArea()).append("\n");
//                                sbGeo.append("Phone:" + adsLocation.getPhone()).append("\n");
//                                sbGeo.append("Thoroughfare:" + adsLocation.getThoroughfare()).append("\n");
//                                sbGeo.append("Locality:" + adsLocation.getLocality()).append("\n");
//                                sbGeo.append("Country:" + adsLocation.getCountryName()).append("\n");
//                                sbGeo.append("CountryCode:" + adsLocation.getCountryCode()).append("\n");
//                                sbGeo.append("Latitude:" + adsLocation.getLatitude()).append("\n");
//                                sbGeo.append("Longitude:" + adsLocation.getLongitude()).append("\n");
                            city = adsLocation.getAdminArea();
                        }
                        resolve(dLat, dLon, sbGeo.toString(), city);
                        LogUtils.logd(TAG, LogUtils.getThreadName() + "params:" + "lat:" + dLat + ",dlon:" + dLon + ",address:" + sbGeo.toString() + ",city:" + city);
                    }
                }
            });
            gc.setFlagObject(count);
            gc.getFromLocation(dLat, dLon, 1);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static void startLocation() {
        initLocation();
    }

    public static void stopLocation() {
        if (mLocationClient != null) {
            mLocationClient.stop();
            LogUtils.logd(TAG, "---------暂停定位-------");
        }
    }


    public static void onStartLocation() {

        if (mLocationClient != null) {
            mLocationClient.onForeground();
            LogUtils.logd(TAG, "---------onStartLocation-------");
        }
    }

    public static void onStopLocation() {

        if (mLocationClient != null) {
            mLocationClient.onBackground();
            LogUtils.logd(TAG, "---------onStopLocation-------");
        }
    }


    public static void onDestroyLocation() {
        if (mLocationClient != null) {
            mLocationClient.stop();
            mLocationClient.removeAllListener();
            LogUtils.logd(TAG, "---------onDestroyLocation-------");
            mLocationClient = null;
        }
    }

    private static void sendEvent(String eventName, @Nullable WritableMap params) {
        ReactContext reactContext = MapbarMapModule.getReactContext();
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
        } else {
            LogUtils.logd(TAG, "Waiting for CatalystInstance...");
        }
    }
}
