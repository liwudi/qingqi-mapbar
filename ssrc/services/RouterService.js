/**
 * Created by ligj on 2016/10/12.
 */
import React, { Component } from 'react';
import {
    Navigator
} from 'react-native';

// class PageComponent extends Component{
//     constructor(props){
//         super(props)
//     }
//     render(){
//         let Component = this.props.page.component;
//         console.log(this.props)
//         return (
//             <Component
//                 {...this.props}
//             />
//         );
//     }
// }

const Page = (page, props = {}) => {
    return {
        component: page,
        props: props
    }
};

export default class RouterService {

    static Page = Page;

    navigator = null;
    constructor(navigator){
        this.navigator = navigator;
    }

    push(page, props){
        this.navigator.push(Page(page, props));
    }

    replace(page, props){
        this.navigator.replace(Page(page, props));
    }

    resetTo(page, props){
        this.navigator.resetTo(Page(page, props));
    }
    popN(num,props){
        if(props){
            let _routers = this.navigator.getCurrentRoutes();
            let prePage = _routers[_routers.length - num];
            Object.assign(prePage.props, props);
            this.navigator.replacePreviousAndPop(prePage);
        }else {
            if(num && typeof num == 'number'){
                this.navigator.popN(num);
            }else {
                this.navigator.pop();
            }
        }
    }
    pop(props){
        /*
         如果后退时传入props参数, 会自动更新上一页面的props
         在父页面可以使用 componentWillReceiveProps 来监听 props 的变化，来做对应的操作
         */
        if(props){
            let _routers = this.navigator.getCurrentRoutes();
            let prePage = _routers[_routers.length - 2];
            Object.assign(prePage.props, props);
            this.navigator.replacePreviousAndPop(prePage);
        }else{
            this.navigator.pop();
        }
    }
    currentIndex() {
        return this.navigator.getCurrentRoutes().length;
    }

    /**
     * getCurrentRoutes() - 获取当前栈里的路由，也就是push进来，没有pop掉的那些。
     jumpBack() - 跳回之前的路由，当然前提是保留现在的，还可以再跳回来，会给你保留原样。
     jumpForward() - 上一个方法不是调到之前的路由了么，用这个跳回来就好了。
     jumpTo(route) - 跳转到已有的场景并且不卸载。
     push(route) - 跳转到新的场景，并且将场景入栈，你可以稍后跳转过去
     pop() - 跳转回去并且卸载掉当前场景
     replace(route) - 用一个新的路由替换掉当前场景
     replaceAtIndex(route, index) - 替换掉指定序列的路由场景
     replacePrevious(route) - 替换掉之前的场景
     resetTo(route) - 跳转到新的场景，并且重置整个路由栈
     immediatelyResetRouteStack(routeStack) - 用新的路由数组来重置路由栈
     popToRoute(route) - pop到路由指定的场景，在整个路由栈中，处于指定场景之后的场景将会被卸载。
     popToTop() - pop到栈中的第一个场景，卸载掉所有的其他场景。
     */

}