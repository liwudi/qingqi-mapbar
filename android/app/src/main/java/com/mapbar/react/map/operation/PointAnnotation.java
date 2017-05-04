package com.mapbar.react.map.operation;

import android.content.Context;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.Point;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.mapbar.map.CalloutStyle;
import com.mapbar.map.CustomAnnotation;
import com.mapbar.map.MapRenderer;
import com.mapbar.map.Vector2DF;
import com.mapbar.react.CommonUtils;
import com.mapbar.react.LogUtils;
import com.mapbar.react.map.MapbarMapView;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;


/**
 * Created by Administrator on 2016/10/27.
 */

public class PointAnnotation extends BaseOverlay {

    private String TAG = this.getClass().getSimpleName();
    private HashMap<Integer, CustomAnnotation> pointMap = new HashMap<Integer, CustomAnnotation>();

    public PointAnnotation(Context context) {
        super(context);
    }

    /**
     * 地图打点
     * js端参数为数组，每个索引对应一个集合
     * [{latitude: 3990768, longitude: 11640152,title: 'start1', imageName: "hotel",
     * iconText: "1",iconTextColor:"#ff4b4b4c",iconTextSize:18,id: 1,  offsetX: 0.5, OffsetY: 0.8,click: true},{},{}]
     *
     * @param pointList 点坐标
     */
    public void addAnnotations(MapbarMapView mapView, ReadableArray pointList) {
        if (pointList != null && pointList.size() > 0) {
            LogUtils.logd(TAG, LogUtils.getThreadName() + pointList.size());
            for (int i = 0; i < pointList.size(); i++) {
                final ReadableMap readableMap = pointList.getMap(i);
                int pointId = readableMap.getInt("id");
                // 避免pointId重复引起问题
                if (!this.pointMap.containsKey(pointId)) {
                    int lon = readableMap.getInt("longitude");
                    int lat = readableMap.getInt("latitude");
                    float offX = (float) readableMap.getDouble("offsetX");
                    float offY = (float) readableMap.getDouble("offsetY");
                    boolean clickable = true;
                    if (readableMap.hasKey("click")) {
                        clickable = readableMap.getBoolean("click");
                    }
                    String imageName = readableMap.getString("imageName");
                    Vector2DF pivot = new Vector2DF(offX, offY);
                    int id = CommonUtils.getResourceByReflect(imageName);
                    LogUtils.logd(TAG, LogUtils.getThreadName() + "lon:" + lon + ",lat:" + lat + ",imageName:" + imageName);
                    CustomAnnotation mCustomAnnotation = new CustomAnnotation(2, new Point(lon, lat),
                            // 此参数为气泡id 不能重复
                            pointId, pivot, BitmapFactory.decodeResource(context.getResources(), id));
                    LogUtils.logd(TAG, LogUtils.getThreadName() + mCustomAnnotation);
                    mCustomAnnotation.setClickable(clickable);
                    mCustomAnnotation.setSelected(clickable);
                    mCustomAnnotation.setTag(pointId);
                    String color = readableMap.getString("iconTextColor");
                    float iconTextX = 0.5f;
                    float iconTextY = 0.5f;
                    if (readableMap.hasKey("iconTextX") && readableMap.hasKey("iconTextY")) {
                        iconTextX = (float) readableMap.getDouble("iconTextX");
                        iconTextY = (float) readableMap.getDouble("iconTextY");
                    }
                    Vector2DF iconTextPivot = new Vector2DF(iconTextX, iconTextY);
                    mCustomAnnotation.setIconText(readableMap.getString("iconText"), Color.parseColor(color), iconTextPivot);
                    mCustomAnnotation.setIconTextSize(readableMap.getInt("iconTextSize"));
                    if (readableMap.hasKey("title")) {
                        mCustomAnnotation.setTitle(readableMap.getString("title"));
                    }
                    mapView.getMapRenderer().addAnnotation(mCustomAnnotation);
                    if (readableMap.hasKey("callOut")) {
                        float callOutX = 0.5f;
                        float callOutY = 0;
                        if (readableMap.hasKey("callOutX") && readableMap.hasKey("callOutY")) {
                            callOutX = (float) readableMap.getDouble("callOutX");
                            callOutY = (float) readableMap.getDouble("callOutY");
                        }
                        CalloutStyle calloutStyle = mCustomAnnotation.getCalloutStyle();
                        Vector2DF vector2DF =new Vector2DF(callOutX,callOutY);
                        calloutStyle.anchor.set(vector2DF);
                        mCustomAnnotation.setCalloutStyle(calloutStyle);
                        mCustomAnnotation.showCallout(readableMap.getBoolean("callOut"));
                    } else {
                        mCustomAnnotation.showCallout(false);
                    }
                    this.pointMap.put(pointId, mCustomAnnotation);
                }
            }
            LogUtils.logd(TAG, LogUtils.getThreadName() + "addLine point finish size is :" + this.pointMap.size());
        }
    }

    /**
     * 清除指定打点
     * 可以删除指定的点也可以删除全部点
     * js端参数为数组，[-1] pointId为-1时表示所有线都更新，[1, 2]删除指定pointId的线
     * * @param tag  view ref
     */
    public void removeAnnotation(MapbarMapView mapView, ReadableArray pointList) {
        MapRenderer mapRenderer = mapView.getMapRenderer();
        if (pointList != null && pointList.size() > 0) {
            LogUtils.logd(TAG, "clearPoint start makerList:" + pointMap);
            if (pointList.size() == 1 && pointList.getInt(0) == -1) {
                // 删除所有点
                if (pointMap.size() > 0) {
                    for (CustomAnnotation value : pointMap.values()) {
//                        if (value.isSelected()) {
//                            value.showCallout(false);
//                            WritableMap params = Arguments.createMap();
//                            int pointId = value.getTag();
//                            params.putBoolean("bubbleShow", false);
//                            params.putInt("pointId", pointId);
//                            dispatchEvent(mapView, TubaMapView.MapViewEvent.EVENT_AIR_BUBBLE_SHOW.toString(), params);
//                            Log.d(TAG, "bubbleShow false pointId:" + pointId);
//                        }
                        mapRenderer.removeAnnotation(value);
                    }
                }
                pointMap.clear();
            } else {
                // 删除指定点
                for (int i = 0; i < pointList.size(); i++) {
                    int poindId = pointList.getInt(i);
                    if (this.pointMap.containsKey(poindId)) {
                        CustomAnnotation customAnnotation = pointMap.get(poindId);
//                        customAnnotation.setHidden(true);
//                        if (customAnnotation.isSelected()) {
//                            customAnnotation.showCallout(false);
//                            WritableMap params = Arguments.createMap();
//                            int pointId = customAnnotation.getTag();
//                            params.putBoolean("bubbleShow", false);
//                            params.putInt("pointId", pointId);
//                            dispatchEvent(mapView, TubaMapView.MapViewEvent.EVENT_AIR_BUBBLE_SHOW.toString(), params);
//                            Log.d(TAG, "bubbleShow false pointId:" + pointId);
//                        }
                        mapRenderer.removeAnnotation(customAnnotation);
                        pointMap.remove(poindId);
                    } else {
                        LogUtils.logd(TAG, LogUtils.getThreadName() + "poindId:" + poindId + ",不存在，无法删除");
                    }
                    LogUtils.logd(TAG, "clearPoint finish makerList:" + pointMap);
                }
            }
        }
    }

    public void clearAllAnnotation() {
        pointMap.clear();
    }

    /**
     * 获取所有点
     * * @param tag  view ref
     */
    public void getAnnotationIDs(Promise promise) {
        WritableArray array = Arguments.createArray();
        LogUtils.logd(TAG, "get all Point makerList:" + pointMap);
        Set<Integer> keys = pointMap.keySet();
        Iterator<Integer> iterator = keys.iterator();
        while (iterator.hasNext()) {
            int pointId = iterator.next();
            array.pushInt(pointId);
            LogUtils.logd(TAG, "getAllMarkersId" + pointId);
        }
        promise.resolve(array);
    }

    /**
     * 更新气泡(更新经纬度)[{ latitude: 3990400, longitude: 11640000,  id: 1}]
     * 添加更新 imageName iconText title
     * * @param tag  view ref
     */
    public void refreshAnnotationLocation(ReadableArray pointList) {
        if (pointList != null && pointList.size() > 0) {
            for (int i = 0; i < pointList.size(); i++) {
                final ReadableMap pointMap = pointList.getMap(i);
                int poindId = pointMap.getInt("id");
                if (this.pointMap.containsKey(poindId)) {
                    CustomAnnotation customAnnotation = this.pointMap.get(poindId);
                    if (pointMap.hasKey("longitude") && pointMap.hasKey("latitude")) {
                        int lon = pointMap.getInt("longitude");
                        int lat = pointMap.getInt("latitude");
                        customAnnotation.setPosition(new Point(lon, lat));
                    }
                    if (pointMap.hasKey("imageName") && pointMap.hasKey("offsetX") && pointMap.hasKey("offsetY")) {
                        float offX = (float) pointMap.getDouble("offsetX");
                        float offY = (float) pointMap.getDouble("offsetY");
                        Vector2DF pivot = new Vector2DF(offX, offY);
                        String imageName = pointMap.getString("imageName");
                        int id = CommonUtils.getResourceByReflect(imageName);
                        customAnnotation.setCustomIcon(pivot, BitmapFactory.decodeResource(context.getApplicationContext().getResources(), id));
                    }
                    if (pointMap.hasKey("iconText") && pointMap.hasKey("iconTextColor") && pointMap.hasKey("iconTextSize")) {
                        String title = pointMap.getString("iconText");
                        String color = pointMap.getString("iconTextColor");
                        float iconTextX = 0.5f;
                        float iconTextY = 0.5f;
                        if (pointMap.hasKey("iconTextX") && pointMap.hasKey("iconTextY")) {
                            iconTextX = (float) pointMap.getDouble("iconTextX");
                            iconTextY = (float) pointMap.getDouble("iconTextY");
                        }
                        Vector2DF pivot = new Vector2DF(iconTextX, iconTextY);
                        customAnnotation.setIconText(pointMap.getString("iconText"), Color.parseColor(color), pivot);
                        customAnnotation.setIconTextSize(pointMap.getInt("iconTextSize"));
                    }
                    if (pointMap.hasKey("title")) {
                        String title = pointMap.getString("title");
                        customAnnotation.setTitle(title);
                    }
                }
            }
        }
        LogUtils.logd(TAG, "updatePoint  makerList:" + pointMap);
    }

    /**
     * 更新点的ICON
     * * @param tag  view ref
     */
    public void setIcon(ReadableArray points) {
        if (points != null && points.size() > 0) {
            for (int i = 0; i < points.size(); i++) {
                final ReadableMap pointMap = points.getMap(i);
                int poindId = pointMap.getInt("id");
                if (this.pointMap.containsKey(poindId)) {
                    CustomAnnotation annotation = this.pointMap.get(poindId);
                    float offX = (float) pointMap.getDouble("offsetX");
                    float offY = (float) pointMap.getDouble("offsetY");
                    Vector2DF pivot = new Vector2DF(offX, offY);
                    String imageName = pointMap.getString("imageName");
                    int id = CommonUtils.getResourceByReflect(imageName);
                    annotation.setCustomIcon(pivot, BitmapFactory.decodeResource(context.getApplicationContext().getResources(), id));
                }
            }
        }
        LogUtils.logd(TAG, "updatePoint  makerList:" + pointMap);
    }

    /**
     * updateIconText
     * * @param tag  view ref
     */
    public void setIconText(ReadableArray pointList) {
        if (pointList != null && pointList.size() > 0) {
            for (int i = 0; i < pointList.size(); i++) {
                final ReadableMap pointMap = pointList.getMap(i);
                int poindId = pointMap.getInt("id");
                if (this.pointMap.containsKey(poindId)) {
                    if (pointMap.hasKey("iconText")) {
                        String title = pointMap.getString("iconText");
                        CustomAnnotation customAnnotation = this.pointMap.get(poindId);
                        float iconTextX = 0.5f;
                        float iconTextY = 0.5f;
                        if (pointMap.hasKey("iconTextX") && pointMap.hasKey("iconTextY")) {
                            iconTextX = (float) pointMap.getDouble("iconTextX");
                            iconTextY = (float) pointMap.getDouble("iconTextY");
                        }
                        Vector2DF pivot = new Vector2DF(iconTextX, iconTextY);
                        String color = pointMap.getString("iconTextColor");
                        customAnnotation.setIconText(pointMap.getString("iconText"), Color.parseColor(color), pivot);
                        customAnnotation.setIconTextSize(pointMap.getInt("iconTextSize"));
                    }
                }
            }
        }
        LogUtils.logd(TAG, "updatePoint  makerList:" + pointMap);
    }

    /**
     * updateIconText
     * * @param tag  view ref
     */
    public void setAnnotationTitle(ReadableArray pointList) {
        if (pointList != null && pointList.size() > 0) {
            for (int i = 0; i < pointList.size(); i++) {
                final ReadableMap pointMap = pointList.getMap(i);
                int poindId = pointMap.getInt("id");
                if (this.pointMap.containsKey(poindId)) {
                    if (pointMap.hasKey("title")) {
                        String title = pointMap.getString("title");
                        CustomAnnotation customAnnotation = this.pointMap.get(poindId);
                        customAnnotation.setTitle(title);
                    }
                }
            }
        }
        LogUtils.logd(TAG, "updatePoint  makerList:" + pointMap);
    }
}
