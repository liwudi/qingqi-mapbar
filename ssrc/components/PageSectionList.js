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
    RefreshControl,
    TouchableOpacity,
    PanResponder
} from 'react-native';

import Env from '../utils/Env';

import Toast from './Toast';


//https://github.com/hugohua/rn-listview-example/blob/master/index.ios.js
export default class PageSectionList extends Component {

    static defaultProps = {
        clickMore:'加载更多',
        loadingMore: '加载中...',
        noMore: '已经没有更多数据了',
        noData:'没有数据'
    };

    pageNumber = 1;
    pageSize = 20;

    static defaultProps = {
        getSectionData: data => data
    }

    constructor(props){
        super(props);

        this.pageNumber = this.props.pageNumber || this.pageNumber;
        this.pageSize = this.props.pageSize || this.pageSize;

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
            sectionHeaderHasChanged: (s1, s2) => JSON.stringify(s1) !== JSON.stringify(s2)
        });
        this._data = {};
        this.state = {
            ds,
            refreshing: true,
            isLoading : false,
            isInit:false,
            pageTotal : 0,
            resultList : [],
            currentSelectIndex : -1
        };
        this.reInitField = this.props.reInitField || null;
        this.keys = {};
    }

    getData(pageNumber){
        // Toast.show('正在查询', Toast.SHORT);
        this.pageNumber = pageNumber || this.pageNumber;
        this.props.fetchData(this.pageNumber, this.pageSize)
            .then(rs => {
                this._data = Object.assign({}, this.props.getSectionData(rs.list));
                this._keysCount = Object.keys(this._data).length || 0;
                // this._data = rs.list && rs.list.length > 0 ? Object.assign({}, this._data, this.props.getSectionData(rs.list)) : this._data;

                if(this._data){
                    if(!rs.list || rs.list.length === 0) {
                        Toast.show('没有查询到结果', Toast.SHORT);
                    }
                    this.setState({
                        ds: this.state.ds.cloneWithRowsAndSections(this._data),
                        pageTotal : rs.page_total || 0,
                        refreshing: false
                    });
                }
                setTimeout(() => {
                    this.setState({refreshing: false});
                }, 150);
            })
            .catch(e => {
                Toast.show(e.message || '未获取到数据', Toast.SHORT);
                this.setState({refreshing: false});
            })
            .finally(() => {
                this.setState({
                    isLoading : false,
                    //refreshing: false
                });
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
        setTimeout(() => {
            this.getData();
        },500);
    }

    reInitFetch(){
        this._onRefresh();
    }

    timer = null;
    componentWillReceiveProps(nextProps){
        if(nextProps.reInitField){
            this.setState({ds: this.state.ds.cloneWithRowsAndSections({})});
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

    _startY = 0;
    _startLocationY = 0;
    _keysCount = 0;
    _preKey = null;
    _onPress = (evt) => {
        let _index = Math.floor((evt.nativeEvent.pageY - this._startLocationY) / (Env.screen.height/30));
        let _key = Object.keys(this._data)[_index];
        this.setState({
            currentSelectIndex: _index
        });
        if(_key && this._preKey !== _key){
            this.refs.listView.scrollTo({ y: this.keys[_key].y, animated: true });
            this._preKey = _key;
        }
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.setState({
                    currentSelectIndex: -1
                });
            },
            onPanResponderGrant: (evt) => {
                this._startY = evt.nativeEvent.pageY;
                this._onPress(evt);
            },
            onPanResponderMove: this._onPress,
        });
    }

    render() {
        let dataKeys = Object.keys(this._data);



        const _listView = () => {
/*            console.info(this.refresh)
            console.info(this.state.refreshing)
            console.info(this.state.ds)*/
            if(!this._listView || this.refresh !== this.state.refreshing){
                this._listView = <ListView
                    ref="listView"
                    style={{flex:1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            colors={Env.refreshCircle.colors}
                            progressBackgroundColor={Env.refreshCircle.bg}
                        />
                    }
                    initialListSize={1000}
                    showsVerticalScrollIndicator={false}
                    enableEmptySections={true}
                    removeClippedSubviews={Env.isIOS ? false : true}
                    dataSource={this.state.ds}
                    renderRow={this.props.renderRow}
                    renderSectionHeader={(sectionData, sectionId) =>
                        <View onLayout={(e) => {
                            this.keys[sectionId] = e.nativeEvent.layout;
                        }}>{this.props.renderSectionHeader(sectionData, sectionId)}</View>
                    }
                    renderFooter={() => {
                        if((this.state.pageTotal || this._data.length) <= this.pageNumber){
                            return (this.state.isLoading || this.state.refreshing) ? null : <View style={[Env.style.fxCenter, Env.style.padding]}><Text>{this._data.length === 0 ? this.props.noData : this.props.noMore}</Text></View>;
                        }else {
                            //return <View style={[Env.style.fxCenter, Env.style.padding]}><Text onPress={() => this.nextPage()}>{this.state.isLoading ? '加载中...' : '加载更多'}</Text></View>
                            return null;
                        }
                    }}
                />
            }
            this.refresh = this.state.refreshing;
            return this._listView;
        }


        return (
            <View onLayout={(e) => {
                this._startViewY = e.nativeEvent.layout.y;
            }}
                  style={[this.props.style,{paddingRight:Env.font.base * 20}]}>
                {_listView()}
                <View  style={[
                    Env.style.fxCenter,
                    Env.style.fxColumn,
                    {
                        position:'absolute',
                        width:Env.font.base * 20,
                        height:Env.screen.height,
                        top:0,
                        right:0,
                    }]}>
                    <View {...this._panResponder.panHandlers} onLayout={(e) => {
                        this._startLocationY = e.nativeEvent.layout.y + this._startViewY;
                    }}>
                        {dataKeys.map((item,index) =>
                            <View
                                style={{width:Env.font.base * 20,height:Env.screen.height/30,backgroundColor:'rgba(0,0,0,0)'}}
                                key={index}
                                onPress={() => {
                                    this.refs.listView.scrollTo({ y: this.keys[item].y, animated: true });
                                }}>
                                <Text style={[{textAlign:'center',color:Env.color.main,fontSize:Env.font.base*16}]}>{item}</Text>
                            </View>)}
                    </View>
                </View>
                {
                    dataKeys[this.state.currentSelectIndex] ? <View style={[
                        Env.style.fxCenter,
                        {
                            position:'absolute',
                            width:Env.font.base * 80,
                            height:Env.font.base * 80,
                            top:(Env.screen.height) / 2 - 80,
                            left:(Env.screen.width - Env.font.base * 80) / 2,
                            backgroundColor:Env.color.main
                        }]}>
                        <Text style={{fontSize:Env.font.base * 50,color:'#FFF'}}>{dataKeys[this.state.currentSelectIndex] || ''}</Text>
                    </View> : null
                }

            </View>

        );
    }
}