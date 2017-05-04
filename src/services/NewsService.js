/**
 * Created by linyao on 2016/10/18.
 */

import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';
const serviceUrl = `${Server.NEWS_SERVICE}`;

function makeUrl(path = "") {
    return serviceUrl + path;
}

export function getCategorys() {
    return RequestService.get(
        makeUrl(),
        {
            json: 'get_category_index'
        },
        (res) => {
            return Promise.resolve({categories: res.categories})
        }
    );
}

export function getCategoryPosts(id) {
    return RequestService.get(
        makeUrl(),
        {
            json: 'get_category_posts',
            id: id
        },
        (res) => {
            return Promise.resolve({list: res.posts})
        }
    );
}