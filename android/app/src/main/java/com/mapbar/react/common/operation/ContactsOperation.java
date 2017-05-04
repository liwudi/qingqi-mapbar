package com.mapbar.react.common.operation;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.provider.ContactsContract;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;


/**
 * Created by Administrator on 2016/10/27.
 */

public class ContactsOperation {

    private Context context;
    private String tag = "ContactsOperation";

    public ContactsOperation(Context context) {
        this.context = context;
    }


    /**
     * 获取联系人
     * * @param
     */
    public void getContacts(Promise promise) {
        WritableArray array = Arguments.createArray();
        ContentResolver reslover = context.getApplicationContext().getContentResolver();

        // 在这里我们给query传递进去一个SORT_KEY_PRIMARY。
        // 告诉ContentResolver获得的结果安装联系人名字的首字母有序排列。
        Cursor cursor = reslover.query(ContactsContract.Contacts.CONTENT_URI, null, null, null,
                android.provider.ContactsContract.Contacts.SORT_KEY_PRIMARY);
        if (cursor != null) {
            while (cursor.moveToNext()) {

                // 联系人ID
                String id = cursor
                        .getString(cursor
                                .getColumnIndex(android.provider.ContactsContract.Contacts._ID));

                // Sort Key，读取的联系人按照姓名从 A->Z 排序分组。
                String sort_key_primary = cursor
                        .getString(cursor
                                .getColumnIndex(android.provider.ContactsContract.Contacts.SORT_KEY_PRIMARY));

                // 获得联系人姓名
                String name = cursor
                        .getString(cursor
                                .getColumnIndex(android.provider.ContactsContract.Contacts.DISPLAY_NAME));

                String s = sort_key_primary.charAt(0) + "";
                WritableMap map = Arguments.createMap();
                if (id == null) {
                    continue;
                }
                map.putString("id", id);
                map.putString("name", name);
                map.putString("primaryKey", s.toUpperCase());
                // 获得联系人手机号码
                Cursor phone = reslover.query(
                        ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null,
                        ContactsContract.CommonDataKinds.Phone.CONTACT_ID + "="
                                + id, null, null);

                // 取得电话号码(可能存在多个号码)
                // 因为同一个名字下，用户可能存有一个以上的号，
                // 遍历。
                if (phone != null) {
                    WritableArray phoneNumbers = Arguments.createArray();
                    while (phone.moveToNext()) {
                        int phoneFieldColumnIndex = phone
                                .getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER);
                        String phoneNumber = phone.getString(phoneFieldColumnIndex);
                        phoneNumbers.pushString(phoneNumber);
                    }
                    if(phoneNumbers.size()>0) {
                        map.putArray("phoneNumbers", phoneNumbers);
                        array.pushMap(map);
                    }
                    phone.close();
                } else {
                    continue;
                }
            }
            promise.resolve(array);
            cursor.close();
        } else {
            promise.reject("0", "获取联系人失败");
        }


    }
}
