package com.mapbar.react.map;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.mapbar.react.LogUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * 当前类注释:测试原生Toast模块
 * 项目名：android
 * 包名：com.modules.custom
 * 作者：江清清 on 16/3/31 10:18
 * 邮箱：jiangqqlmj@163.com
 * QQ： 781931404
 * 来源：<a href="http://www.lcode.org">江清清的技术专栏</>
 */
public class MapbarMapPackage implements ReactPackage {
    private String TAG = "MapbarMapPackage";

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new MapbarMapModule(reactContext));
        LogUtils.logd(TAG, "createNativeModules");
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        LogUtils.logd(TAG, "createViewManagers");
        return Arrays.<ViewManager>asList(
                new MapbarMapViewManager()
        );
    }
}
