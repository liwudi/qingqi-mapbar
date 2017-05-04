package com.mapbar.utils;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.PixelFormat;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Environment;
import android.telephony.TelephonyManager;
import android.text.TextUtils;

import com.mapbar.android.guid.GUIDController;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.math.BigInteger;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.security.MessageDigest;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;

public class CommonUtil {

	/**
	 *
	 * <p>
	 * 功能描述
	 * </p>
	 * 设置hostname
	 *
	 * @return
	 * @author wangzhichao
	 * @date 2016年1月18日
	 */

	public static String getHostName(String URL) {
		String hostName = null;
		String urlTmp = null;
		if (URL.contains("http://")) {
			urlTmp = URL.replace("http://", "");
		} else if (URL.contains("https://")) {
			urlTmp = URL.replace("https://", "");
		}
		int indexOf = urlTmp.indexOf("/");
		if (indexOf > -1)
			hostName = urlTmp.substring(0, indexOf);
		return hostName;
	}

	/**
	 * 
	 * <p>
	 * 功能描述
	 * </p>
	 * 获取推送终端唯一账号
	 * 
	 * @return
	 * @author wangzhichao
	 * @date 2015年12月17日
	 */

	public static String getDeviceID(Context context) {
		boolean firstUsed = GUIDController.isFirstUsed(context,
				context.getPackageName());
		if (firstUsed)
			GUIDController.firstUse(context, context.getPackageName());
		String randomGUID = GUIDController.getRandomGUID(context);
		randomGUID = randomGUID.replaceAll("-", "");
		return randomGUID;
	}

	/**
	 * 获取版本号
	 * 
	 * @return 当前应用的版本号
	 */

	public static int getAPILevel(Context context) {
		try {
			int version = android.provider.Settings.System.getInt(
					context.getContentResolver(),
					android.provider.Settings.System.SYS_PROP_SETTING_VERSION,
					3);
			return version;
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	/**
	 * 获取版本号
	 * 
	 * @return 当前应用的版本号
	 */

	public static String getVersion(Context context) {
		try {
			PackageManager manager = context.getPackageManager();
			PackageInfo info = manager.getPackageInfo(context.getPackageName(),
					0);
			String version = info.versionName;
			return version;
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}

	public static boolean isWifiAvailable(Context context) {
		try {
			ConnectivityManager connectivity = (ConnectivityManager) context
					.getSystemService(Context.CONNECTIVITY_SERVICE);
			if (connectivity != null) {
				NetworkInfo info = connectivity.getActiveNetworkInfo();
				if (info != null && info.isConnected()) {
					if (info.getState() == NetworkInfo.State.CONNECTED) {
						if (info.getType() == ConnectivityManager.TYPE_WIFI)
							return true;
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return false;
	}

	/**
	 * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
	 */
	public static int dip2px(Context context, float dpValue) {
		final float scale = context.getResources().getDisplayMetrics().density;
		return (int) (dpValue * scale + 0.5f);
	}

	/**
	 * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
	 */
	public static int px2dip(Context context, float pxValue) {
		final float scale = context.getResources().getDisplayMetrics().density;
		return (int) (pxValue / scale + 0.5f);
	}

	/**
	 * 描述：SD卡是否能用.
	 *
	 * @return true 可用,false不可用
	 */
	public static boolean isCanUseSD() {
		try {
			return Environment.getExternalStorageState().equals(
					Environment.MEDIA_MOUNTED);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 
	 * 描述：获取版本信息
	 * 
	 * @param context
	 * @return
	 */

	public static PackageInfo isAppInstalled(Context context, String packagename) {
		PackageInfo packageInfo = null;
		try {
			packageInfo = context.getPackageManager().getPackageInfo(
					packagename, 0);
		} catch (NameNotFoundException e) {

		}
		return packageInfo;
	}

	/**
	 * 描述：获取版本信息依据apk文件获取所属信息
	 * 
	 * @param context
	 * @return
	 */

	public static PackageInfo getAPKInfo(Context context, String filePath) {
		PackageInfo packageInfo = null;
		File file = new File(filePath);
		if (file.exists()) {
			PackageManager packageManager = context.getPackageManager();
			packageInfo = packageManager.getPackageArchiveInfo(filePath,
					PackageManager.GET_ACTIVITIES);
		}
		return packageInfo;
	}

	public static Bitmap drawableToBitmap(Drawable drawable) {
		Bitmap bitmap = Bitmap
				.createBitmap(
						drawable.getIntrinsicWidth(),
						drawable.getIntrinsicHeight(),
						drawable.getOpacity() != PixelFormat.OPAQUE ? Bitmap.Config.ARGB_8888
								: Bitmap.Config.RGB_565);
		Canvas canvas = new Canvas(bitmap);
		drawable.setBounds(0, 0, drawable.getIntrinsicWidth(),
				drawable.getIntrinsicHeight());
		drawable.draw(canvas);
		return bitmap;
	}

	public static Drawable zoomDrawable(Drawable drawable, int w, int h) {
		int width = drawable.getIntrinsicWidth();
		int height = drawable.getIntrinsicHeight();
		Bitmap oldbmp = drawableToBitmap(drawable);
		Matrix matrix = new Matrix();
		float scaleWidth = ((float) w / width);
		float scaleHeight = ((float) h / height);
		matrix.postScale(scaleWidth, scaleHeight);
		Bitmap newbmp = Bitmap.createBitmap(oldbmp, 0, 0, width, height,
				matrix, true);
		oldbmp.recycle();
		return new BitmapDrawable(newbmp);
	}

	public static boolean isLegalURL(String url) {
		if (TextUtils.isEmpty("url")) {
			return false;
		}

		if (url.contains("http://") || url.contains("https://")) {
			return true;
		}
		return false;
	}

	/**
	 * 网络是否可用
	 * 
	 * @param context
	 * @return
	 */
	public static boolean isNetworkAvailable(Context context) {

		try {
			ConnectivityManager connectivity = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
			if (connectivity != null) {

				NetworkInfo info = connectivity.getActiveNetworkInfo();
				if (info != null && info.isConnected()) {

					if (info.getState() == NetworkInfo.State.CONNECTED) {
						return true;
					}
				}
			}
		} catch (Exception e) {
			return false;
		}
		return false;
	}

	/**
	 * Gps是否打开
	 * 
	 * @param context
	 * @return
	 */
	public static boolean isGpsEnabled(Context context) {
		LocationManager locationManager = ((LocationManager) context
				.getSystemService(Context.LOCATION_SERVICE));
		List<String> accessibleProviders = locationManager.getProviders(true);
		return accessibleProviders != null && accessibleProviders.size() > 0;
	}

	/**
	 * wifi是否打开
	 */
	public static boolean isWifiEnabled(Context context) {
		ConnectivityManager mgrConn = (ConnectivityManager) context
				.getSystemService(Context.CONNECTIVITY_SERVICE);
		TelephonyManager mgrTel = (TelephonyManager) context
				.getSystemService(Context.TELEPHONY_SERVICE);
		return ((mgrConn.getActiveNetworkInfo() != null && mgrConn
				.getActiveNetworkInfo().getState() == NetworkInfo.State.CONNECTED) || mgrTel
				.getNetworkType() == TelephonyManager.NETWORK_TYPE_UMTS);
	}

	/**
	 * 判断当前网络是否是wifi网络
	 * if(activeNetInfo.getType()==ConnectivityManager.TYPE_MOBILE) { //判断3G网
	 * 
	 * @param context
	 * @return boolean
	 */
	public static boolean isWifi(Context context) {
		ConnectivityManager connectivityManager = (ConnectivityManager) context
				.getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo activeNetInfo = connectivityManager.getActiveNetworkInfo();
		if (activeNetInfo != null
				&& activeNetInfo.getType() == ConnectivityManager.TYPE_WIFI) {
			return true;
		}
		return false;
	}

	/**
	 * 得到当前的手机网络类型
	 * 
	 * @param context
	 * @return
	 */
	public static String getCurrentNetType(Context context) {
		String type = "";
		ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo info = cm.getActiveNetworkInfo();
		if (info == null) {
			type = "null";
		} else if (info.getType() == ConnectivityManager.TYPE_WIFI) {
			type = "wifi";
		} else if (info.getType() == ConnectivityManager.TYPE_MOBILE) {
			int subType = info.getSubtype();
			if (subType == TelephonyManager.NETWORK_TYPE_CDMA
					|| subType == TelephonyManager.NETWORK_TYPE_GPRS
					|| subType == TelephonyManager.NETWORK_TYPE_EDGE) {
				type = "2g";
			} else if (subType == TelephonyManager.NETWORK_TYPE_UMTS
					|| subType == TelephonyManager.NETWORK_TYPE_HSDPA
					|| subType == TelephonyManager.NETWORK_TYPE_EVDO_A
					|| subType == TelephonyManager.NETWORK_TYPE_EVDO_0
					|| subType == TelephonyManager.NETWORK_TYPE_EVDO_B) {
				type = "3g";
			} else if (subType == TelephonyManager.NETWORK_TYPE_LTE) {// LTE是3g到4g的过渡，是3.9G的全球标准
				type = "4g";
			}
		}
		return type;
	}

	/**
	 * 获取手机ip地址
	 * 
	 * @return
	 */
	public static String getPhoneIp() {
		try {
			for (Enumeration<NetworkInterface> en = NetworkInterface
					.getNetworkInterfaces(); en.hasMoreElements();) {
				NetworkInterface intf = en.nextElement();
				for (Enumeration<InetAddress> enumIpAddr = intf
						.getInetAddresses(); enumIpAddr.hasMoreElements();) {
					InetAddress inetAddress = enumIpAddr.nextElement();
					if (!inetAddress.isLoopbackAddress()
							&& inetAddress instanceof Inet4Address) {
						// if (!inetAddress.isLoopbackAddress() && inetAddress
						// instanceof Inet6Address) {
						return inetAddress.getHostAddress().toString();
					}
				}
			}
		} catch (Exception e) {
		}
		return "";
	}


	
	/**
	 * 转换文件大小
	 * 
	 * @param fileS
	 * @return
	 */
	
	public static String FormetFileSize(long fileS) {
		DecimalFormat df = new DecimalFormat("#.00");
		String fileSizeString = "";
		if (fileS < 1024) {
			fileSizeString = df.format((double) fileS) + "B";
		} else if (fileS < 1048576) {
			fileSizeString = df.format((double) fileS / 1024) + "KB";
		} else if (fileS < 1073741824) {
			fileSizeString = df.format((double) fileS / 1048576) + "MB";
		} else {
			fileSizeString = df.format((double) fileS / 1073741824) + "GB";
		}
		return fileSizeString;
	}
	
	/**
	 * 
	* @Title: chooseUriToPackageName 
	* @Description: 获取考拉
	* @return String :
	* @author : wangzc
	* @date 2016年5月9日
	 */
	
	public static String chooseUriToPackageName(String packageName){
		String uri = null;
		if("com.itings.myradio.siwei.book".equalsIgnoreCase(packageName))
			uri = "wedrive.kaolabook:";
		else if("com.itings.myradio.siwei.star".equalsIgnoreCase(packageName))
			uri = "wedrive.kaolastar:";
		else if("com.itings.myradio.siwei.news".equalsIgnoreCase(packageName))
			uri = "wedrive.kaolanews:";
		else if("com.itings.myradio.siwei.music".equalsIgnoreCase(packageName))
			uri = "wedrive.kaolamusic:";
		else if("com.wedrive.welink.violation".equalsIgnoreCase(packageName))
			uri = "wedrive.violation:";
		else if("com.ximalaya.ting.android.car".equalsIgnoreCase(packageName))
			uri = "tingcar://open";
		else if("cn.TuHu.android.vehicle".equalsIgnoreCase(packageName))
			uri = "wedrive.tuhu:";
		else if("com.etcpowner.automapbar".equalsIgnoreCase(packageName))
			uri = "wedrive.etcp:";
		else if("com.sohu.tv".equalsIgnoreCase(packageName))
			uri = "wedrive.sohu:";		
		else if("com.wedrive.welink.dianping".equalsIgnoreCase(packageName))
			uri = "wedrive.dianping:";
		else if("com.wedrive.welink.news".equalsIgnoreCase(packageName))
			uri = "wedrive.news:";
		else if("com.wedrive.welink.aitalk".equalsIgnoreCase(packageName))
			uri = "wedrive.aitalk:";
		else if("com.funshion.video.pad.wedrive".equalsIgnoreCase(packageName))
			uri = "wedrive.funshion:";
		else if("com.flightmanager.tv".equalsIgnoreCase(packageName))
			uri = "wedrive.airsteward:";
		else if("com.qiyi.video.pad".equalsIgnoreCase(packageName))
			uri = "wedrive.iqiyi:";
		else if("com.youku.phone".equalsIgnoreCase(packageName))
			uri = "wedrive.youku:";
		return uri;
	}

	/**
	 * @Description: 得到文件的MD5值并比较与原来的MD5值是否一样
	 * @param packagePath
	 * @param crc
     * @return
     */

	public static boolean verifyInstallPackage(String packagePath, String crc) {
		try {
			MessageDigest sig = MessageDigest.getInstance("MD5");
			File packageFile = new File(packagePath);
			InputStream signedData = new FileInputStream(packageFile);
			byte[] buffer = new byte[4096];//每次检验的文件区大小
			long toRead = packageFile.length();
			long soFar = 0;
			boolean interrupted = false;
			while (soFar < toRead) {
				interrupted = Thread.interrupted();
				if (interrupted) break;
				int read = signedData.read(buffer);
				soFar += read;
				sig.update(buffer, 0, read);
			}
			byte[] digest = sig.digest();
			String digestStr = bytesToHexString(digest);//将得到的MD5值进行移位转换
			digestStr = digestStr.toLowerCase();
			crc = crc.toLowerCase();
			if (digestStr.equals(crc)) {//比较两个文件的MD5值，如果一样则返回true
				return true;
			}
		} catch (Exception e) {
			return false;
		}
		return false;
	}

	/**
	 * @Description: 将得到的MD5值进行移位转换
	 * @return
	 */

	public static String bytesToHexString(byte[] src) {
		StringBuilder stringBuilder = new StringBuilder("");
		if (src == null || src.length <= 0) {
			return null;
		}
		int i = 0;
		while (i < src.length) {
			int v;
			String hv;
			v = (src[i] >> 4) & 0x0F;
			hv = Integer.toHexString(v);
			stringBuilder.append(hv);
			v = src[i] & 0x0F;
			hv = Integer.toHexString(v);
			stringBuilder.append(hv);
			i++;
		}
		return stringBuilder.toString();
	}

	/**
	 * 计算文件md5
	 * @param file
	 * @return
	 */

	public static boolean verifyFileMD5(File file, String md5) {
		if(!file.isFile()){
			return false;
		}
		MessageDigest digest = null;
		FileInputStream in=null;
		byte buffer[] = new byte[1024];
		int len;
		try {
			digest = MessageDigest.getInstance("MD5");
			in = new FileInputStream(file);
			while ((len = in.read(buffer, 0, 1024)) != -1) {
				digest.update(buffer, 0, len);
			}
			in.close();
			BigInteger bigInt = new BigInteger(1, digest.digest());
			if (bigInt.toString(16).equals(md5)) {//比较两个文件的MD5值，如果一样则返回true
				return true;
			}
		} catch (Exception e) {
			return false;
		}
		return false;
	}


}
