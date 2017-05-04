package com.netease.nim.uikit.session.fragment;

import android.content.Intent;
import android.media.AudioManager;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.netease.nim.uikit.R;
import com.netease.nim.uikit.common.fragment.TFragment;
import com.netease.nim.uikit.common.util.log.LogUtil;
import com.netease.nim.uikit.session.SessionCustomization;
import com.netease.nim.uikit.session.actions.BaseAction;
import com.netease.nim.uikit.session.actions.ImageAction;
import com.netease.nim.uikit.session.actions.VideoAction;
import com.netease.nim.uikit.session.activity.P2PMessageActivity;
import com.netease.nim.uikit.session.constant.Extras;
import com.netease.nim.uikit.session.module.Container;
import com.netease.nim.uikit.session.module.ModuleProxy;
import com.netease.nim.uikit.session.module.input.InputPanel;
import com.netease.nim.uikit.session.module.list.MessageListPanel;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.Observer;
import com.netease.nimlib.sdk.msg.MsgService;
import com.netease.nimlib.sdk.msg.MsgServiceObserve;
import com.netease.nimlib.sdk.msg.attachment.MsgAttachment;
import com.netease.nimlib.sdk.msg.constant.AttachStatusEnum;
import com.netease.nimlib.sdk.msg.constant.MsgDirectionEnum;
import com.netease.nimlib.sdk.msg.constant.MsgStatusEnum;
import com.netease.nimlib.sdk.msg.constant.MsgTypeEnum;
import com.netease.nimlib.sdk.msg.constant.SessionTypeEnum;
import com.netease.nimlib.sdk.msg.model.CustomMessageConfig;
import com.netease.nimlib.sdk.msg.model.IMMessage;
import com.netease.nimlib.sdk.msg.model.MemberPushOption;
import com.netease.nimlib.sdk.msg.model.MessageReceipt;
import com.netease.nimlib.sdk.msg.model.NIMAntiSpamOption;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 聊天界面基类
 * <p/>
 * Created by huangjun on 2015/2/1.
 */
public class MessageFragment extends TFragment implements ModuleProxy {

    private View rootView;

    private SessionCustomization customization;

    protected static final String TAG = "MessageActivity";

    // 聊天对象
    protected String sessionId; // p2p对方Account或者群id

    protected SessionTypeEnum sessionType;

    // modules
    protected InputPanel inputPanel;
    protected MessageListPanel messageListPanel;
    //    add by leimeijia 2017.1.18
    private static String sessionDialogId;

    public static void setDialogId(String dialogId) {
        sessionDialogId = dialogId;
    }

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        parseIntent();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.nim_message_fragment, container, false);
        return rootView;
    }

    /**
     * ***************************** life cycle *******************************
     */

    @Override
    public void onPause() {
        super.onPause();

        NIMClient.getService(MsgService.class).setChattingAccount(MsgService.MSG_CHATTING_ACCOUNT_NONE,
                SessionTypeEnum.None);
        inputPanel.onPause();
        messageListPanel.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();
        messageListPanel.onResume();
        NIMClient.getService(MsgService.class).setChattingAccount(sessionId, sessionType);
        getActivity().setVolumeControlStream(AudioManager.STREAM_VOICE_CALL); // 默认使用听筒播放
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        messageListPanel.onDestroy();
        registerObservers(false);
    }

    public boolean onBackPressed() {
        if (inputPanel.collapse(true)) {
            return true;
        }

        if (messageListPanel.onBackPressed()) {
            return true;
        }
        return false;
    }

    public void refreshMessageList() {
        messageListPanel.refreshMessageList();
    }
    IMMessage imMessage = new IMMessage() {
        @Override
        public String getUuid() {
            return null;
        }

        @Override
        public boolean isTheSame(IMMessage imMessage) {
            return false;
        }

        @Override
        public String getSessionId() {
            return null;
        }

        @Override
        public SessionTypeEnum getSessionType() {
            return null;
        }

        @Override
        public String getFromNick() {
            return null;
        }

        @Override
        public MsgTypeEnum getMsgType() {
            return null;
        }

        @Override
        public MsgStatusEnum getStatus() {
            return null;
        }

        @Override
        public void setStatus(MsgStatusEnum msgStatusEnum) {

        }

        @Override
        public void setDirect(MsgDirectionEnum msgDirectionEnum) {

        }

        @Override
        public MsgDirectionEnum getDirect() {
            return null;
        }

        @Override
        public void setContent(String s) {

        }

        @Override
        public String getContent() {
            return "请问有什么可以帮您";
        }

        @Override
        public long getTime() {
            return 123456789;
        }

        @Override
        public void setFromAccount(String s) {

        }

        @Override
        public String getFromAccount() {
            return null;
        }

        @Override
        public void setAttachment(MsgAttachment msgAttachment) {

        }

        @Override
        public MsgAttachment getAttachment() {
            return null;
        }

        @Override
        public AttachStatusEnum getAttachStatus() {
            return null;
        }

        @Override
        public void setAttachStatus(AttachStatusEnum attachStatusEnum) {

        }

        @Override
        public CustomMessageConfig getConfig() {
            return null;
        }

        @Override
        public void setConfig(CustomMessageConfig customMessageConfig) {

        }

        @Override
        public Map<String, Object> getRemoteExtension() {
            return null;
        }

        @Override
        public void setRemoteExtension(Map<String, Object> map) {

        }

        @Override
        public Map<String, Object> getLocalExtension() {
            return null;
        }

        @Override
        public void setLocalExtension(Map<String, Object> map) {

        }

        @Override
        public String getPushContent() {
            return null;
        }

        @Override
        public void setPushContent(String s) {

        }

        @Override
        public Map<String, Object> getPushPayload() {
            return null;
        }

        @Override
        public void setPushPayload(Map<String, Object> map) {

        }

        @Override
        public MemberPushOption getMemberPushOption() {
            return null;
        }

        @Override
        public void setMemberPushOption(MemberPushOption memberPushOption) {

        }

        @Override
        public boolean isRemoteRead() {
            return false;
        }

        @Override
        public int getFromClientType() {
            return 0;
        }

        @Override
        public NIMAntiSpamOption getNIMAntiSpamOption() {
            return null;
        }

        @Override
        public void setNIMAntiSpamOption(NIMAntiSpamOption nimAntiSpamOption) {

        }
    };
    private void parseIntent() {
        sessionId = getArguments().getString(Extras.EXTRA_ACCOUNT);
        sessionType = (SessionTypeEnum) getArguments().getSerializable(Extras.EXTRA_TYPE);
        IMMessage anchor = (IMMessage) getArguments().getSerializable(Extras.EXTRA_ANCHOR);

        customization = (SessionCustomization) getArguments().getSerializable(Extras.EXTRA_CUSTOMIZATION);
        Container container = new Container(getActivity(), sessionId, sessionType, this);

        if (messageListPanel == null) {
            messageListPanel = new MessageListPanel(container, rootView, anchor, false, false);
        } else {
            messageListPanel.reload(container, anchor);
        }

        List<IMMessage> messages = new ArrayList<>();
        messages.add(imMessage);
        messageListPanel.onIncomingMessage(messages);
        sendMsgReceipt(); // 发送已读回执
        if (inputPanel == null) {
            inputPanel = new InputPanel(container, rootView, getActionList());
            inputPanel.setCustomization(customization);
        } else {
            inputPanel.reload(container, customization);
        }

        registerObservers(true);

        if (customization != null) {
            messageListPanel.setChattingBackground(customization.backgroundUri, customization.backgroundColor);
        }
    }

    /**
     * ************************* 消息收发 **********************************
     */
    // 是否允许发送消息
    protected boolean isAllowSendMessage(final IMMessage message) {
        return true;
    }

    /**
     * ****************** 观察者 **********************
     */

    private void registerObservers(boolean register) {
        MsgServiceObserve service = NIMClient.getService(MsgServiceObserve.class);
        service.observeReceiveMessage(incomingMessageObserver, register);
        service.observeMessageReceipt(messageReceiptObserver, register);
    }

    /**
     * 消息接收观察者
     */
    Observer<List<IMMessage>> incomingMessageObserver = new Observer<List<IMMessage>>() {
        @Override
        public void onEvent(List<IMMessage> messages) {
            if (messages == null || messages.isEmpty()) {
                return;
            }
            LogUtil.d(TAG, "incomingMessageObserver:" + messages.size());
            messageListPanel.onIncomingMessage(messages);
            if(getActivity()!=null&& P2PMessageActivity.class.equals(getActivity().getClass())) {
                messageListPanel.onIncomingMessageOutSession(messages.get(messages.size() - 1),sessionDialogId);
            }
            sendMsgReceipt(); // 发送已读回执
        }
    };

    private Observer<List<MessageReceipt>> messageReceiptObserver = new Observer<List<MessageReceipt>>() {
        @Override
        public void onEvent(List<MessageReceipt> messageReceipts) {
            receiveReceipt();
        }
    };


    /**
     * ********************** implements ModuleProxy *********************
     */
    @Override
    public boolean sendMessage(IMMessage message) {
        if (!isAllowSendMessage(message)) {
            return false;
        }
        if (!TextUtils.isEmpty(sessionDialogId)) {
            Map<String, Object> data = new HashMap<>();
            data.put("dialogId", sessionDialogId);
            message.setRemoteExtension(data);
        }
        // send message to server and save to db
        NIMClient.getService(MsgService.class).sendMessage(message, false);

        messageListPanel.onMsgSend(message);

        return true;
    }

    @Override
    public void onInputPanelExpand() {
        messageListPanel.jumpReload();
        messageListPanel.scrollToBottom();
    }

    @Override
    public void shouldCollapseInputPanel() {
        inputPanel.collapse(false);
    }

    @Override
    public boolean isLongClickEnabled() {
        return !inputPanel.isRecording();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        inputPanel.onActivityResult(requestCode, resultCode, data);
        messageListPanel.onActivityResult(requestCode, resultCode, data);
    }

    // 操作面板集合
    protected List<BaseAction> getActionList() {
        List<BaseAction> actions = new ArrayList<>();
        actions.add(new ImageAction());
        actions.add(new VideoAction());
//        actions.add(new LocationAction());

        if (customization != null && customization.actions != null) {
            actions.addAll(customization.actions);
        }
        return actions;
    }

    /**
     * 发送已读回执
     */
    private void sendMsgReceipt() {
        messageListPanel.sendReceipt();
    }

    /**
     * 收到已读回执
     */
    public void receiveReceipt() {
        messageListPanel.receiveReceipt();
    }


}
