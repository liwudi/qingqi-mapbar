package com.mapbar.react.update;

import android.app.Activity;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.lidroid.xutils.HttpUtils;
import com.lidroid.xutils.exception.HttpException;
import com.lidroid.xutils.http.HttpHandler;
import com.lidroid.xutils.http.ResponseInfo;
import com.lidroid.xutils.http.callback.RequestCallBack;
import com.mapbar.MainActivity;
import com.mapbar.MainApplication;
import com.mapbar.react.LogUtils;
import com.mapbar.utils.AppUtil;
import com.mapbar.utils.CommonUtil;

import java.io.File;

/**
 * Created by admin on 2017/3/1.
 */

public class UpdateModule extends ReactContextBaseJavaModule {

    private Activity mBaseActivity;
    static ReactApplicationContext reactContext;
    static DownloadInfo downloadInfo  = new DownloadInfo();

    public UpdateModule(ReactApplicationContext reactContext) {
        super(reactContext);
        UpdateModule.reactContext = reactContext;
    }

    static void sendEvent(String eventName, @Nullable WritableMap params) {
        UpdateModule.reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    /**
     *
     * <p>功能描述</p>执行更新功能
     * @param apk_md5
     * @author wangzhichao
     * @date 2015年9月10日
     */
    public void updateVersion(final String apk_path,final String apk_md5, final boolean isResume){

        this.mBaseActivity = MainActivity.getActivity();

        final String savePath= MainApplication.downloadRootPath + apk_path.substring(apk_path.lastIndexOf("/"));

        if(downloadInfo.getHandler() != null && !downloadInfo.getHandler().isCancelled()){
            downloadInfo.getHandler().cancel();
        }

        downloadInfo.setDownloadUrl(apk_path);
        downloadInfo.setFileSavePath(savePath);
        downloadInfo.setMd5(apk_md5);
        downloadInfo.setAutoRename(false);
        downloadInfo.setAutoResume(true);

        File file=new File(savePath);
        if(file.exists()) {

            if(CommonUtil.verifyFileMD5(file,apk_md5)){//校验通过
                WritableMap event = Arguments.createMap();
                event.putInt("STATE", 3);
                sendEvent("UPDATE_APP_STATE", event);
                AppUtil.installApp(mBaseActivity, file);
                return;
            }

            if(isResume){
                file.delete();
            }

        }

        RequestCallBack<File> requestCallBack=new RequestCallBack<File>() {

            public void onStart() {
                LogUtils.logd("app update","start download app");

                WritableMap event = Arguments.createMap();
                event.putInt("STATE", 1);
                sendEvent("UPDATE_APP_STATE", event);
            }

            public void onCancelled() {
                LogUtils.logd("app update","cancel download app");
                WritableMap event = Arguments.createMap();
                event.putInt("STATE", 2);
                sendEvent("UPDATE_APP_STATE", event);
//                if(mBaseActivity!=null && !mBaseActivity.isFinishing()){
//                    mBaseActivity.hideProgressDialog();
//                    mBaseActivity.finish();
//                }
            }

            @Override
            public void onSuccess(ResponseInfo<File> result) {
                LogUtils.logd("app update","download onSuccess");
                File file=result.result;
                if(file!=null && file.exists()){
                    if(CommonUtil.verifyFileMD5(file,apk_md5)){//校验通过
                        WritableMap event = Arguments.createMap();
                        event.putInt("STATE", 3);
                        sendEvent("UPDATE_APP_STATE", event);
                        AppUtil.installApp(mBaseActivity, file);
                    }else{//校验失败
                        file.delete();
                        WritableMap event = Arguments.createMap();
                        event.putInt("STATE", 4);
                        sendEvent("UPDATE_APP_STATE", event);
                        LogUtils.logd("app update","download file md5 check fail");
                    }
                }
            }

            @Override
            public void onFailure(HttpException arg0, String arg) {
                WritableMap event = Arguments.createMap();
                event.putInt("STATE", 5);
                sendEvent("UPDATE_APP_STATE", event);
                LogUtils.logd("app update","download onFailure");
            }

            @Override
            public void onLoading(long total, long current, boolean isUploading) {
                WritableMap event = Arguments.createMap();
                event.putInt("STATE", 6);
                event.putDouble("TOTAL",total);
                event.putDouble("CURRENT",current);
                event.putBoolean("IS_UPLOADING",isUploading);
                sendEvent("UPDATE_APP_STATE", event);
                super.onLoading(total, current, isUploading);
            }

        };



        HttpHandler<File> handler = new HttpUtils().download(
                downloadInfo.getDownloadUrl(),
                downloadInfo.getFileSavePath(),
                downloadInfo.isAutoResume(),
                downloadInfo.isAutoRename(),
                requestCallBack);

        downloadInfo.setHandler(handler);
        downloadInfo.setState(handler.getState());
    }

    @ReactMethod
    public void update(final String apk_path,final String apk_md5) {
        this.updateVersion(apk_path, apk_md5, false);
    }

    @ReactMethod
    public void pauseTask(){
        if (downloadInfo.getHandler() != null && !downloadInfo.getHandler().isCancelled()) {
            downloadInfo.getHandler().cancel();
        }
    }

    @ReactMethod
    public void resumeTask(){//继续下载
        this.updateVersion(downloadInfo.getDownloadUrl(),downloadInfo.getMd5(), false);
    }

    @ReactMethod
    public void restartTask(){//重新下载
        this.updateVersion(downloadInfo.getDownloadUrl(),downloadInfo.getMd5(), true);
    }

    @ReactMethod
    public void cancelTask(){
        downloadInfo.getHandler().cancel();
    }

    @Override
    public String getName() {
        return "UpdateModule";
    }
}
