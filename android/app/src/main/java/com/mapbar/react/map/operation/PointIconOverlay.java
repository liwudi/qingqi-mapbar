package com.mapbar.react.map.operation;

import android.content.Context;
import android.graphics.Point;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.mapbar.react.LogUtils;
import com.mapbar.react.map.MapbarMapView;
import com.mapbar.map.IconOverlay;
import com.mapbar.map.MapRenderer;
import com.mapbar.map.Overlay;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;


/**
 * Created by Administrator on 2016/10/27.
 */

public class PointIconOverlay extends BaseOverlay {

    private String TAG = this.getClass().getSimpleName();
    private HashMap<Integer, IconOverlay> iconOverLayMap = new HashMap<Integer, IconOverlay>();

    public PointIconOverlay(Context context) {
        super(context);
    }


    /**
     * 地图打点
     *
     * @param
     * @param pointList 点坐标
     */
    public void setIconOverlayIcons(MapbarMapView mapView, ReadableArray pointList) {
        if (pointList != null && pointList.size() > 0) {
            LogUtils.logd(TAG, LogUtils.getThreadName() + pointList.size());
            for (int i = 0; i < pointList.size(); i++) {
                final ReadableMap readableMap = pointList.getMap(i);
                int pointId = readableMap.getInt("id");
                if (!this.iconOverLayMap.containsKey(pointId)) {//避免pointId重复引起问题
                    int lon = readableMap.getInt("longitude");
                    int lat = readableMap.getInt("latitude");
                    boolean clickable = true;
                    if (readableMap.hasKey("click")) {
                        clickable = readableMap.getBoolean("click");
                    }
                    String imageName = readableMap.getString("imageName");
                    IconOverlay walkIcon = new IconOverlay(imageName, true);
                    //walkIcon.markAsAnimated(1, "a1000;b30;c30;d30;c40;b60;a200;b30;c30;d30;c40;b60;");
                    walkIcon.setPosition(new Point(lon, lat));
                    float direction = (float) readableMap.getDouble("direction");
                    walkIcon.setOrientAngle(direction);
                    walkIcon.setScaleFactor(1.5f);
                    if (clickable) {
                        walkIcon.setClickable(true);
                        walkIcon.setSelected(true);
                    } else {
                        walkIcon.setClickable(false);
                        walkIcon.setSelected(false);
                    }
                    walkIcon.setLayer(Overlay.Layer.abovePoi);
                    walkIcon.setTag(pointId);
                    mapView.getMapRenderer().addOverlay(walkIcon);
                    iconOverLayMap.put(pointId, walkIcon);
                }
            }
            LogUtils.logd(TAG, LogUtils.getThreadName() + "addLine point finish size is :" + this.iconOverLayMap.size());
        }
    }

    /**
     * 清除指定打点
     * 可以删除指定的点也可以删除全部点
     * js端参数为数组，[-1] pointId为-1时表示所有线都更新，[1, 2]删除指定pointId的线
     * * @param tag  view ref
     */
    public void removeIconOverlay(MapbarMapView mapView, ReadableArray pointList) {
        MapRenderer mapRenderer = mapView.getMapRenderer();
        if (pointList != null && pointList.size() > 0) {
            LogUtils.logd(TAG, "clearPoint start makerList:" + iconOverLayMap);
            if (pointList.size() == 1 && pointList.getInt(0) == -1) {
                // 删除所有点
                if (iconOverLayMap.size() > 0) {
                    for (IconOverlay value : iconOverLayMap.values()) {
                        mapRenderer.removeOverlay(value);
                    }
                }
                iconOverLayMap.clear();
            } else {
                // 删除指定点
                for (int i = 0; i < pointList.size(); i++) {
                    int poindId = pointList.getInt(i);
                    if (this.iconOverLayMap.containsKey(poindId)) {
                        IconOverlay iconOverlay = iconOverLayMap.get(poindId);
                        mapRenderer.removeOverlay(iconOverlay);
                        iconOverLayMap.remove(poindId);
                    } else {
                        LogUtils.logd(TAG, LogUtils.getThreadName() + "poindId:" + poindId + ",不存在，无法删除");
                    }
                }
            }
        }
    }

    public void clearAllOverlay() {
        iconOverLayMap.clear();
    }

    /**
     * 获取所有点
     * * @param tag  view ref
     */
    public void getIconOverlayIds(Promise promise) {
        WritableArray array = Arguments.createArray();
        LogUtils.logd(TAG, "get all Point makerList:" + iconOverLayMap);
        Set<Integer> keys = iconOverLayMap.keySet();
        Iterator<Integer> iterator = keys.iterator();
        while (iterator.hasNext()) {
            int pointId = iterator.next();
            array.pushInt(pointId);
            LogUtils.logd(TAG, "getAllMarkersId" + pointId);
        }
        promise.resolve(array);
    }

    /**
     * 更新气泡(更新经纬度)
     * 添加更新 imageName direction
     * * @param tag  view ref
     */
    public void refreshIconOverlayLocation(ReadableArray pointList) {
        if (pointList != null && pointList.size() > 0) {
            for (int i = 0; i < pointList.size(); i++) {
                final ReadableMap pointMap = pointList.getMap(i);
                int poindId = pointMap.getInt("id");
                if (this.iconOverLayMap.containsKey(poindId)) {
                    IconOverlay iconOverlay = this.iconOverLayMap.get(poindId);
                    if (pointMap.hasKey("imageName")) {
                        String imageName = pointMap.getString("imageName");
                        iconOverlay.setImage(imageName);
                    }
                    if (pointMap.hasKey("longitude") && pointMap.hasKey("latitude")) {
                        int lon = pointMap.getInt("longitude");
                        int lat = pointMap.getInt("latitude");
                        iconOverlay.setPosition(new Point(lon, lat));
                    }
                    if (pointMap.hasKey("direction")) {
                        float direction = (float) pointMap.getDouble("direction");
                        iconOverlay.setOrientAngle(direction);
                    }
                }
            }
        }
        LogUtils.logd(TAG, "updatePoint  makerList:" + iconOverLayMap);
    }

    /**
     * 更新点的ICON
     * * @param tag  view ref
     */
    public void setIconOverlayIcon(ReadableArray points) {
        if (points != null && points.size() > 0) {
            for (int i = 0; i < points.size(); i++) {
                final ReadableMap pointMap = points.getMap(i);
                int poindId = pointMap.getInt("id");
                if (this.iconOverLayMap.containsKey(poindId)) {
                    IconOverlay iconOverlay = this.iconOverLayMap.get(poindId);
                    if (pointMap.hasKey("imageName")) {
                        String imageName = pointMap.getString("imageName");
                        iconOverlay.setImage(imageName);
                    }
                }
            }
        }
    }

    /**
     * 更新点的ICON
     * * @param tag  view ref
     */
    public void setIconOverlayDirection(ReadableArray points) {
        if (points != null && points.size() > 0) {
            for (int i = 0; i < points.size(); i++) {
                final ReadableMap pointMap = points.getMap(i);
                int poindId = pointMap.getInt("id");
                if (this.iconOverLayMap.containsKey(poindId)) {
                    IconOverlay iconOverlay = this.iconOverLayMap.get(poindId);
                    float direction = (float) pointMap.getDouble("direction");
                    iconOverlay.setOrientAngle(direction);
                }
            }
        }
        LogUtils.logd(TAG, "updatePoint  makerList:" + iconOverLayMap);
    }

}
