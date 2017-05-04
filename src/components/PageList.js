/**
 * Created by ligj on 2016/10/20.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    ListView,
    RefreshControl
} from 'react-native';

import Env from '../utils/Env';

import Toast from './Toast';

export default class PageList extends Component {

    static defaultProps = {
         clickMore:'加载更多',
         loadingMore: '加载中...',
         noMore: '已经没有更多数据了',
         noData:'没有数据'
    };


    pageNumber = 1;
    pageSize = 20;

    constructor(props){
        super(props);

        this.pageNumber = this.props.pageNumber || this.pageNumber;
        this.pageSize = this.props.pageSize || this.pageSize;

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
            return JSON.stringify(r1) !== JSON.stringify(r2);
        }});
        this._data = [];
        this.state = {
            ds,
            refreshing: true,
            isLoading : false,
            isInit:false,
            pageTotal : 0,
            resultList : []
        };
        this.reInitField = this.props.reInitField || null;
        this.active = false; //页面活动状态
    }

    getActive() {
        return this.active;
    }
    startActive() {
        this.active = true;
    }
    stopActive() {
        this.active = false;
    }

    getData(pageNumber){

        this.pageNumber = pageNumber || this.pageNumber;
        this.props.fetchData(this.pageNumber, this.pageSize)
            .then(rs => {
                rs = rs || {};
                this._data = rs.list && rs.list.length > 0 ? this._data.concat(rs.list) : this._data;
                if(this._data !== []){
                    if(this.getActive()) {
                        this.setState({
                            ds: this.state.ds.cloneWithRows(this._data),
                            pageTotal : rs.page_total || 0
                        });
                    }
                }
            })
            .catch(e => {
                Toast.show(e.message || '未获取到数据', Toast.SHORT);
            })
            .finally(() => {
                if(this.getActive()) {
                    this.setState({
                        isLoading : false,
                        refreshing: false
                    });
                }

            });
    }

    nextPage(){
        this.setState({
            isLoading : true
        });
        this.pageNumber++;
        this.getData();
    }

    componentDidMount(){
        this.startActive();
        this.timer=setTimeout(() => {
            this.getData();
        }, 500);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        this.stopActive();
    }

    reInitFetch(){
        this._onRefresh();
    }

    timer = null;
    componentWillReceiveProps(nextProps){
        if(nextProps.reInitField){
            if(
                this.reInitField.some((item, index) => {
                    return item != nextProps.reInitField[index];
                })
            ){
                this.timer && clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this._data = [];
                    this._onRefresh();
                }, 500);
            }
            this.reInitField = nextProps.reInitField;
        }
    }

    _onRefresh = ()=>{
        this.setState({
            refreshing: true
        });
        this._data = [];
        this.getData(1);
    }

    render() {
        return (
            <View  style={[this.props.style]}>
                <ListView
                    style={{flex:1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            colors={Env.refreshCircle.colors}
                            progressBackgroundColor={Env.refreshCircle.bg}
                        />
                    }
                    enableEmptySections={true}
                    removeClippedSubviews={Env.isIOS ? false : true}
                    dataSource={this.state.ds}
                    renderRow={this.props.renderRow}
                    renderFooter={() => {
                        if((this.state.pageTotal || this._data.length) <= this.pageNumber){
                            return (this.state.isLoading || this.state.refreshing) ? null : <View style={[Env.style.fxCenter, Env.style.padding]}>{this._data.length === 0 ? (this.props.noDataView || <Text>{this.props.noData}</Text>) : <Text>{this.props.noMore}</Text>}</View>;
                        }
                        if(this.state.pageTotal > this.pageNumber){
                            return <View style={[Env.style.fxCenter, Env.style.padding]}><Text onPress={() => this.nextPage()}>{this.state.isLoading ? this.props.loadingMore : this.props.clickMore}</Text></View>
                        }
                        return null;
                    }}

                />
            </View>

        );
    }
}
