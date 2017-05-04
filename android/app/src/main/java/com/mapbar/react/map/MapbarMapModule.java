package com.mapbar.react.map;

import android.content.Context;
import android.graphics.Point;
import android.graphics.Rect;
import android.os.Message;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.mapbar.map.MapRenderer;
import com.mapbar.map.Vector2DF;
import com.mapbar.react.LogUtils;
import com.mapbar.react.map.config.Constants;
import com.mapbar.react.map.operation.Location;
/**
 * Created by Administrator on 2016/10/20.
 */
public class MapbarMapModule extends ReactContextBaseJavaModule {

    private String TAG = this.getClass().getSimpleName();
    private Context context;
    private static ReactContext reactContext;
    private static final String REACT_CLASS = "MapbarMapModule";
    private Vector2DF mZoomLevelRange = null;

    public MapbarMapModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        this.reactContext = reactContext;
        LogUtils.logd(TAG, "MapbarMapModule-------");
    }

    public static ReactContext getReactContext() {
        return reactContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void addLine(int tag, ReadableArray lineList) {
        MapbarMapView mapView = getMapView(tag);
        mapView.getLineOverlay().addLine(mapView, lineList);
    }

    @ReactMethod
    public void deleteLine(int tag, ReadableArray lineList) {
        MapbarMapView mapView = getMapView(tag);
        mapView.getLineOverlay().deleteLine(mapView, lineList);
    }

    // 更新所有线
    @ReactMethod
    public void updateLine(int tag, ReadableArray lineList) {
        MapbarMapView mapView = getMapView(tag);
        mapView.getLineOverlay().updateLine(mapView, lineList);
    }

    // 获取所有线的id
    @ReactMethod
    public void getLineOverlayIds(int tag, Promise promise) {
        getMapView(tag).getLineOverlay().getLineOverlayIds(promise);
    }

    /**
     * 地图打点
     *
     * @param pointList 点坐标
     */
    @ReactMethod
    public void addAnnotations(int tag,ReadableArray pointList) {
        MapbarMapView mapView =getMapView(tag);
        mapView.getPointAnnotation().addAnnotations(mapView,pointList);
    }

    /**
     * 删除所有打点
     * 删除指定打点
     * * @param tag  view ref
     */
    @ReactMethod
    public void removeAnnotation(int tag,ReadableArray pointList) {
        MapbarMapView mapView =getMapView(tag);
        mapView.getPointAnnotation().removeAnnotation(mapView,pointList);
    }


    /* 获取所有点
    * * @param tag  view ref
    */
    @ReactMethod
    public void getAnnotationIDs(int tag,Promise promise) {
        getMapView(tag).getPointAnnotation().getAnnotationIDs( promise);
    }


    /**
     * 更新气泡(更新经纬度)
     * * @param tag  view ref
     */
    @ReactMethod
    public void refreshAnnotationLocation(int tag,ReadableArray pointList) {
        getMapView(tag).getPointAnnotation().refreshAnnotationLocation(pointList);
    }

    /**
     * 更新点的ICON
     * * @param tag  view ref
     */
    @ReactMethod
    public void setIcon(int tag,ReadableArray pointList) {
        getMapView(tag).getPointAnnotation().setIcon( pointList);
    }

    /**
     * updateIconText
     * * @param tag  view ref
     */
    @ReactMethod
    public void setIconText(int tag,ReadableArray pointList) {
        getMapView(tag).getPointAnnotation().setIconText( pointList);
    }

    /**
     * updateIconText
     * * @param tag  view ref
     */
    @ReactMethod
    public void setAnnotationTitle(int tag,ReadableArray pointList) {
        getMapView(tag).getPointAnnotation().setAnnotationTitle(pointList);
    }
    /**
     * 地图打点可旋转的点
     *
     * @param tag       view ref
     * @param pointList 点坐标
     */
    @ReactMethod
    public void setIconOverlayIcons(int tag, ReadableArray pointList) {
        MapbarMapView mapView =getMapView(tag);
        mapView.getPointIconOverlay().setIconOverlayIcons(mapView, pointList);
    }
    @ReactMethod
    public void removeIconOverlay(int tag,ReadableArray pointList) {
        MapbarMapView mapView =getMapView(tag);
        mapView.getPointIconOverlay().removeIconOverlay(mapView,pointList);
    }
    @ReactMethod
    public void getIconOverlayIds(int tag,Promise promise) {
        getMapView(tag).getPointIconOverlay().getIconOverlayIds(promise);
    }
    @ReactMethod
    public void refreshIconOverlayLocation(int tag,ReadableArray pointList) {
        getMapView(tag).getPointIconOverlay().refreshIconOverlayLocation(pointList);
    }
    @ReactMethod
    public void setIconOverlayIcon(int tag,ReadableArray pointList) {
        MapbarMapView mapView = getMapView(tag);
        mapView.getPointIconOverlay().setIconOverlayIcon(pointList);
    }

    @ReactMethod
    public void setIconOverlayDirection(int tag, ReadableArray pointList) {
        MapbarMapView mapView = getMapView(tag);
        mapView.getPointIconOverlay().setIconOverlayDirection(pointList);
    }
    @ReactMethod
    public void removeAllOverlayAndAnnotation(int tag) {
        MapbarMapView mapView =getMapView(tag);
        MapRenderer renderer = mapView.getMapRenderer();
        renderer.removeAllOverlays();
        renderer.removeAllAnnotations();
        mapView.getLineOverlay().clearAllOverlay();
        mapView.getPointIconOverlay().clearAllOverlay();
        mapView.getPointAnnotation().clearAllAnnotation();
    }

    //    设置地图是可以触摸
    @ReactMethod
    public void setForbidGesture(int tag, boolean forbidGesture) {
        Log.d(TAG, "ReactProp-isZoom：" + forbidGesture);
        MapbarMapView mapView = getMapView(tag);
        Message msg = mapView.getHandler().obtainMessage();
        msg.what = Constants.MAPVIEW_FORBID_GESTURE;
        msg.obj = forbidGesture;
        mapView.getHandler().sendMessage(msg);
    }
    /**
     * 放大功能
     *
     * @param zoom
     */
    @ReactMethod
    public void setZoomIn(int tag, float zoom) {
        LogUtils.logd(TAG, LogUtils.getThreadName() + "zoom:" + zoom);
        MapRenderer mapRenderer = getMapView(tag).getMapRenderer();
        float zoomLevel = mapRenderer.getZoomLevel();
        if (mZoomLevelRange == null) {
            mZoomLevelRange = mapRenderer.getZoomLevelRange();
        }
        zoomLevel = zoomLevel + zoom;
        if (zoomLevel >= mZoomLevelRange.getY()) {
            zoomLevel = mZoomLevelRange.getY();
        }
        mapRenderer.beginAnimations();
        mapRenderer.setZoomLevel(zoomLevel);
        mapRenderer.commitAnimations(300, MapRenderer.Animation.linear);
    }

    /**
     * 缩小功能
     *
     * @param zoom
     */
    @ReactMethod
    public void setZoomOut(int tag, float zoom) {
        LogUtils.logd(TAG, LogUtils.getThreadName() + "zoom:" + zoom);
        MapRenderer mapRenderer = getMapView(tag).getMapRenderer();
        float zoomLevel = mapRenderer.getZoomLevel();
        if (mZoomLevelRange == null) {
            mZoomLevelRange = mapRenderer.getZoomLevelRange();
        }
        zoomLevel = zoomLevel - zoom;
        if (zoomLevel <= mZoomLevelRange.getX()) {
            zoomLevel = mZoomLevelRange.getX();
        }
        mapRenderer.beginAnimations();
        mapRenderer.setZoomLevel(zoomLevel);
        mapRenderer.commitAnimations(300, MapRenderer.Animation.linear);
    }



    /**
     * 更新地图中心点
     *
     */
    @ReactMethod
    public void setWorldCenter(int tag, ReadableMap map) {
        MapRenderer mapRenderer = getMapView(tag).getMapRenderer();
        mapRenderer.beginAnimations();
        int longitude = map.getInt("longitude");
        int latitude = map.getInt("latitude");
        Point centerPoint = new Point(longitude, latitude);
        mapRenderer.setWorldCenter(centerPoint);
        mapRenderer.commitAnimations(200, MapRenderer.Animation.linear);
    }

    /**
     * 更新地图缩放级别
     *
     * @param zoom
     */
    @ReactMethod
    public void setZoomLevel(int tag, float zoom) {
        MapRenderer mapRenderer = getMapView(tag).getMapRenderer();
        if (mZoomLevelRange == null) {
            mZoomLevelRange = mapRenderer.getZoomLevelRange();
        }
        if (zoom >= mZoomLevelRange.getY()) {
            zoom = mZoomLevelRange.getY();
        } else if (zoom <= mZoomLevelRange.getX()) {
            zoom = mZoomLevelRange.getX();
        }
        mapRenderer.beginAnimations();
        mapRenderer.setZoomLevel(zoom);
        mapRenderer.commitAnimations(200, MapRenderer.Animation.linear);
    }

    /*
     *  获取地图级别
     * */
    @ReactMethod
    public void getZoomLevel(int tag, Promise promise) {
        MapRenderer mapRenderer = getMapView(tag).getMapRenderer();
        double mZoomLevel = (double)mapRenderer.getZoomLevel();
     /*   WritableMap writableMap = Arguments.createMap();
        writableMap.putDouble("zoomLevel",mZoomLevel);*/
        promise.resolve(mZoomLevel);
    }

    /*
     *  获取地图所见区域
     * */
    @ReactMethod
    public void getWorldRect(int tag, Promise promise) {
        MapbarMapView mapView = getMapView(tag);
        Rect rect = mapView.getMapRenderer().getWorldRect();
        LogUtils.logd(TAG, "rect:" + rect);
        WritableMap rectMap = Arguments.createMap();
        rectMap.putInt("minLongitude",rect.left);
        rectMap.putInt("minLatitude",rect.top);
        rectMap.putInt("maxLongitude",rect.right);
        rectMap.putInt("maxLatitude",rect.bottom);
        promise.resolve(rectMap);
    }

    /*
     *  设置地图所见区域
     * */
    @ReactMethod
    public void fitWorldArea(int tag, ReadableMap map) {
        MapbarMapView mapView = getMapView(tag);
        int minLongitude = map.getInt("minLongitude");
        int minLatitude = map.getInt("minLatitude");
        int maxLongitude = map.getInt("maxLongitude");
        int maxLatitude = map.getInt("maxLatitude");
        Rect rect = new Rect(minLongitude, minLatitude, maxLongitude, maxLatitude);
        mapView.getMapRenderer().fitWorldArea(new Rect(rect));
    }

    /**
     * js页面从后台转为前台时，恢复地图
     *
     * @param
     */
    @ReactMethod
    public void onResumeMap(final int tag) {
        LogUtils.logd(TAG,"onResumeMap..."+"tag:"+tag);
        if (reactContext != null && reactContext.getCurrentActivity() != null) {
            reactContext.getCurrentActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    MapbarMapView mapView = getMapView(tag);
                    if (mapView != null) {
                        mapView.onResume();
                    }
                }
            });
        }
    }

    /**
     * js页面跳转或在后台，但没被销毁时，地图暂停
     *
     * @param
     */
    @ReactMethod
    public void onPauseMap(final int tag) {
        LogUtils.logd(TAG,"onPauseMap... "+"tag:"+tag);
        if (reactContext != null && reactContext.getCurrentActivity() != null) {
            reactContext.getCurrentActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    MapbarMapView mapView = getMapView(tag);
                    if (mapView != null) {
                        mapView.onPause();
                    }
                }
            });
        }
    }

    /**
     * js页面从堆栈页面列表消失不在存在时，地图销毁
     *
     * @param
     */
    @ReactMethod
    public void onDestroyMap(final int tag) {
        LogUtils.logd(TAG,"onDestroyMap..."+"tag:"+tag);
        if (reactContext != null && reactContext.getCurrentActivity() != null) {
            reactContext.getCurrentActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    MapbarMapView mapView = getMapView(tag);
                    if (mapView != null) {
                        // js销毁时，销毁地图控件
                        mapView.onDestroy();
                    }
                }
            });
        }
    }

    //定位开始
    @ReactMethod
    public void startLocation() {
        if (reactContext != null && reactContext.getCurrentActivity() != null) {
            reactContext.getCurrentActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Location.startLocation();
                }
            });
        }
    }

    //定位结束
    @ReactMethod
    public void stopLocation() {
        Location.stopLocation();
    }

    @ReactMethod
    public void onStartLocation() {
        Location.onStartLocation();
    }

    @ReactMethod
    public void onStopLocation() {
        Location.onStopLocation();
    }

    @ReactMethod
    public void onDestroyLocation() {
        Location.onDestroyLocation();
    }
    protected MapbarMapView getMapView(int tag) {
        MapbarMapView mapView = (MapbarMapView) ((ReactContext) context).getCurrentActivity().findViewById(tag);
        return mapView;
    }

}
