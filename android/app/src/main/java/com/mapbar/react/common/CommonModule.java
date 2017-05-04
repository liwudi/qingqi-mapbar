package com.mapbar.react.common;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.text.TextUtils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.mapbar.BuildConfig;
import com.mapbar.nim.LogoutHelper;
import com.mapbar.nim.MessageServer;
import com.mapbar.nim.Preferences;
import com.mapbar.react.CommonUtils;
import com.mapbar.react.LogUtils;
import com.mapbar.react.common.operation.ContactsOperation;
import com.mapbar.react.common.operation.HttpPostUpload;
import com.mapbar.react.common.operation.MediaPlayerOperation;
import com.mapbar.react.common.operation.MediaRecorderOperation;
import com.netease.nim.uikit.session.fragment.MessageFragment;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.auth.AuthService;
import com.nostra13.universalimageloader.core.ImageLoader;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2016/10/18.
 */
public class CommonModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private Context context;
    private String TAG = "CommonModule";

    public CommonModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "CommonModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("server_type", BuildConfig.server_type);
        constants.put("DEBUG", BuildConfig.DEBUG);
        constants.put("APPLICATION_ID", BuildConfig.APPLICATION_ID);
        constants.put("VERSION_CODE", BuildConfig.VERSION_CODE);
        constants.put("VERSION_NAME", BuildConfig.VERSION_NAME);
        constants.put("server_url", BuildConfig.server_url);
        return constants;
    }

    //获取联系人
    @ReactMethod
    public void getContacts(Promise promise) {
        ContactsOperation operation = new ContactsOperation(context);
        operation.getContacts(promise);
    }

    //开始录音
    @ReactMethod
    public void startAudio(Promise promise) {
        if (CommonUtils.isSDCardEnable()) {
            MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
            mAudioManager.prepareAudio(promise);
        } else {
            promise.reject("prepareAudio", "录音前请确保手机有SD卡");
        }
    }

    //暂停录音
    @ReactMethod
    public void stopAudio(Promise promise) {
        MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
        long recordTime = mAudioManager.release();
        LogUtils.logd(TAG, "recordTime:" + recordTime);
        if (recordTime == 0) {
            promise.reject("error", "请先录音");
        } else if (recordTime < 600) {
            mAudioManager.deleteCurrentAudio();
            promise.reject("error", "录音时间过短，请重新录音");
        } else {
            WritableMap writableMap = Arguments.createMap();
            writableMap.putString("finishAudio", "录音成功");
            writableMap.putBoolean("isRecording", false);
            writableMap.putString("audioPath", mAudioManager.getCurrentFilePath());
            promise.resolve(writableMap);
        }
    }

    //播放录音
    @ReactMethod
    public void playAudio(String audioPath, Promise promise) {
        MediaPlayerOperation.playSound(audioPath, promise);
    }

    //暂停播放
    @ReactMethod
    public void pauseAudioPlay(Promise promise) {
        MediaPlayerOperation.pause(promise);
    }

    //暂停播放后恢复播放
    @ReactMethod
    public void resumeAudioPlay() {
        MediaPlayerOperation.resume();
    }

    //获取录音总时长
    @ReactMethod
    public void getPlayAudioDuration(String audioPath, Promise promise) {
        MediaPlayerOperation.getDuration(audioPath, promise);
    }

    //获取当前录音点
    @ReactMethod
    public void getPlayAudioPosition(Promise promise) {
        MediaPlayerOperation.getCurrentPosition(promise);
    }

    //指定到播放位置。
    @ReactMethod
    public void seekTo(int millis,Promise promise) {
        MediaPlayerOperation.seekTo(millis,promise);
    }

    //获取录音音频，用于页面声音波动动画。
    @ReactMethod
    public void getVoiceLevel(int millis,Promise promise) {
        MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
        int voiceLevel = mAudioManager.getVoiceLevel(millis);
        WritableMap writableMap = Arguments.createMap();
        writableMap.putInt("voiceLevel", voiceLevel);
        promise.resolve(writableMap);
    }
    //删除所有录音文件
    @ReactMethod
    public void deleteAllAudio() {
        MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
        mAudioManager.deleteAllAudio();
    }
    //删除某个录音文件
    @ReactMethod
    public void deleteAudio(String audioPath) {
        MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
        mAudioManager.deleteAudio(audioPath);
    }
    @Override
    public void onHostResume() {
//        MediaPlayerOperation.resume();
    }

    @Override
    public void onHostPause() {
//        MediaPlayerOperation.pause();
    }

    @Override
    public void onHostDestroy() {
        MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
        mAudioManager.release();
        MediaPlayerOperation.release();
    }

    //上传
    @ReactMethod
    public void HttpPostUpload(String url, ReadableMap params, ReadableMap headers, Promise promise) {
        HttpPostUpload httpPostUpload = new HttpPostUpload();
        try {
            httpPostUpload.upload(url, params, headers, promise);
        } catch (Exception e) {
            promise.reject(e);
            e.printStackTrace();
        }
    }

    /*上传File 文件
    * filePaths  文件路径url
    * */
    @ReactMethod
    public void HttpPostUploadFile(String url, ReadableArray filePaths, Promise promise) {
        HttpPostUpload httpPostUpload = new HttpPostUpload();
        try {
            httpPostUpload.uploadFile(url, filePaths, promise);
        } catch (Exception e) {
            promise.reject(e);
            e.printStackTrace();
        }
    }

    /* 打开客服
    * */
    @ReactMethod
    public void startKefuActivity(final String userId,final String kefuId,final String type,final String nimToken,String dialogId) {
        ImageLoader.getInstance().clearMemoryCache();
        MessageServer messageServer =new MessageServer(((ReactContext) context).getCurrentActivity());
        messageServer.prepare(userId,kefuId,type,nimToken);
        MessageFragment.setDialogId(dialogId);
    }

    /* 打开客服
    * */
    @ReactMethod
    public void logOutKefu(final String userId) {

        String account = Preferences.getUserAccount();
        String token = Preferences.getUserToken();
        if (!TextUtils.isEmpty(account) && !TextUtils.isEmpty(token) && !account.equals(userId)) {
            Preferences.saveUserToken("");
            LogoutHelper.logout();
            NIMClient.getService(AuthService.class).logout();
        }
    }

    /* 获取server_url
           * */
    @ReactMethod
    public void getServerUrl(Promise promise) {
        WritableMap writableMap = Arguments.createMap();
        writableMap.putString("serverUrl", BuildConfig.server_url);
        promise.resolve(writableMap);
    }

    /**
     * 获取版本信息
     * @param promise
     */
    @ReactMethod
    public void getVersionInfo(Promise promise) {
        PackageInfo packageInfo = getPackageInfo(context);

        WritableMap writableMap = Arguments.createMap();
        writableMap.putString("versionName", packageInfo.versionName);
        writableMap.putInt("versionCode", packageInfo.versionCode);

        promise.resolve(writableMap);
    }

    private static PackageInfo getPackageInfo(Context context) {
        PackageInfo pi = null;

        try {
            PackageManager pm = context.getPackageManager();
            pi = pm.getPackageInfo(context.getPackageName(),
                    PackageManager.GET_CONFIGURATIONS);

            return pi;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return pi;
    }

}
