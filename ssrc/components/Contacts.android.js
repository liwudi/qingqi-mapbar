/**
 * Created by ligj on 2016/11/10.
 */

import {
    NativeModules
} from 'react-native';

const CommonModule = NativeModules.CommonModule;
import Permissions from 'react-native-permissions';
/**
 * 返回通讯录数据
 * 格式
 *
 *      {
 *          A ： [
 *              {
 *                  name:'xxxs',
 *                  phoneNumbers:['13111112222','123213213213']
 *                  primaryKey:'A'
 *              },
 *              {
 *                  name:'xxxs2',
 *                  phoneNumbers:['13111112222']
 *                  primaryKey:'A'
 *              }
 *          ],
 *          B ： [
 *              {
 *                  name:'xxxs',
 *                  phoneNumbers:['13111112222','123213213213']
 *                  primaryKey:'B'
 *              },
 *              {
 *                  name:'xxxs2',
 *                  phoneNumbers:['13111112222']
 *                  primaryKey:'B'
 *              }
 *          ]
 *      }
 *
 * @returns {Promise.<T>}
 */
export function getContacts() {


    return Permissions.getPermissionStatus('contacts').then(res => {
        console.log('getPermissionStatus',res);
        if(res == 'denied'){
            return Promise.reject({message:'获取通讯录失败'});
        }else{
            return CommonModule.getContacts().then((rs) => {
                let contacts = {};
                rs.forEach((item, index) => {
                    contacts[item.primaryKey] = contacts[item.primaryKey] || [];
                    item.phoneNumbers = item.phoneNumbers.map(phone => phone.replace(/ /g,''));
                    contacts[item.primaryKey].push(item);
                });
                global.contacts = contacts;
                return contacts;

            }).catch(e => {
                return Promise.reject({message:'获取通讯录失败'});
            })
        }
    });
}