package com.mapbar.react.common.operation;

import android.content.Context;
import android.media.MediaRecorder;
import android.text.TextUtils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.mapbar.react.LogUtils;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

public class MediaRecorderOperation {
    private static MediaRecorderOperation mInstance;
    public AudioStageListener mListener;
    private String Tag = "AudioManager";
    private MediaRecorder mRecorder;
    private String mDirString = "";
    private String mCurrentFilePathString = "";
    //	public static final int MAX_LENGTH = 1000 * 60;// 最大录音时长1000*60*10;
    private boolean isPrepared = false;// 是否准备好了
    private long startTime;
    private Context context;

    private MediaRecorderOperation(Context context) {
        this.context = context;
		mDirString=context.getApplicationContext().getExternalFilesDir("").getAbsolutePath()+"/qingqi_recorder_audios";
//        mDirString = Environment.getExternalStorageDirectory() + "/qingqi_recorder_audios";
    }

    public static MediaRecorderOperation getInstance(Context context) {
        if (mInstance == null) {
            synchronized (MediaRecorderOperation.class) {
                if (mInstance == null) {
                    mInstance = new MediaRecorderOperation(context);
                }
            }
        }
        return mInstance;

    }

    public void setOnAudioStageListener(AudioStageListener listener) {
        mListener = listener;
    }

    // 准备方法
    public void prepareAudio(Promise promise) {
        if (!isPrepared) {
            try {
                // 一开始应该是false的

                File dir = new File(mDirString);
                if (!dir.exists()) {
                    dir.mkdirs();
                }

                String fileNameString = generalFileName();
                File file = new File(dir, fileNameString);

                mCurrentFilePathString = file.getAbsolutePath();
//                if (PackageManager.PERMISSION_GRANTED == ContextCompat.checkSelfPermission(context, Manifest.permission.RECORD_AUDIO)) {

                mRecorder = new MediaRecorder();
                // 设置输出文件
                mRecorder.setOutputFile(file.getAbsolutePath());
                // 设置meidaRecorder的音频源是麦克风
                mRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
                // 设置文件音频的输出格式为amr
                mRecorder.setOutputFormat(MediaRecorder.OutputFormat.AMR_NB);
                // 设置音频的编码格式为amr
                mRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
//			mRecorder.setMaxDuration(MAX_LENGTH);
                // 严格遵守google官方api给出的mediaRecorder的状态流程图
                mRecorder.prepare();

                mRecorder.start();
                // 准备结束
                isPrepared = true;
                // 已经准备好了，可以录制了
                if (mListener != null) {
                    mListener.wellPrepared();
                }
                startTime = System.currentTimeMillis();
                WritableMap writableMap = Arguments.createMap();
                writableMap.putBoolean("isRecording", isPrepared);
                promise.resolve(writableMap);
//                } else {
//                    LogUtils.logd(Tag, "请开启权限");
//                }

            } catch (IllegalStateException e) {
                promise.reject("prepareAudio", "录音失败,请检查录音权限是否打开");
                e.printStackTrace();
            } catch (IOException e) {
                promise.reject("prepareAudio", "录音失败");
                e.printStackTrace();
            }
        }
    }

    /**
     * 随机生成文件的名称
     *
     * @return
     */
    private String generalFileName() {
        // TODO Auto-generated method stub

        return UUID.randomUUID().toString() + ".amr";
    }

    // 获得声音的level
    public int getVoiceLevel(int maxLevel) {
        // mRecorder.getMaxAmplitude()这个是音频的振幅范围，值域是1-32767
        if (isPrepared) {
            try {
                // 取证+1，否则去不到7
                return maxLevel * mRecorder.getMaxAmplitude() / 32768 + 1;
            } catch (Exception e) {
                // TODO Auto-generated catch block

            }
        }

        return 1;
    }

    // 释放资源
    public long release() {
        isPrepared = false;
        // 严格按照api流程进行
        if (mRecorder == null) {
            return 0L;
        }
        long endTime = System.currentTimeMillis();
        try {
            mRecorder.setOnErrorListener(null);
            mRecorder.setOnInfoListener(null);
            mRecorder.setPreviewDisplay(null);
            mRecorder.stop();
            mRecorder.release();
            mRecorder = null;

        } catch (Exception e) {
            LogUtils.logd(Tag, "mediaRecorderOperation release" + e.toString());
            e.printStackTrace();
            return -1;
        }
        return endTime - startTime;
    }

    // 取消,因为prepare时产生了一个文件，所以cancel方法应该要删除这个文件，
    // 这是与release的方法的区别
    public void deleteCurrentAudio() {
        if (!TextUtils.isEmpty(mCurrentFilePathString)) {
            File file = new File(mCurrentFilePathString);
            if (file.exists()) {
                file.delete();
            }
            mCurrentFilePathString = "";
        }
    }
    //删除所有录音文件
    public void deleteAllAudio() {
        if (!TextUtils.isEmpty(mDirString)) {
            File file = new File(mDirString);
            if (file.exists()) {
                file.delete();
            }
            mDirString = "";
        }
    }
    //删除某个录音文件
    public void deleteAudio(String audioPath) {
        if (!TextUtils.isEmpty(audioPath)) {
            File file = new File(audioPath);
            if (file.exists()) {
                file.delete();
            }
        }
    }

    public String getCurrentFilePath() {
        return mCurrentFilePathString;
    }

    /**
     * 回调函数，准备完毕，准备好后，button才会开始显示录音框
     *
     * @author nickming
     */
    public interface AudioStageListener {
        void wellPrepared();
    }

}
