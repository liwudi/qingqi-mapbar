package com.mapbar.react.map.operation;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Point;
import android.text.TextUtils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.mapbar.react.LogUtils;
import com.mapbar.react.map.MapbarMapView;
import com.mapbar.map.MapRenderer;
import com.mapbar.map.Overlay;
import com.mapbar.map.PolylineOverlay;

import java.util.ArrayList;
import java.util.HashMap;


/**
 * Created by Administrator on 2016/10/27.
 */

public class LineOverlay extends BaseOverlay {

    private String TAG = this.getClass().getSimpleName();
    private HashMap<Integer, PolylineOverlay> moreLineMap = new HashMap<>(); // 多条线的集合
    private HashMap<Integer, Boolean> isLineOrFaceMap = new HashMap<>(); // 记录是画线or面
    public LineOverlay(Context context) {
        super(context);
    }

    /**
     * 
     * 批量划线
     * js端参数为数组，每个索引对应一个集合，集合中line对应数组，可以传递多个点的的经纬度，画出多条连接的线
     * [
     * {
     * line: [  // 多个点的经纬度，如3个点可以话出两条连接的线
     * { latitude: 39.90, longitude: 117.39 },
     * { latitude: 40.95, longitude: 118.45 },
     * { latitude: 41.90, longitude: 119.36 }
     * ],
     * isClose: false, // 是否闭合，true表示最后一个点和开始点连接，画出一个面
     * width: 12,
     * color: '#ff4b4b4c',
     * lineId: 1
     * }
     * ]
     */
    public void addLine(MapbarMapView mapView, ReadableArray lineList) {
        if (lineList != null && lineList.size() > 0) {

            for (int i = 0; i < lineList.size(); i++) {
                ReadableMap readableMap = lineList.getMap(i);
                boolean isClose = readableMap.getBoolean("isClose"); // 控制是否划面
                String width = readableMap.getString("width");
                String strokeColor = readableMap.getString("strokeColor");
                String outlineColor = readableMap.getString("outlineColor");
                int lineId = readableMap.getInt("lineId");
                ReadableArray pointList = readableMap.getArray("locations");
                LogUtils.logd(TAG, lineId + "------" + width + "------" + strokeColor);
                if (!moreLineMap.containsKey(lineId)) {
                    isLineOrFaceMap.put(lineId, isClose);
                PolylineOverlay polyline = new PolylineOverlay(getPoint(pointList), isClose);
                polyline.setStrokeStyle(Overlay.StrokeStyle.solid);
                polyline.setColor(Color.parseColor(strokeColor));
                polyline.setOutlineColor(Color.parseColor(outlineColor));
                polyline.setWidth(Integer.valueOf(width));
                    moreLineMap.put(lineId, polyline); // 将对应的线添加到集合号中方便删除

                }

            }
            for (Integer id : moreLineMap.keySet()) {
                // 视角缩放
                // mapRenderer.beginAnimations();
                // mapRenderer.fitWorldArea(polylineOverlay.getBoundingBox());
                // mapRenderer.commitAnimations(300, MapRenderer.Animation.linear);
                mapView.getMapRenderer().addOverlay(moreLineMap.get(id));
            }
        }
    }

    /**
     * 删除线，可以删除指定的线也可以删除全部线
     * <p/>
     * js端参数为数组，[-1] lineId为-1时表示所有线都更新，[1, 2]删除指定lineId的线
     */
    public void deleteLine(MapbarMapView mapView, ReadableArray lineList) {
        MapRenderer mapRenderer = mapView.getMapRenderer();
        if (lineList != null && lineList.size() > 0) {
            if (lineList.size() == 1 && lineList.getInt(0) == -1) {
                //delete all
                // 删除多条线
                if (moreLineMap.size() > 0) {
                    for (PolylineOverlay polyline : moreLineMap.values()) {
                        mapRenderer.removeOverlay(polyline);
                    }
                }
                moreLineMap.clear();
                isLineOrFaceMap.clear();
            } else {
                for (int i = 0; i < lineList.size(); i++) {
                    int lineId = lineList.getInt(i);
                    if (moreLineMap.size() > 0 && moreLineMap.containsKey(lineId)) {
                        mapRenderer.removeOverlay(moreLineMap.get(lineId));
                        moreLineMap.remove(lineId);
                        isLineOrFaceMap.remove(lineId);
                    }
                }
            }
        }
    }
    public void clearAllOverlay() {
        moreLineMap.clear();
        isLineOrFaceMap.clear();
    }
    /**
     * 更新线，可以更新指定的线也可以更新全部线
     * [
     * {
     * line: null,
     * color: "#ff4c2b4c",
     * width: "20",
     * lineId: 1
     * }
     * ]
     * <p/>
     * js端参数为数组，map中line、color、lineId、width四个key值必须存在，当value值为null时表示不更新，lineId为-1时，表示所有线都更新
     * 注意：更新经纬度只能更新指定的线，目前没有添加更新所有线的经纬度
     */
    public void updateLine(MapbarMapView mapView, ReadableArray lineList) {
        MapRenderer mapRenderer = mapView.getMapRenderer();
        if (lineList != null && lineList.size() > 0) {
            for (int i = 0; i < lineList.size(); i++) {
                ReadableMap readableMap = lineList.getMap(i);
                String width = readableMap.getString("width");
                String color = readableMap.getString("color");
                ReadableArray pointList = readableMap.getArray("line");
                int lineId = readableMap.getInt("lineId");
                if (lineId == -1) {
                    if (!TextUtils.isEmpty(width) && moreLineMap.size() > 0) {
                        for (PolylineOverlay polyline : moreLineMap.values()) {
                            polyline.setWidth(Integer.valueOf(width));
                        }
                    }
                    if (!TextUtils.isEmpty(color) && moreLineMap.size() > 0) {
                        for (PolylineOverlay polyline : moreLineMap.values()) {
                            polyline.setColor(Color.parseColor(color));
                        }
                    }
                } else {
                    if (moreLineMap.size() > 0 && moreLineMap.containsKey(lineId)) {
                        if (pointList != null && pointList.size() > 0) { // 更新指定线的经纬度
                            PolylineOverlay polyline = new PolylineOverlay(getPoint(pointList), isLineOrFaceMap.get(lineId));
                            polyline.setStrokeStyle(Overlay.StrokeStyle.solid);
                            if (!TextUtils.isEmpty(color)) {
                                polyline.setColor(Color.parseColor(color));
                            } else {
                                polyline.setColor(moreLineMap.get(lineId).getColor());
                            }
                            if (!TextUtils.isEmpty(width)) {
                                polyline.setWidth(Integer.valueOf(width));
                            } else {
                                polyline.setWidth(moreLineMap.get(lineId).getWidth());
                            }
                            if (moreLineMap.size() > 0 && moreLineMap.containsKey(lineId)) {
                                mapRenderer.removeOverlay(moreLineMap.get(lineId));
                                moreLineMap.remove(lineId);
                            }
                            moreLineMap.put(lineId, polyline); // 将对应的线添加到集合号中方便删除
                            mapRenderer.addOverlay(moreLineMap.get(lineId));
                        } else {
                            PolylineOverlay line = moreLineMap.get(lineId);
                            if (!TextUtils.isEmpty(color)) { // 更新指定线的颜色
                                line.setColor(Color.parseColor(color));
                            }
                            if (!TextUtils.isEmpty(width)) {  // 更新指定线的宽度
                                line.setWidth(Integer.valueOf(width));
                            }
                        }
                    }
                }
            }
        }
    }

    // 获取所有线的id
    public void getLineOverlayIds(Promise promise) {
        WritableArray more = Arguments.createArray();
        for (Integer lineId : moreLineMap.keySet()) {
            more.pushInt(lineId);
            LogUtils.logd(TAG, "getMoreLineId:" + lineId);
        }
        promise.resolve(more);
    }

    // 转换线的经纬度为NdsPoint
    private Point[] getPoint(ReadableArray pointList) {
        ArrayList<Point> list = new ArrayList<>();
        // 获取新的经纬度
        for (int j = 0; j < pointList.size(); j++) {
            ReadableMap pointMap = pointList.getMap(j);
            int longitude = pointMap.getInt("longitude"); // 经度
            int latitude = pointMap.getInt("latitude"); // 纬度
            Point point = new Point(longitude, latitude); // 根据经纬度构造Nds格式的坐标
            list.add(point);
        }
        return list.toArray(new Point[pointList.size()]);
    }

}
