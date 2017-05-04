package com.mapbar;

import android.annotation.TargetApi;
import android.app.Application;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Environment;
import android.support.v4.content.ContextCompat;
import android.text.TextUtils;
import android.widget.Toast;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactApplication;
import io.rnkit.actionsheetpicker.ASPickerViewPackage;

import com.mapbar.react.update.UpdatePackage;
import com.mapbar.utils.SdcardUtil;
import com.remobile.toast.RCTToastPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.joanzapata.iconify.Iconify;
import com.mapbar.android.statistics.api.MapbarMobStat;
import com.mapbar.nim.DemoCache;
import com.mapbar.nim.Preferences;
import com.mapbar.nim.UserPreferences;
import com.mapbar.pushservice.mapbarpush.MapbarPushInterface;
import com.mapbar.pushservice.mapbarpush.PushConfigs;
import com.mapbar.pushservice.mapbarpush.provider.DeviceInfoHelper;
import com.mapbar.react.CommonUtils;
import com.mapbar.react.common.CommonPackage;
import com.mapbar.react.map.MapbarMapPackage;
import com.mapbar.react.push.MarbarPushPackage;
import com.mapbar.react.setting.SystemSettingPackage;
import com.netease.nim.uikit.EntypoFonts.EntypoFontDescriptor;
import com.netease.nim.uikit.ImageLoaderKit;
import com.netease.nim.uikit.NimUIKit;
import com.netease.nim.uikit.cache.FriendDataCache;
import com.netease.nim.uikit.cache.NimUserInfoCache;
import com.netease.nim.uikit.cache.TeamDataCache;
import com.netease.nim.uikit.common.util.log.LogUtil;
import com.netease.nim.uikit.contact.ContactProvider;
import com.netease.nim.uikit.session.module.MsgRevokeFilter;
import com.netease.nim.uikit.session.viewholder.MsgViewHolderThumbBase;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.SDKOptions;
import com.netease.nimlib.sdk.StatusBarNotificationConfig;
import com.netease.nimlib.sdk.auth.LoginInfo;
import com.netease.nimlib.sdk.msg.constant.SessionTypeEnum;
import com.netease.nimlib.sdk.msg.model.IMMessage;
import com.netease.nimlib.sdk.team.model.Team;
import com.netease.nimlib.sdk.uinfo.UserInfoProvider;
import com.netease.nimlib.sdk.uinfo.model.NimUserInfo;
import com.oblador.vectoricons.VectorIconsPackage;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import fr.bamlab.rnimageresizer.ImageResizerPackage;

public class MainApplication extends Application implements ReactApplication {
  private static final String TAG = "MainApplication";

  public static String downloadRootPath;
  public static String imageDownloadPath;
  public static String apkDownloadPath;
  public static String dataBaseloadPath;

  private static MainApplication instance;

  public static MainApplication getInstance() {
    return instance;
  }

  /**
   *
   * <p>
   * 功能描述
   * </p>
   * 初始化文件资源
   *
   * @author wangzhichao
   * @date 2015年9月6日
   */

  private void initFile() {
    String rootPath= SdcardUtil.getExtDataPath(instance);
    if(TextUtils.isEmpty(rootPath)){
      Toast.makeText(this,"无法识别的设备的存储路径",Toast.LENGTH_SHORT).show();
      android.os.Process.killProcess(android.os.Process.myPid());
      System.exit(0);
      return;
    }
    File root = new File(rootPath);//依据手机获取内置或外置存储卡路径

    File downloadRootDir = new File(root.getAbsolutePath() + File.separator + Configs.DOWNLOAD_ROOT_DIR + File.separator);
    if (!downloadRootDir.exists()) {
      downloadRootDir.mkdirs();
    }
    downloadRootPath = downloadRootDir.getAbsolutePath();

    File cacheDownloadDirFile = new File(root.getAbsolutePath() + File.separator + Configs.DOWNLOAD_IMAGE_DIR + File.separator);
    if (!cacheDownloadDirFile.exists()) {
      cacheDownloadDirFile.mkdirs();
    }
    imageDownloadPath = cacheDownloadDirFile.getAbsolutePath();

    File fileDownloadDirFile = new File(root.getAbsolutePath() + File.separator + Configs.DOWNLOAD_APK_DIR + File.separator);
    if (!fileDownloadDirFile.exists()) {
      fileDownloadDirFile.mkdirs();
    }
    apkDownloadPath = fileDownloadDirFile.getAbsolutePath();

    File dataBaseDirFile = new File(root.getAbsolutePath() + File.separator + Configs.DOWNLOAD_DB_DIR + File.separator);
    if (!dataBaseDirFile.exists()) {
      dataBaseDirFile.mkdirs();
    }
    dataBaseloadPath=dataBaseDirFile.getAbsolutePath();
  }

  @TargetApi(Build.VERSION_CODES.LOLLIPOP)
  @Override
  public void onCreate() {
    super.onCreate();

    instance = this;

    String pushApikey = DeviceInfoHelper.getInstance(this.getApplicationContext()).getApiKey();
    PushConfigs.DEFAULT_APIKEY = pushApikey;
    //		PushConfigs.ESB_ADDRESS = "wdservice.mapbar.com:6001";
    //		PushConfigs.HOST_ADDRESS = "wdservice.mapbar.com";
    MapbarPushInterface.init(this);
    MapbarMobStat.prestrain(this);
    MapbarMobStat.readyToStatistic(this);
//    网易云信SDK初始化（启动后台服务，若已经存在用户登录信息， SDK 将完成自动登录）
    DemoCache.setContext(this);
    NIMClient.init(this, getLoginInfo(), getOptions());
    if (inMainProcess()) {
      initUIKit();
      NIMClient.toggleNotification(UserPreferences.getNotificationToggle());
    }
//    EntypoFonts
    Iconify.with(new EntypoFontDescriptor());
    initFile();
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ASPickerViewPackage(),
            new RCTToastPackage(),
            new ReactVideoPackage(),
            new ImageResizerPackage(),
            new RNFetchBlobPackage(),
              new SystemSettingPackage(),
            new SplashScreenReactPackage(),
              new VectorIconsPackage(),
              new ImagePickerPackage(),
              new MarbarPushPackage(),
              new MapbarMapPackage(),
              new CommonPackage(),
              new UpdatePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }

  //  网易云信
  private boolean inMainProcess() {
    String packageName = getPackageName();
    String processName = CommonUtils.getProcessName(this);
    return packageName.equals(processName);
  }

  private void initUIKit() {
    // 初始化，需要传入用户信息提供者
    NimUIKit.init(this, infoProvider, contactProvider);
    // 注册消息撤回过滤器
    registerMsgRevokeFilter();
  }

  /**
   * 消息撤回过滤器
   */
  private static void registerMsgRevokeFilter() {
    NimUIKit.setMsgRevokeFilter(new MsgRevokeFilter() {
      @Override
      public boolean shouldIgnore(IMMessage message) {
//        if (DemoCache.getAccount().equals(message.getSessionId())) {
//          // 发给我的电脑 不允许撤回
//          return true;
//        }
//        return false;
        return true;
      }
    });
  }

  private SDKOptions getOptions() {
    SDKOptions options = new SDKOptions();

    // 如果将新消息通知提醒托管给SDK完成，需要添加以下配置。
    StatusBarNotificationConfig config = UserPreferences.getStatusConfig();
    if (config == null) {
      config = new StatusBarNotificationConfig();
    }
    // 点击通知需要跳转到的界面
    config.notificationEntrance = MainActivity.class;
    config.notificationSmallIconId = R.mipmap.ic_launcher;

    // 通知铃声的uri字符串
    config.notificationSound = "android.resource://com.netease.nim.demo/raw/msg";

    // 呼吸灯配置
    config.ledARGB = Color.GREEN;
    config.ledOnMs = 1000;
    config.ledOffMs = 1500;

    options.statusBarNotificationConfig = config;
    DemoCache.setNotificationConfig(config);
    UserPreferences.setStatusConfig(config);

    // 配置保存图片，文件，log等数据的目录
    String sdkPath = Environment.getExternalStorageDirectory() + "/" + getPackageName() + "/nim";
    options.sdkStorageRootPath = sdkPath;

    // 配置数据库加密秘钥
    options.databaseEncryptKey = "NETEASE";

    // 配置是否需要预下载附件缩略图
    options.preloadAttach = true;

    // 配置附件缩略图的尺寸大小，
    options.thumbnailSize = MsgViewHolderThumbBase.getImageMaxEdge();

    // 用户信息提供者
    options.userInfoProvider = infoProvider;

    // 定制通知栏提醒文案（可选，如果不定制将采用SDK默认文案）
//        options.messageNotifierCustomization = messageNotifierCustomization;

    return options;
  }


  private UserInfoProvider infoProvider = new UserInfoProvider() {
    @Override
    public UserInfo getUserInfo(String account) {
      UserInfo user = NimUserInfoCache.getInstance().getUserInfo(account);
      if (user == null) {
        NimUserInfoCache.getInstance().getUserInfoFromRemote(account, null);
      }

      return user;
    }

    @Override
    public int getDefaultIconResId() {
      return R.mipmap.avatar_def;
    }

    @Override
    public Bitmap getTeamIcon(String teamId) {
      /**
       * 注意：这里最好从缓存里拿，如果读取本地头像可能导致UI进程阻塞，导致通知栏提醒延时弹出。
       */
      // 从内存缓存中查找群头像
      Team team = TeamDataCache.getInstance().getTeamById(teamId);
      if (team != null) {
        Bitmap bm = ImageLoaderKit.getNotificationBitmapFromCache(team.getIcon());
        if (bm != null) {
          return bm;
        }
      }

      // 默认图
      Drawable drawable = ContextCompat.getDrawable(getApplicationContext(), R.drawable.nim_avatar_group);
      if (drawable instanceof BitmapDrawable) {
        return ((BitmapDrawable) drawable).getBitmap();
      }

      return null;
    }

    @Override
    public Bitmap getAvatarForMessageNotifier(String account) {
      /**
       * 注意：这里最好从缓存里拿，如果读取本地头像可能导致UI进程阻塞，导致通知栏提醒延时弹出。
       */
      UserInfo user = getUserInfo(account);
      return (user != null) ? ImageLoaderKit.getNotificationBitmapFromCache(user.getAvatar()) : null;
    }

    @Override
    public String getDisplayNameForMessageNotifier(String account, String sessionId, SessionTypeEnum sessionType) {
      String nick = null;
      if (sessionType == SessionTypeEnum.P2P) {
        nick = NimUserInfoCache.getInstance().getAlias(account);
      } else if (sessionType == SessionTypeEnum.Team) {
        nick = TeamDataCache.getInstance().getTeamNick(sessionId, account);
        if (TextUtils.isEmpty(nick)) {
          nick = NimUserInfoCache.getInstance().getAlias(account);
        }
      }
      // 返回null，交给sdk处理。如果对方有设置nick，sdk会显示nick
      if (TextUtils.isEmpty(nick)) {
        return null;
      }

      return nick;
    }
  };

  private ContactProvider contactProvider = new ContactProvider() {
    @Override
    public List<UserInfoProvider.UserInfo> getUserInfoOfMyFriends() {
      List<NimUserInfo> nimUsers = NimUserInfoCache.getInstance().getAllUsersOfMyFriend();
      List<UserInfoProvider.UserInfo> users = new ArrayList<>(nimUsers.size());
      if (!nimUsers.isEmpty()) {
        users.addAll(nimUsers);
      }

      return users;
    }

    @Override
    public int getMyFriendsCount() {
      LogUtil.d("TAG", "FriendDataCache.getInstance().getMyFriendCounts():" + FriendDataCache.getInstance().getMyFriendCounts());
      return FriendDataCache.getInstance().getMyFriendCounts();
    }

    @Override
    public String getUserDisplayName(String account) {
      return NimUserInfoCache.getInstance().getUserDisplayName(account);
    }
  };

  // 如果已经存在用户登录信息，返回LoginInfo，否则返回null即可
  private LoginInfo getLoginInfo() {
    String account = Preferences.getUserAccount();
    String token = Preferences.getUserToken();

    if (!TextUtils.isEmpty(account) && !TextUtils.isEmpty(token)) {
      DemoCache.setAccount(account.toLowerCase());
      return new LoginInfo(account, token);
    } else {
      return null;
    }
  }
}
