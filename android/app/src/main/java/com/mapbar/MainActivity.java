package com.mapbar;

import android.content.res.Configuration;
import android.os.Bundle;
import android.os.Environment;
import android.util.DisplayMetrics;
import android.view.Display;

import com.cboy.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import com.mapbar.android.statistics.api.MapbarMobStat;
import com.mapbar.mapdal.Auth;
import com.mapbar.mapdal.NativeEnv;
import com.mapbar.mapdal.NativeEnvParams;
import com.mapbar.mapdal.NaviCore;
import com.mapbar.mapdal.SdkAuth;
import com.mapbar.mapdal.WorldManager;
import com.mapbar.react.LogUtils;
import com.mapbar.react.map.operation.Location;

public class MainActivity extends ReactActivity {
    private static final String TAG = "MainActivity";

    private static MainActivity activity;

    public static MainActivity getActivity() {
        return activity;
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);

        activity = this;

        LogUtils.init(MainActivity.this, "ReactABC");
        LogUtils.logd(TAG, LogUtils.getThreadName() + ">>>");
        init();
    }
    @Override
    protected void onStart() {
        // TODO Auto-generated method stub
        super.onStart();
        Location.onStartLocation();
    }
    @Override
    protected void onResume() {
        super.onResume();
        MapbarMobStat.onPageStart(this,"MainActivity");
    }

    @Override
    protected void onDestroy() {
        WorldManager.getInstance().cleanup();
        NativeEnv.cleanup();
        super.onDestroy();
        Location.onDestroyLocation();
        LogUtils.logd(TAG, LogUtils.getThreadName());
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "QingqiDriverApp";
    }


    // 激活key
    public static final String KEY = "qingqi001-20161017-01-Z-F-I10000";
    // 应用名
    private static String mAppName = null;
    // dpi
    private static String mAppPath = null;
    // dpi
    private static int mDensityDpi = 0;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected void onPause() {
        super.onPause();
        MapbarMobStat.onPageEnd(this,"MainActivity");
    }
    @Override
    protected void onStop() {
        // TODO Auto-generated method stub
        super.onStop();
        Location.onStopLocation();
    }

    /**
     * 初始化引擎所需的基础环境
     */
    private void init() {
        // 设置应用程序数据根目录
        // 存放包括导航离线数据，资源数据，运行是的临时数据文件等
        mAppPath = Environment.getExternalStorageDirectory().getPath() + "/mapbar/app";
        // 应用程序名称，不要修改
        mAppName = "qyfw";
        // 获取屏幕对应的DPI
        Display display = getWindowManager().getDefaultDisplay();
        DisplayMetrics dm = new DisplayMetrics();
        display.getMetrics(dm);
        mDensityDpi = dm.densityDpi;
        NativeEnvironmentInit(mAppName, KEY);

    }

    public void NativeEnvironmentInit(String appName, String key) {
        NativeEnvParams params = new NativeEnvParams(mAppPath, appName, mDensityDpi, key, new NativeEnv.AuthCallback() {
            @Override
            public void onDataAuthComplete(int errorCode) {
                String msg = null;
                switch (errorCode) {
                    case Auth.Error.deviceIdReaderError:
                        msg = "设备ID读取错误";
                        break;
                    case Auth.Error.expired:
                        msg = "数据文件权限已经过期";
                        break;
                    case Auth.Error.licenseDeviceIdMismatch:
                        msg = "授权文件与当前设备不匹配";
                        break;
                    case Auth.Error.licenseFormatError:
                        msg = "授权文件格式错误";
                        break;
                    case Auth.Error.licenseIncompatible:
                        msg = "授权文件存在且有效，但是不是针对当前应用程序产品的";
                        break;
                    case Auth.Error.licenseIoError:
                        msg = "授权文件IO错误";
                        break;
                    case Auth.Error.licenseMissing:
                        msg = "授权文件不存在";
                        break;
                    case Auth.Error.none:
                        msg = "数据授权成功";
                        break;
                    case Auth.Error.noPermission:
                        msg = "数据未授权";
                        break;
                    case Auth.Error.otherError:
                        msg = "其他错误";
                        break;
                }
                if (msg != null) {
                    LogUtils.logd(TAG,"NativeEnvironmentInit:"+msg);
                }
            }

            @Override
            public void onSdkAuthComplete(int errorCode) {
                String msg = null;
                switch (errorCode) {
                    case SdkAuth.ErrorCode.deviceIdReaderError:
                        msg = "授权设备ID读取错误";
                        break;
                    case SdkAuth.ErrorCode.expired:
                        msg = "授权KEY已经过期";
                        break;
                    case SdkAuth.ErrorCode.keyIsInvalid:
                        msg = "授权KEY是无效值，已经被注销";
                        break;
                    case SdkAuth.ErrorCode.keyIsMismatch:
                        msg = "授权KEY不匹配";
                        break;
                    case SdkAuth.ErrorCode.keyUpLimit:
                        msg = "授权KEY到达激活上线";
                        break;
                    case SdkAuth.ErrorCode.licenseDeviceIdMismatch:
                        msg = "设备码不匹配";
                        break;
                    case SdkAuth.ErrorCode.licenseFormatError:
                        msg = "SDK授权文件格式错误";
                        break;
                    case SdkAuth.ErrorCode.licenseIoError:
                        msg = "SDK授权文件读取错误";
                        break;
                    case SdkAuth.ErrorCode.licenseMissing:
                        msg = "SDK授权文件没有准备好";
                        break;
                    case SdkAuth.ErrorCode.networkContentError:
                        msg = "网络返回信息格式错误";
                        break;
                    case SdkAuth.ErrorCode.netWorkIsUnavailable:
                        msg = "网络不可用，无法请求SDK验证";
                        break;
                    case SdkAuth.ErrorCode.none:
                        msg = "SDK验证通过";
                        break;
                    case SdkAuth.ErrorCode.noPermission:
                        msg = "模块没有权限";
                        break;
                    case SdkAuth.ErrorCode.otherError:
                        msg = "其他错误";
                        break;
                }
                if (msg != null) {
                    LogUtils.logd(TAG,"onSdkAuthComplete:"+msg);
                }
            }
        });
        // params.sdkAuthOfflineOnly=true;
        NativeEnv.init(getApplicationContext(), params);
        NaviCore.getVersion();
        //NativeEnv
        WorldManager.getInstance().init();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }
}
