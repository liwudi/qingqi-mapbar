/**
 * Created by linyao on 2016/9/8.
 */

import ServerConfig from './ServerConfig';
import RNFetchBlob from 'react-native-fetch-blob';
import Toast from '../components/Toast';

let serviceUrl = '';
let userInfo;
let token = null;
let userId = null;
let interceptors = [];
let isInterceptAlerting=false; //todo  目前拦截器只有一种是Alert形式，为了解决账号被T时弹出框重复的问题，临时通过这个变量控制，后续扩展会放开

function urlEncode(param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
};

function isFunction(value) {
    return typeof value === 'function';
}
function isUndefined(value) {
    return typeof value === 'undefined';
}
function isString(value) {
    return typeof value === 'string';
}

function _fetch(fetch_promise, timeout) {
    let abort_fn = null;

    //这是一个可以被reject的promise
    let abort_promise = new Promise(function(resolve, reject) {
        abort_fn = function() {
            reject({ data: null, resultCode: 500, message: '请求超时，请重试！' });
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);

    setTimeout(function() {
        abort_fn();
    }, timeout);

    return abortable_promise;
}

function resultProcessor(result) {
    if (result.status === 200 || result.code === 200 || result.resultCode === 200) {
        console.info('success-result');
        console.info(result);
        return Promise.resolve(result.data || {noResult: true} );
    } else {
        console.info('error-result');
        console.info(result);
        result.message = result.message || '服务器错误';
        return Promise.reject(result);
    }
}

function typeToString(obj) {
      if(obj instanceof Array){
          for(let i=0; i<obj.length; i++){
              if( obj[i] !== null && typeof obj[i] === 'object'){ typeToString(obj[i]) }else { obj[i]=String(obj[i]) }
          }
      }else if(obj instanceof Object){
          for(let key in obj ){
              if(obj[key] !== null && typeof obj[key] === 'object'){ typeToString(obj[key]) }else { obj[key]=String(obj[key]) }
          }
      }
    return obj;
}

function request(opts, processor, isUpload = false) {
    let url = /^(http|https):\/\//.test(opts.url) ? opts.url : (serviceUrl + opts.url),
        options = {
            method: opts.method || 'GET',
            cache: false,
            // mode: 'cors', //允许跨域
            headers: new Headers()
        },
        queryString, formData;
    options.headers.append('Content-Type', 'application/json;charset=utf-8');
    options.headers.append('Accept', 'application/json');

    if (opts.credentials != 'undefined') {
        options.credentials = opts.credentials;
    }


    //todo 统一加上token（临时处理方案）
    if (userInfo) {
        if (!opts.data) {
            opts.data = {};
        }
        opts.data['token'] = userInfo.token;
        //todo 测试id
        // opts.data['userId'] = opts.data['userId'] || userInfo.userId;
        opts.data['userId'] = userInfo.userId;
    }


    if (opts.data && opts.data instanceof Object) {
        for (var _d in opts.data) {
            if ((options.method === 'GET' && opts.data[_d] === '') || isUndefined(opts.data[_d]) || opts.data[_d] === null) {
                delete  opts.data[_d];
            } else if (opts.data[_d] == 'null') {
                delete  opts.data[_d];
            }
        }
    }
    if (options.method === 'POST') {
        if (opts.data instanceof FormData) {
            options.body = opts.data;
            options.headers.set('Content-Type', 'multipart/form-data');
        } else if (isUpload) {
            if (opts.data) {
                options.files = Object.keys(opts.data).map(((key) => {
                    let file = opts.data[key];
                    if(typeof file === 'string'){
                        return { name: key, data: file};
                    }else{
                        return { name : key, filename : file.fileName, type:file.type, data: RNFetchBlob.wrap(file.path)};
                    }
                }));
            }
        } else {
            options.body = JSON.stringify(typeToString(opts.data));
            options.headers.set('Content-Type', 'application/json;charset=utf-8');
            options.headers.set('Accept', 'application/json');
        }
    } else if (options.method === 'GET') {

        if (!opts.data) opts.data = {};
        opts.data['__rid'] = Math.random();

        queryString = urlEncode(opts.data);
        url = url + (url.indexOf('?') > -1 ? '&' : '?') + queryString;
    }

    if(url.startsWith(ServerConfig.WD_SERVICE) && userInfo && userInfo.token){
        options.headers.set('X-Auth-Token', userInfo.token);
    }

    processor = processor || resultProcessor;

    console.log('###############################################');
    console.log(url)
    console.log(options)
    console.log('###############################################');


    if(!global.NetIsConnected){
        return Promise.reject({ data: null, resultCode: 500, message: '网络未连接，请检查网络！' });
    } else {
        if(isUpload){
            let _heasers = {};
            options.headers.forEach((v,k) => {
                _heasers[k] = v;
            });
            return RNFetchBlob.fetch('POST', url, _heasers , options.files )
                .then(response => response.json())
                .then((res) => {
                    return processor(res);
                }).catch((err) => {
                    return err
                });
        } else {
            return _fetch(
                fetch(url, options)
                    .then(response => response.json())
                    .then(function (res) {
                        if(!isInterceptAlerting){
                            interceptors.forEach((interceptor) => {
                                res = interceptor(res);
                            });
                        }
                        return processor(res);
                    })
                    .catch(function (err) {
                        return Promise.reject(err);
                    })
                , 10000);
        }
    }
}


export let RequetService = {
    get: function (url, data, processor) {
        if (arguments.length === 2 && isFunction(data)) {
            processor = data;
            data = null;
        }
        return request({
            url: url,
            data: Object.assign({}, data)
        }, processor);
    },

    post: function (url, data, processor, isUpload) {
        if (isFunction(data) && arguments.length === 2) {
            isUpload = processor;
            processor = data;
            data = null;
        }
        return request({
            method: 'POST',
            url: url,
            data:  data instanceof FormData ? data : Object.assign({}, data)
        }, processor, isUpload);
    },
    request: request
};

function setServiceUrl(url) {
    serviceUrl = url;
}

function setToken(userToken) {
    userInfo = userToken;
/*    console.info(userToken);
    token = userToken.token;
    userId = userToken.userId;*/
    //token = _token;

}

function getToken() {
    return userInfo;
}

/**
 * 添加拦截器
 */
function addInterceptor(interceptor) {
    interceptors = [interceptor];
}

function unInterceptAlerting() {
    isInterceptAlerting = false;
}
function interceptAlerting(){
    isInterceptAlerting = true;
}

export {setServiceUrl, setToken, getToken, addInterceptor,unInterceptAlerting,interceptAlerting};
export default RequetService;
