package com.mapbar.nim;

import android.content.Context;
import android.os.Looper;
import android.text.TextUtils;
import android.widget.Toast;

import com.mapbar.BuildConfig;
import com.mapbar.ServerUrlConfig;
import com.mapbar.react.LogUtils;
import com.netease.nim.uikit.LoginSyncDataStatusObserver;
import com.netease.nim.uikit.NimUIKit;
import com.netease.nim.uikit.session.helper.MessageHelper;
import com.netease.nimlib.sdk.AbortableFuture;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.Observer;
import com.netease.nimlib.sdk.RequestCallback;
import com.netease.nimlib.sdk.StatusCode;
import com.netease.nimlib.sdk.auth.AuthService;
import com.netease.nimlib.sdk.auth.AuthServiceObserver;
import com.netease.nimlib.sdk.auth.LoginInfo;
import com.netease.nimlib.sdk.msg.MsgService;
import com.netease.nimlib.sdk.msg.MsgServiceObserve;
import com.netease.nimlib.sdk.msg.constant.SessionTypeEnum;
import com.netease.nimlib.sdk.msg.model.IMMessage;
import com.netease.nimlib.sdk.msg.model.RecentContact;

import java.io.IOException;
import java.util.List;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by jezhee on 2/20/15.
 */
public class MessageServer {
    private Context context;
    private boolean isRefreshToken;
    private String userId, kefuId, type, nimToken;
    private String TAG = this.getClass().getSimpleName();

    public MessageServer(Context context) {
        this.context = context;
    }

    public void prepare(String userId, String kefuId, String type, String nimToken) {
        this.userId = userId;
        this.kefuId = kefuId;
        this.type = type;
        this.nimToken = nimToken;
        NIMClient.getService(AuthServiceObserver.class).observeOnlineStatus(userStatusObserver, true);
        MsgServiceObserve service = NIMClient.getService(MsgServiceObserve.class);
        service.observeRevokeMessage(revokeMessageObserver, true);
        service.observeRecentContact(messageObserver, true);
        login();
    }

    private void syncData() {
        boolean syncCompleted = LoginSyncDataStatusObserver.getInstance().observeSyncDataCompletedEvent(new Observer<Void>() {
            @Override
            public void onEvent(Void v) {
            }
        });
    }

    /**
     * 注销
     */
    public static void logout() {
        Preferences.saveUserToken("");
        LogoutHelper.logout();
        NIMClient.getService(AuthService.class).logout();
    }

    Observer<List<RecentContact>> messageObserver = new Observer<List<RecentContact>>() {
        @Override
        public void onEvent(List<RecentContact> recentContacts) {
            onRecentContactChanged(recentContacts);
        }
    };


    private void onRecentContactChanged(List<RecentContact> recentContacts) {
        int unreadNum = NIMClient.getService(MsgService.class).getTotalUnreadCount();

//        Toast.makeText(context, "unreadNum:" + unreadNum, Toast.LENGTH_SHORT).show();
    }


    Observer<IMMessage> revokeMessageObserver = new Observer<IMMessage>() {
        @Override
        public void onEvent(IMMessage message) {
            if (message == null) {
                return;
            }

            MessageHelper.getInstance().onRevokeMessage(message);
        }
    };


    /**
     * 用户状态变化
     */
    Observer<StatusCode> userStatusObserver = new Observer<StatusCode>() {

        @Override
        public void onEvent(StatusCode code) {
            if (code.wontAutoLogin()) {
                kickOut(code);
            } else {
//                if (code == StatusCode.NET_BROKEN) {
//                    Toast.makeText(context, "当前网络不可用", Toast.LENGTH_SHORT).show();
//                }
//                else if (code == StatusCode.UNLOGIN) {
//                    Toast.makeText(context, "未登录", Toast.LENGTH_SHORT).show();
//                } else if (code == StatusCode.CONNECTING) {
//                    Toast.makeText(context, "连接中", Toast.LENGTH_SHORT).show();
//                } else if (code == StatusCode.LOGINING) {
//                    Toast.makeText(context, "登录中", Toast.LENGTH_SHORT).show();
//                } else {
////                    notifyBar.setVisibility(View.GONE);
//                }
            }
        }
    };

    private void kickOut(StatusCode code) {
        Preferences.saveUserToken("");

        if (code == StatusCode.PWD_ERROR) {
//            LogUtil.e("Auth", "user password error");
        } else {
//            LogUtil.i("Auth", "Kicked!");
        }
//        onLogout();
    }


    private void saveLoginInfo(final String account, final String token) {
        Preferences.saveUserAccount(account);
        Preferences.saveUserToken(token);
    }

    /**
     * 已经登陆过，自动登陆
     */
    private boolean canAutoLogin() {
        String account = Preferences.getUserAccount();
        String token = Preferences.getUserToken();
        return !TextUtils.isEmpty(account) && !TextUtils.isEmpty(token);
    }

    private void login() {
        if (canAutoLogin()) {
            NimUIKit.startChatting(context, kefuId, SessionTypeEnum.P2P, null, null);
            syncData();
        } else {
            // 登录
            AbortableFuture<LoginInfo> loginRequest = NIMClient.getService(AuthService.class).login(new LoginInfo(userId, nimToken));
            loginRequest.setCallback(new RequestCallback<LoginInfo>() {
                @Override
                public void onSuccess(LoginInfo param) {
//                    Toast.makeText(context, "登录成功", Toast.LENGTH_SHORT).show();
                    DemoCache.setAccount(userId);
                    saveLoginInfo(userId, nimToken);
                    NimUIKit.startChatting(context, kefuId, SessionTypeEnum.P2P, null, null);
                    syncData();
                }

                @Override
                public void onFailed(int code) {
                    if (BuildConfig.DEBUG) {
                        LogUtils.loge(TAG, "onFailed code :" + code);
                    }

                    if (!isRefreshToken && code == 302) {
                        refreshToken();
                        isRefreshToken = true;
                    } else {
                        Toast.makeText(context, "联系客服失败,请稍后重试", Toast.LENGTH_SHORT).show();
                    }
//                onLoginDone();
//                    else if (code == 302 || code == 404) {
//                        Toast.makeText(context, "账号或密码错误", Toast.LENGTH_SHORT).show();
//                    } else {
//                        Toast.makeText(context, "登录失败: " + code, Toast.LENGTH_SHORT).show();
//                    }
                }

                @Override
                public void onException(Throwable exception) {
//
//                onLoginDone();
                }
            });
        }
    }

    private void refreshToken() {
        OkHttpClient client = new OkHttpClient();
        String server_refreshToken = ServerUrlConfig.SERVER_REFRESH_TOKEN;
        FormBody body = new FormBody.Builder()
            .add("userId", userId)
            .add("type", type)
            .build();
        Request request = new Request.Builder()
            .url(server_refreshToken)
            .post(body)
            .build();
        client.newCall(request).enqueue(new Callback() {
            public void onResponse(Call call, Response response) throws IOException {
                String nimTokenbody = response.body().string();
                int start = nimTokenbody.indexOf("<token>");
                int end = nimTokenbody.indexOf("</token>");
                nimToken = nimTokenbody.substring(start + 7, end);
                login();
            }

            public void onFailure(Call call, final IOException e) {
                Looper.prepare();
                Toast.makeText(context, "连接失败", Toast.LENGTH_SHORT).show();
                Looper.loop();
            }
        });
    }
}
