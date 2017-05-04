package com.mapbar.react.map;

import android.graphics.Point;
import android.os.Message;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.mapbar.map.ScaleView;
import com.mapbar.react.LogUtils;
import com.mapbar.react.map.config.Constants;

import java.util.Map;

public class MapbarMapViewManager extends SimpleViewManager<MapbarMapView> {

    private String TAG = "MapbarMapViewManager";

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        MapBuilder.Builder<String, Object> builder = MapBuilder.builder();
        for (MapbarMapView.MapViewEvent event : MapbarMapView.MapViewEvent.values()) {
            builder.put(event.toString(), MapBuilder.of("registrationName", event.toString()));
        }
        return builder.build();
    }

    public MapbarMapViewManager() {
    }

    @Override
    public String getName() {
        return "MapView";
    }

    @Override
    protected MapbarMapView createViewInstance(ThemedReactContext reactContext) {
        MapbarMapView mapView = new MapbarMapView(reactContext);
/*        mapView.enableShowBuiltInControl(true);
        ScaleView sv = mapView.getScaleView();
        sv.setX(-200);
        sv.setY(0);
        mapView.setScaleView(sv);*/
       // mapView.getMapRenderer().getScale()
        LogUtils.logd(TAG, LogUtils.getThreadName() + "--MapView--" + mapView.hashCode());
        return mapView;
    }

    @Override
    public void onDropViewInstance(MapbarMapView view) {
        super.onDropViewInstance(view);
    }

    // 设置缩放级别
    @ReactProp(name = "zoomLevel")
    public void setZoomLevel(MapbarMapView mapView, float zoomLevel) {
        Log.d(TAG, "ReactProp-zoomLevel：" + zoomLevel);
        Message msg = mapView.getHandler().obtainMessage();
        msg.what = Constants.MAPVIEW_ZOOM;
        msg.obj = zoomLevel;
        mapView.getHandler().sendMessage(msg);// 将js端的属性值传递到TubaMapView中完成初始化
    }

    // 设置中心点
    @ReactProp(name = "worldCenter")
    public void setWorldCenter(MapbarMapView mapView, ReadableMap readableMap) {
        if (readableMap != null) {
            Message msg = mapView.getHandler().obtainMessage();
            msg.what = Constants.MAPVIEW_CENTER;
            int longitude = readableMap.getInt("longitude");
            int latitude = readableMap.getInt("latitude");
            Log.d(TAG, "ReactProp-worldCenter：" + longitude + "---" + latitude);
            Point worldCenterPoint = new Point(longitude, latitude);
            msg.obj = worldCenterPoint;
            mapView.getHandler().sendMessage(msg);
        }
    }

    @ReactProp(name = "forbidGesture")
    public void setForbidGesture(MapbarMapView mapView, boolean forbidGesture) {
        Log.d(TAG, "ReactProp-isZoom：" + forbidGesture);
        Message msg = mapView.getHandler().obtainMessage();
        msg.what = Constants.MAPVIEW_FORBID_GESTURE;
        msg.obj = forbidGesture;
        mapView.getHandler().sendMessage(msg);
    }


}
