package com.mapbar.react.map;

import android.content.Context;
import android.graphics.Point;
import android.os.Handler;
import android.os.Message;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.mapbar.react.LogUtils;
import com.mapbar.react.map.config.Constants;
import com.mapbar.react.map.operation.LineOverlay;
import com.mapbar.react.map.operation.PointAnnotation;
import com.mapbar.react.map.operation.PointIconOverlay;
import com.mapbar.map.Annotation;
import com.mapbar.map.MapRenderer;
import com.mapbar.map.MapView;
import com.mapbar.map.Overlay;
import com.mapbar.map.Vector2DF;
import com.mapbar.mapdal.NdsPoint;
import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

/**
 * 在view里面创建个handler，然后在SimpleViewManager 调用，把属性里面获取的参数传递到view中，
 * 然后在onSurfaceCreated里面做操作
 * <p/>
 * Created by Administrator on 2016/10/21.
 */
public class MapbarMapView extends MapView {
    private static final String TAG = "TubaMapView";
    private float startHeading;
    private float startLevel;
    private float startElevation;
    private Vector2DF mZoomLevelRange;
    private MapRenderer mapRenderer;
    private Point startPoint;
    private boolean mInited = false;
    private MapRenderer mRenderer = null;
    private float zoomLevel = -1;
    private Point worldCenterPoint;
    private boolean isMove = true;
    private Context context;
    private LineOverlay lineOverlay; // 划线
    private PointAnnotation pointAnnotation; // 打点
    private PointIconOverlay pointIconOverlay; // 打点

    public MapbarMapView(Context context) {
        super(context);
        this.context = context;
        lineOverlay = new LineOverlay(context);
        pointAnnotation = new PointAnnotation(context);
        pointIconOverlay = new PointIconOverlay(context);
//        initLocation();
    }

    public LineOverlay getLineOverlay() {
        return lineOverlay;
    }

    public PointAnnotation getPointAnnotation() {
        return pointAnnotation;
    }

    public PointIconOverlay getPointIconOverlay() {
        return pointIconOverlay;
    }

    // 获取TubaMapViewManager传递的属性值
    private Handler mhandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            switch (msg.what) {
                case Constants.MAPVIEW_ZOOM:
                    zoomLevel = (float) msg.obj;
                    if (mInited && mRenderer != null) {
                        mRenderer.setZoomLevel(zoomLevel);
                    }
                    break;
                case Constants.MAPVIEW_CENTER:
                    worldCenterPoint = (Point) msg.obj;
                    if (mInited && mRenderer != null) {
                        mRenderer.setWorldCenter(worldCenterPoint);
                    }
                    break;
                case Constants.MAPVIEW_FORBID_GESTURE:
                    isMove = (boolean) msg.obj;
                    break;
                case Constants.MAPVIEW_INIT_FINISH:
                    if (worldCenterPoint != null) {
                        mRenderer.setWorldCenter(worldCenterPoint);
                    }
                    if (zoomLevel > -1) {
                        mRenderer.setZoomLevel(zoomLevel);
                    }
                    break;
            }
        }
    };

    public Handler getHandler() {
        return mhandler;
    }

    public MapbarMapView(Context context, AttributeSet attributeSet) {
        super(context, attributeSet);
    }

    @Override
    public boolean onTouch(View view, MotionEvent motionEvent) {
        if (mapRenderer == null) {
            mapRenderer = getMapRenderer();
        }
        if (mZoomLevelRange == null) {
            mZoomLevelRange = mapRenderer.getZoomLevelRange();
        }
        switch (motionEvent.getAction()) {
            case MotionEvent.ACTION_DOWN:
                startPoint = mapRenderer.getMapState().worldCenter;
                startLevel = mapRenderer.getZoomLevel(); // 获取缩放级别
                startHeading = mapRenderer.getHeading(); // 获取角度 0 ~ 360
                startElevation = mapRenderer.getElevation();  // 获取2d 3d角度
                Log.d(TAG, "startLevel" + startLevel + "startHeading" + startHeading
                        + "startElevation" + startElevation + "startPoint" + startPoint.x + "----" + startPoint.y);
                break;
            case MotionEvent.ACTION_MOVE:
                break;
            case MotionEvent.ACTION_UP: // 注意：缩放，平移，旋转会同时发生
                Point endPoint = mapRenderer.getMapState().worldCenter;
                float endLevel = mapRenderer.getZoomLevel();
                float endHeading = mapRenderer.getHeading(); // 获取角度 0 ~ 360
                float endElevation = mapRenderer.getElevation();  // 获取2d 3d角度
                Log.d(TAG, "endLevel" + endLevel + "endHeading" + endHeading
                        + "endElevation" + endElevation + "endPoint" + endPoint.x + "----" + endPoint.y);
                if (startLevel < endLevel) { // 放大操作 max=14
                    Log.d(TAG, "放大操作");
                    WritableMap event = Arguments.createMap();
                    event.putString("zoomIn", "放大操作");//key用于js中的nativeEvent
                    event.putDouble("zoomIn", endLevel);
                    dispatchEvent(MapViewEvent.EVENT_ZOOMIN.toString(), event);
                } else if (startLevel > endLevel) { // 缩小操作 min=0
                    Log.d(TAG, "缩小操作");
                    WritableMap event = Arguments.createMap();
                    event.putString("zoomOut", "缩小操作");//key用于js中的nativeEvent
                    event.putDouble("zoomOut", endLevel);
                    dispatchEvent(MapViewEvent.EVENT_ZOOMOUT.toString(), event);
                } else if (endLevel >= mZoomLevelRange.getY()) {
                    Log.d(TAG, "已经是最大级别");
                    WritableMap event = Arguments.createMap();
                    event.putString("zoomMax", "已经是最大级别");//key用于js中的nativeEvent
                    event.putDouble("zoomMax", endLevel);
                    dispatchEvent(MapViewEvent.EVENT_ZOOMMAX.toString(), event);
                } else if (endLevel <= mZoomLevelRange.getX()) {
                    Log.d(TAG, "已经是最小级别");
                    WritableMap event = Arguments.createMap();
                    event.putString("zoomMin", "已经是最小级别");//key用于js中的nativeEvent
                    event.putDouble("zoomMin", endLevel);
                    dispatchEvent(MapViewEvent.EVENT_ZOOMMIN.toString(), event);
                }
                if (startElevation != endElevation || startHeading != endHeading) {
                    Log.d(TAG, "地图旋转事件");
                    WritableMap event = Arguments.createMap();
                    event.putString("rotate", "地图旋转事件");//key用于js中的nativeEvent
                    dispatchEvent(MapViewEvent.EVENT_ROTATE.toString(), event);
                }
                if (startPoint.x != endPoint.x || startPoint.y != endPoint.y) {
                    Log.d(TAG, "地图平移事件");
                    WritableMap event = Arguments.createMap();
                    event.putString("onSpan", "地图平移事件");//key用于js中的nativeEvent
                    dispatchEvent(MapViewEvent.EVENT_MOVE.toString(), event);
                }
                break;
        }
        if (isMove) {
            return super.onTouch(view, motionEvent);
        } else {
            return true;
        }
    }

//    private void sendEvent(String eventName, WritableMap params) {
//        //  将事件发生到javascript层
//        ReactContext reactContext = (ReactContext) getContext();
//        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                .emit(eventName, params);
//    }

    private void dispatchEvent(String eventName, WritableMap eventData) {
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),//native和js两个视图会依据getId()而关联在一起
                eventName,//事件名称
                eventData
        );
    }


    @Override
    public void onSurfaceCreated(GL10 gl10, EGLConfig eglConfig) {
        super.onSurfaceCreated(gl10, eglConfig);
        // 防止重复创建
        if (!mInited) {
            mRenderer = super.getMapRenderer();
            if (mRenderer == null)
                return;
            mInited = true;
            mhandler.sendEmptyMessage(Constants.MAPVIEW_INIT_FINISH);
            WritableMap params = Arguments.createMap();
            params.putString("init", "初始化完成");//key用于js中的nativeEvent
            dispatchEvent(MapViewEvent.EVENT_INIT.toString(), params);
        }
    }

    public enum MapViewEvent {

        EVENT_ONLOCATIONCHANGED("onLocationChanged"),
        EVENT_ZOOMIN("onZoomIn"),
        EVENT_ZOOMOUT("onZoomOut"),
        EVENT_ZOOMMAX("onZoomMax"),
        EVENT_ZOOMMIN("onZoomMin"),
        EVENT_ROTATE("onRotate"),
        EVENT_MOVE("onSpan"),
        EVENT_INIT("onInit"),
        EVENT_CLICK("onSingleClick"),
        EVENT_AIR_BUBBLE_SHOW("onShowBubble"),
        EVENT_ANNOTATION_CLICK("onAnnotationClick"),
        EVENT_ICON_OVERLAY_CLICK("onIconOverlayClick");

        private String mName;

        MapViewEvent(String name) {
            this.mName = name;
        }

        @Override
        public String toString() {
            return mName;
        }
    }

    // 地图点击事件
    @Override
    public void onSingleClick(Point point, boolean b) {
        super.onSingleClick(point, b);
        Log.d(TAG, "onSingleClick");
        WritableMap params = Arguments.createMap();
        params.putString("singleClick", "点击事件");//key用于js中的nativeEvent
        dispatchEvent(MapViewEvent.EVENT_CLICK.toString(), params);
    }

    @Override
    public void onAnnotationClicked(Annotation annotation, int i) {
        super.onAnnotationClicked(annotation, i);
//        annotation.showCallout(true);
        WritableMap clickParams = Arguments.createMap();
//        WritableMap params = Arguments.createMap();
        int pointId = annotation.getTag();
//        params.putBoolean("bubbleShow", true);
//        params.putInt("pointId", pointId);
        clickParams.putString("click", "onAnnotationClicked");
        clickParams.putInt("pointId", pointId);
        dispatchEvent(MapViewEvent.EVENT_ANNOTATION_CLICK.toString(), clickParams);
//        dispatchEvent(MapViewEvent.EVENT_AIR_BUBBLE_SHOW.toString(), params);
        Log.d(TAG, "bubbleShow pointId:" + pointId);
    }

    /**
     * 选择icon
     */
    @Override
    public void onAnnotationSelected(Annotation arg0) {
        super.onAnnotationSelected(arg0);
//        CustomAnnotation annotation = (CustomAnnotation) arg0;
//        Vector2DF pivot = new Vector2DF(0.5f, 0.9f);
//        annotation.setCustomIcon(pivot, BitmapFactory.decodeResource(getContext().getApplicationContext().getResources(), R.mipmap.ic_launcher));
        Log.d(TAG, "onAnnotationSelected:");
    }

    /**
     * 取消icon
     */
    @Override
    public void onAnnotationDeselected(Annotation annot) {
        super.onAnnotationDeselected(annot);
//        annot.showCallout(false);
//        WritableMap params = Arguments.createMap();
//        int pointId = annot.getTag();
//        params.putBoolean("bubbleShow", false);
//        params.putInt("pointId", pointId);
//        dispatchEvent(MapViewEvent.EVENT_AIR_BUBBLE_SHOW.toString(), params);
//        Log.d(TAG, "bubbleShow false pointId:" + pointId);
        Log.d(TAG, "onAnnotationDeselected:");
    }


    @Override
    public void onOverlayClicked(Overlay overlay, int i) {
        super.onOverlayClicked(overlay, i);
        WritableMap params = Arguments.createMap();
        int pointIconOverlayId = overlay.getTag();
        params.putString("onIconOverlayClick", "onIconOverlayClick");
        params.putInt("pointIconOverlayId", pointIconOverlayId);
        dispatchEvent(MapViewEvent.EVENT_ICON_OVERLAY_CLICK.toString(), params);
        LogUtils.logd(TAG, "onIconOverlayClick");
    }

    @Override
    public void onOverlaySelected(Overlay overlay, Point point) {
        super.onOverlaySelected(overlay, point);
        LogUtils.logd(TAG, "onOverlaySelected");
    }

    @Override
    public void onOverlaySelectedNds(Overlay overlay, NdsPoint ndsPoint) {
        super.onOverlaySelectedNds(overlay, ndsPoint);
        LogUtils.logd(TAG, "onOverlaySelectedNds");
    }

    @Override
    public void onOverlayDeselected(Overlay overlay) {
        super.onOverlayDeselected(overlay);
        LogUtils.logd(TAG, "onOverlayDeselected");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy");
        if (mhandler != null) {
            mhandler.removeCallbacksAndMessages(null);
            mhandler = null;
        }
    }
}
