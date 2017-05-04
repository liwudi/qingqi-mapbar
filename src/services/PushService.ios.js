/**
 * Created by ligj on 2016/11/9.
 */
import { NativeModules, View, PushNotificationIOS } from 'react-native';


import { queryMessageInfo } from './TripService';

//个人消息列表
const STORAGE_KEY_MESSAGE_LIST = 'pushMessageList';
//个人消息未读条数
const STORAGE_KEY_MESSAGE_UNREAD_COUNT = 'newMessageCount';
const STORAGE_KEY_MESSAGE_IDS = 'pushMessageListIds';

//所有车辆集合  存储所有车辆id已经最新一条消息
const STORAGE_KEY_CARS = 'pushMessageCars';
//车辆消息集合  存储某车的所有消息
const STORAGE_KEY_CAR = 'pushMessageCar';

//const pushModule = NativeModules.MarbarPushModule;

//const cancelNotifacation = pushModule.cancelNotifacation;




let currentPage = null;

export function setCurrentPage(main, message, next) {
    let cp = `${main}-${message}`;
    switch (cp){
        case '0-0':
            //在消息列表车辆消息页
            resetCarMessageCount();
            break;
        case '0-1':
            resetPersonalMessageCount();
            next && next();
            break;
        default:

    }
    currentPage = `${main}-${message}`;
}

/**
 * 添加消息
 * @param message
 * @param messageId
 * @returns {*}
 */
export function addMessage(message, messageId){
    let type = message.CustomContent.type || 0;
    switch (type){
        case '4':
            return addCarMessage(message, messageId);
            break;
        case '5':
            return addCarMessage(message, messageId);
            break;
        case '6':
            return addCarMessage(message, messageId);
            break;
        default:
            return addPersonalMessage(message, messageId);

    }
}


const _addCarMessageCount = (message, messageId, messageInfo) => {
    let _addMessage = (count) => {
        return global.storage.save({
            key: STORAGE_KEY_CARS,
            id: messageInfo.carId,
            rawData: {
                count : count,
                messageId: messageId,
                messageDetail: messageInfo,
                message : message,
                time: new Date()
            },
            expires: null
        })
    }
    return global.storage.load({
        key: STORAGE_KEY_CARS,
        id: messageInfo.carId,
    }).then(ret => {
        return _addMessage(ret.count + 1);
    }).catch(() => {
        return _addMessage(1);
    })
}

export function hasPersonalMessage(messageId) {
    return global.storage.load({
        key: STORAGE_KEY_MESSAGE_LIST,
        id: messageId,
    }).then(ret => {
        return Promise.resolve(true);
    }).catch(() => {
        return Promise.resolve(false);
    })
}

/**
 * 添加车辆消息
 * @param message
 * @returns {*}
 */
export function addCarMessage  (message, messageId)  {
    let { type, stype, msgId } = message;
    return queryMessageInfo(type, stype, msgId)
        .then(rs => {
            //保存消息
            return Promise.all([
                _addCarMessageCount(message, messageId, rs),
                global.storage.save({
                    key: STORAGE_KEY_CAR + rs.carId,
                    id: messageId,
                    rawData: {
                        messageId: messageId,
                        message : message,
                        messageDetail: rs,
                        time: new Date()
                    },
                    expires: null
                })
            ]);
        })
        .catch(e => {

        });
};

const _addPersonalMessage = (message, messageId) => {

    if(currentPage === '0-1'){
        //cancelNotifacation(messageId);
    }

    return global.storage.save({
        key: STORAGE_KEY_MESSAGE_LIST,
        id: messageId,
        rawData: {
            message : message,
            time: new Date()
        },
        expires: null
    })
}

const _addPersonalMessageCount = () => {
    let _addCount = (count) => {
        return global.storage.save({
            key: STORAGE_KEY_MESSAGE_UNREAD_COUNT,
            rawData: {
                count : currentPage === '0-1' ? 0 : count
            },
            expires: null
        })
    }
    return global.storage.load({
        key: STORAGE_KEY_MESSAGE_UNREAD_COUNT,
    }).then(ret => {
        // console.log('ret:!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:::',ret);
        return _addCount(ret.count + 1);
    }).catch(() => {
        return _addCount(1);
    })
}


/**
 * 添加个人消息
 * @param messageId
 * @param message
 * @returns {*}
 */
export function addPersonalMessage  (message, messageId)  {

    return hasPersonalMessage(messageId)
        .then((has) => {
            if(has){
                console.log('message has save',messageId);
                return {};
            }else{
                console.log('message no save',messageId);
                return Promise.all([
                    _addPersonalMessage(message, messageId),
                    _addPersonalMessageCount()
                ]);
            }
        });
};

/**
 * 读取个人消息列表
 * @returns {*}
 */
export function  readAllPersonalMessage  ()  {

    return global.storage.getAllDataForKey(STORAGE_KEY_MESSAGE_LIST).then(rs => {
        // console.log('readAllPersonalMessage!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',rs)
        return rs;
    });
}

export function  readAllPersonalMessageUnreadCount  ()  {
    return global.storage.load({
        key: STORAGE_KEY_MESSAGE_UNREAD_COUNT,
    }).then(ret => {
        // console.log('STORAGE_KEY_MESSAGE_LIST_COUNT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',ret)
        return ret;
    }).catch(() => {
        return {count:0};
    });
}

/**
 * 读取车辆消息
 */
export function  readAllCarMessage  ()  {
    return global.storage.getAllDataForKey(STORAGE_KEY_CARS).then(rs => {
        // console.log('readAllCarMessage!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',rs)
        return rs;
    });
}

export function  resetCarMessageCount  ()  {
    // return global.storage.getAllDataForKey(STORAGE_KEY_CARS).then(rs => {
    //     console.log('readAllCarMessage!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',rs)
    //     return rs;
    // });
}

export function  resetPersonalMessageCount  ()  {

    global.storage.getIdsForKey(STORAGE_KEY_MESSAGE_LIST).then(ids => {
        //ids.forEach(messageId => cancelNotifacation(messageId))
    }).catch(e => {
    });

    global.storage.save({
        key: STORAGE_KEY_MESSAGE_UNREAD_COUNT,
        rawData: {
            count : 0
        },
        expires: null
    })
}

export function  readAllCarMessageUnreadCount  ()  {
    return global.storage.load({
        key: STORAGE_KEY_MESSAGE_UNREAD_COUNT,
    }).then(ret => {
        console.log('STORAGE_KEY_MESSAGE_LIST_COUNT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',ret)
        return ret;
    }).catch(() => {
        return {count:0};
    });
}

export function readAllMessageAndUnreadCount() {
    return Promise.all([
        readAllPersonalMessage(),
        readAllPersonalMessageUnreadCount(),
        readAllCarMessage()
    ])
        .then((rs) => {
            let messageUnReadCount = rs[2].reduce((a, b) => {
                return a + b.count
            }, rs[1].count || 0);

            return {
                PersonalMessage: rs[0],
                PersonalMessageUnread: rs[1],
                CarMessage: rs[2],
                AllUnReadCount: messageUnReadCount
            }
        });
}


/**
 * 读取所有车辆列表
 * @returns {*}
 */
export function  readAllCars  ()  {
    return global.storage.getAllDataForKey(STORAGE_KEY_CARS);
}

/**
 * 读取单车所有消息
 * @param carId
 * @returns {*}
 */
export function  readAllCarMessageForId  (carId)  {
    return global.storage.getAllDataForKey(STORAGE_KEY_CAR + carId);
}

export function  readMessage  (messageId)  {
    global.storage.load({
        key: STORAGE_KEY_MESSAGE_LIST,
        id: messageId
    });
}

export function  removeMessage (messageId)  {
    // 删除单个数据
    global.storage.remove({
        key: STORAGE_KEY_MESSAGE_LIST,
        id: messageId
    });
};

export function  removeAllMessage  ()  {
    // 删除数据
    global.storage.remove({
        key: STORAGE_KEY_MESSAGE_LIST
    });
};

