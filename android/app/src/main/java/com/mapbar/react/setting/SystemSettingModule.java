package com.mapbar.react.setting;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by cryst on 2016/11/10.
 */
public class SystemSettingModule extends ReactContextBaseJavaModule {

    private Context context;
    private Activity currentActivity = null;
    private Intent intent = null;

    public SystemSettingModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "SystemSettingModule";
    }

    //打开网络设置
    @ReactMethod
    public void openNetWork () {
        if(this.currentActivity == null) this.currentActivity = getCurrentActivity();
        if(this.intent == null) this.intent = new Intent(Settings.ACTION_SETTINGS);
        if(this.currentActivity != null) this.currentActivity.startActivity(this.intent);
    }
}
