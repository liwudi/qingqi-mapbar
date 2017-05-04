package com.mapbar.utils;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Build;
import android.os.Environment;
import android.os.storage.StorageManager;

import java.io.File;
import java.lang.reflect.Method;
import java.util.LinkedList;
import java.util.List;

/**
 * SDCARD状态类
 * 
 * @author xuzs
 * 
 */
public class SdcardUtil {

	public static String getExtDataPath(Context context) {
		List<String> paths = initSdcard2Paths(context);
		for (String path : paths) {
			File file = new File(path);
			if (file.exists() && file.canRead() && file.canWrite())
				return path;
		}
		return Environment.getExternalStorageDirectory().getAbsolutePath();
	}

	@SuppressLint("SdCardPath")
	private static List<String> initSdcard2Paths(Context context) {
		List<String> mSdcard2Paths = getSdcard2Paths(context);
		// 其它常用sdcard路径
		mSdcard2Paths.add("/mnt/emmc");
		mSdcard2Paths.add("/mnt/extsdcard");
		mSdcard2Paths.add("/mnt/ext_sdcard");
		mSdcard2Paths.add("/sdcard-ext");
		mSdcard2Paths.add("/mnt/sdcard-ext");
		mSdcard2Paths.add("/sdcard2");
		mSdcard2Paths.add("/sdcard");
		mSdcard2Paths.add("/mnt/sdcard2");
		mSdcard2Paths.add("/mnt/sdcard");
		mSdcard2Paths.add("/sdcard/sd");
		mSdcard2Paths.add("/sdcard/external");
		mSdcard2Paths.add("/flash");
		mSdcard2Paths.add("/mnt/flash");
		mSdcard2Paths.add("/mnt/sdcard/external_sd");
		mSdcard2Paths.add("/mnt/external1");
		mSdcard2Paths.add("/mnt/sdcard/extra_sd");
		mSdcard2Paths.add("/mnt/sdcard/_ExternalSD");
		mSdcard2Paths.add("/mnt/extrasd_bin");
		mSdcard2Paths.add("/storage/extSdCard");
		mSdcard2Paths.add("/storage/sdcard0");
		mSdcard2Paths.add("/storage/sdcard1");
		mSdcard2Paths.add("/mnt/extsd");
		mSdcard2Paths.add("/mnt/ext_sd");
		return mSdcard2Paths;
	}

	@SuppressLint("InlinedApi")
	private static List<String> getSdcard2Paths(Context context) {
		List<String> paths = new LinkedList<String>();
		if (Build.VERSION.SDK_INT < 13) {
			for (File file : new File("/mnt").listFiles())
				paths.add(file.getAbsolutePath());
			return paths;
		}

		StorageManager sm = (StorageManager) context.getSystemService(Context.STORAGE_SERVICE);
		try {
			Class<? extends StorageManager> clazz = sm.getClass();
			Method mlist = clazz.getMethod("getVolumeList", (Class[]) null);
			Class<?> cstrvol = Class.forName("android.os.storage.StorageVolume");
			Method mvol = cstrvol.getMethod("getPath", (Class[]) null);
			Object[] objects = (Object[]) mlist.invoke(sm);
			if (objects != null && objects.length > 0) {
				for (Object obj : objects) {
					paths.add((String) mvol.invoke(obj));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return paths;
	}
}
