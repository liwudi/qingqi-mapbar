package com.mapbar.react.push;

import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.content.LocalBroadcastManager;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.mapbar.pushservice.mapbarpush.MapbarPushInterface;
import com.mapbar.pushservice.mapbarpush.PushConfigs;
import com.mapbar.pushservice.mapbarpush.constants.PushConstants;
import com.mapbar.react.LogUtils;

/**
 * Created by Administrator on 2016/10/18.
 */
public class MarbarPushModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    @Override
    public void onHostResume() {
        LogUtils.logd(LogTag,"onHostResume");
    }

    @Override
    public void onHostPause() {
        LogUtils.logd(LogTag,"onHostPause");
    }

    @Override
    public void onHostDestroy() {
        LogUtils.logd(LogTag, "Unregister inner message receiver");
    }
    private Context context;
    private ReactApplicationContext reactContext;
    private static final String LogTag = "MarbarPushModule";
    private  final String notificationReceive = "notificationReceive";
    private  final String notificationClick = "notificationClick";
    private  final String messageReceiver = "messageReceiver";
    private BroadcastReceiver innerReceiver;
    private IntentFilter innerFilter;
    private String tag="MarbarPushModule";
    public MarbarPushModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        this.reactContext = reactContext;
        this.context = reactContext.getApplicationContext();
        innerReceiver = new InnerMessageReceiver(this);
        innerFilter = new IntentFilter();
        innerFilter.addAction(MyMessagePushReceiver.MActionOnMessageReceived);
        innerFilter.addAction(MyMessagePushReceiver.MActionOnNotificationClicked);
        innerFilter.addAction(MyMessagePushReceiver.MActionOnNotificationReceived);
        LocalBroadcastManager.getInstance(this.context).registerReceiver(this.innerReceiver,
                this.innerFilter);
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "MarbarPushModule";
    }

    @ReactMethod
    public void showToast(String str) {
        Toast.makeText(context, str, Toast.LENGTH_LONG).show();
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        this.reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    public void sendEvent(Intent intent) {
        Bundle payload = intent.getExtras().getBundle("data");
        WritableMap params;
        switch (intent.getAction()) {
            case MyMessagePushReceiver.MActionOnMessageReceived:
                params = Arguments.createMap();
                params.putString("Content", payload.getString("Content"));
                params.putString("Title", payload.getString("Title"));
                params.putString("CustomContent", payload.getString("CustomContent"));
                LogUtils.logd(LogTag, "onMessageReceived " + payload.toString());
                sendEvent(messageReceiver, params);
                break;
            case MyMessagePushReceiver.MActionOnNotificationClicked:
                params = Arguments.createMap();
                params.putString("Content", payload.getString("Content"));
                params.putString("Title", payload.getString("Title"));
                params.putString("CustomContent", payload.getString("CustomContent"));
                params.putInt("noticeId", payload.getInt("noticeId"));
                LogUtils.logd(LogTag, "onNotificationClicked " + payload.toString());
                sendEvent(notificationClick, params);
                break;
            case MyMessagePushReceiver.MActionOnNotificationReceived:
                params = Arguments.createMap();
                params.putString("Content", payload.getString("Content"));
                params.putString("Title", payload.getString("Title"));
                params.putString("CustomContent", payload.getString("CustomContent"));
                params.putInt("noticeId", payload.getInt("noticeId"));
                LogUtils.logd(LogTag, "onNotificationReceived " + payload.toString());
                sendEvent(notificationReceive, params);
                break;
        }
    }


    @ReactMethod
    public void unregisterPush() {
        MapbarPushInterface.stop(context);
    }

    @ReactMethod
    public void setTag(String tag) {
        MapbarPushInterface.setPushTag(context, tag);
    }

    @ReactMethod
    public void deleteTag(String tag) {
        MapbarPushInterface.deletePushTag(context, tag);
    }

    //推送获取设备id
    @ReactMethod
    public void getDeviceId( Promise promise) {
        SharedPreferences sharedPrefs = context.getSharedPreferences(PushConfigs.SHARED_PREFERENCE_NAME,Context.MODE_PRIVATE);
        String  deviceid = sharedPrefs.getString(PushConstants.DEVICE_ID, "");
        WritableMap more = Arguments.createMap();
        more.putString("deviceId",deviceid);
        promise.resolve(more);
    }
   //根据noticeid 清除通知
    @ReactMethod
    public void cancelNotifacation(int noticeId,Promise promise) {
        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        WritableMap more = Arguments.createMap();
        if (noticeId > 0) {
            notificationManager.cancel(noticeId);
            more.putInt("delete noticeId",noticeId);
        }else{
            notificationManager.cancelAll();
            more.putInt("delete all",noticeId);
        }
        LogUtils.logd(tag,"deleteNotifacation:"+noticeId);
        promise.resolve(more);
    }
}
