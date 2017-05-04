package com.mapbar.react;

import android.app.ActivityManager;
import android.content.Context;
import android.os.Environment;
import android.text.TextUtils;

import com.mapbar.R;

import java.lang.reflect.Field;
import java.util.List;
public class CommonUtils {

    /* 获取图片名称获取图片的资源id的方法
       * @param imageName
       * @return
              */
    public static int getResource(Context context, String imageName) {
        int resId = context.getApplicationContext().getResources().getIdentifier(imageName, "mipmap", context.getPackageName());
        return resId;
    }

    /**
     * 获取图片名称获取图片的资源id的方法
     *
     * @param imageName
     * @return
     */
    public static int getResourceByReflect(String imageName) {
        Class drawable = R.mipmap.class;
        Field field = null;
        int r_id;
        try {
            field = drawable.getField(imageName);
            r_id = field.getInt(field.getName());
        } catch (Exception e) {
            r_id = R.mipmap.hotel;
            LogUtils.logd("ERROR", "PICTURE NOT　FOUND！");
        }
        return r_id;
    }

    /**
     * 判断应用是否已经启动
     * @param context 一个context
     * @param packageName 要判断应用的包名
     * @return boolean
     */
    public static boolean isAppAlive(Context context, String packageName){
        ActivityManager activityManager =
                (ActivityManager)context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> processInfos
                = activityManager.getRunningAppProcesses();
        for(int i = 0; i < processInfos.size(); i++){
            if(processInfos.get(i).processName.equals(packageName)){
                LogUtils.logd("isAppAlive",
                        String.format("the %s is running, isAppAlive return true", packageName));
                return true;
            }
        }
        LogUtils.logd("NotificationLaunch",
                String.format("the %s is not running, isAppAlive return false", packageName));
        return false;
    }

    /**
     * 判断SDCard是否可用
     * <p>
     * [url=home.php?mod=space&uid=7300]@return[/url]
     */
    public static boolean isSDCardEnable() {
        return Environment.MEDIA_MOUNTED.equals(
                Environment.getExternalStorageState());

    }
    /**
     * 获取当前进程名
     * @param context
     * @return 进程名
     */
    public static final String getProcessName(Context context) {
        String processName = null;

        // ActivityManager
        ActivityManager am = ((ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE));

        while (true) {
            for (ActivityManager.RunningAppProcessInfo info : am.getRunningAppProcesses()) {
                if (info.pid == android.os.Process.myPid()) {
                    processName = info.processName;

                    break;
                }
            }

            // go home
            if (!TextUtils.isEmpty(processName)) {
                return processName;
            }

            // take a rest and again
            try {
                Thread.sleep(100L);
            } catch (InterruptedException ex) {
                ex.printStackTrace();
            }
        }
    }
}
