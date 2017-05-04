package com.mapbar.react.map.operation;

import android.content.Context;
import android.view.View;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by Administrator on 2016/10/27.
 */

public class BaseOverlay {

    public Context context;

    public BaseOverlay(Context context) {
        this.context = context;
    }

    public void dispatchEvent(View view, String eventName, WritableMap eventData) {
        ReactContext reactContext = (ReactContext) context;
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                view.getId(),//native和js两个视图会依据getId()而关联在一起
                eventName,//事件名称
                eventData
        );
    }
}
