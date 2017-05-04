package com.mapbar.react.common.operation;

import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Headers;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

//

/**
 * Created by ligj on 2016/11/25.
 */
public class HttpPostUpload {

    private final OkHttpClient client = new OkHttpClient();

    private Headers getHeaders(ReadableMap headers) {
        HashMap<String, String> headersMap = new HashMap();
        ReadableMapKeySetIterator iter = headers.keySetIterator();
        while (iter.hasNextKey()) {
            String str = iter.nextKey();
            headersMap.put(str, headers.getString(str));
        }
        return Headers.of(headersMap);
    }

    private byte[] base64ToByte(String fileContent) throws IOException {
        Log.i("uploadTest base64ToByte", fileContent);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        bos.write(Base64.decode(fileContent, Base64.DEFAULT));
        return bos.toByteArray();
    }

    private MultipartBody buildBody(String content) throws IOException {

        String mediaType = null;

        Pattern p = Pattern.compile("data:(\\w+/\\w+);base64,");
        Matcher m = p.matcher(content);

        if (m.find()) {
            mediaType = m.group(1);
        }
        Log.i("uploadTest content", content);
        Log.i("uploadTest mediaType", mediaType);
        Log.i("uploadTest content.replace", content.replaceAll("data:(\\w+/\\w+);base64,", ""));

        return new MultipartBody.Builder()
                .addPart(
                        Headers.of("Content-Disposition", "form-data; filename=\"img.png\""),
                        RequestBody.create(MediaType.parse(mediaType), this.base64ToByte(content.replaceAll("data:(\\w+/\\w+);base64,", "")))
                )
                .build();
    }

    public void upload(String url, ReadableMap params, ReadableMap headers, final Promise promise) throws Exception {

        MultipartBody.Builder buildernew = new MultipartBody.Builder()
                .setType(MultipartBody.FORM);

        ReadableMapKeySetIterator iter = params.keySetIterator();
        while (iter.hasNextKey()) {
            String str = iter.nextKey();
            buildernew.addFormDataPart(str, null, this.buildBody(params.getString(str)));
        }

        MultipartBody body = buildernew.build();


//        MultipartBody body = new MultipartBody.Builder("AaB03x")
//                .setType(MultipartBody.FORM)
//                .addFormDataPart(
//                        fileName,
//                        null,
//                        new MultipartBody.Builder("BbC04y")
//                            .addPart(
//                                    Headers.of("Content-Disposition", "form-data; filename=\"img.png\""),
//                                    RequestBody.create(MediaType.parse("image/jpeg"), bos.toByteArray())
//                            )
//                            .build()
//                )
//                .build();

        Request request = new Request.Builder()
                .headers(this.getHeaders(headers))
                .url(url)
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            public void onResponse(Call call, Response response) throws IOException {
                final String bodyStr = response.body().string();
                final boolean ok = response.isSuccessful();
                Log.i("uploadTest ok", bodyStr);
                promise.resolve(bodyStr);
            }

            public void onFailure(Call call, final IOException e) {
                Log.i("uploadTest e", e.getMessage());
                promise.reject(e);
            }
        });


    }

    public void uploadFile(String url, ReadableArray filePaths,final Promise promise) {
        /* form的分割线,自己定义 */
        String boundary = "xx--------------------------------------------------------------xx";
        MultipartBody.Builder builder = new MultipartBody.Builder(boundary).setType(MultipartBody.FORM);
        for (int i = 0; i < filePaths.size(); i++) {
            File file = new File(filePaths.getString(i));
            RequestBody fileBody = RequestBody.create(MediaType.parse("application/octet-stream"), file);
            builder.addFormDataPart("file", null, fileBody);
        }
        MultipartBody mBody = builder.build();
        Request request = new Request.Builder().url(url).post(mBody).build();
        client.newCall(request).enqueue(new Callback() {
            public void onResponse(Call call, Response response) throws IOException {
                final String bodyStr = response.body().string();
                final boolean ok = response.isSuccessful();
                Log.i("upFile ok", bodyStr);
                promise.resolve(bodyStr);
            }

            public void onFailure(Call call, final IOException e) {
                Log.i("upFile e", e.getMessage());
                promise.reject(e);
            }
        });
    }
}
