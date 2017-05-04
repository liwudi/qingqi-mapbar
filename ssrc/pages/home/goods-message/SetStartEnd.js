/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Navigator
} from 'react-native';
import AreaList from './components/AreaList';
import BaseBtn from '../../../components/widgets/Button';
import Button from './components/Button';
import Location from './components/Location';
import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;
const copyArr = function (arr) {
    let str = JSON.stringify(arr);
    arr = JSON.parse(str);
    return arr;
}
export default class SetStartEnd extends Component {
    constructor(props) {
        super(props);
        this.idx = this.initIdx = props.info.length - 1;
        this.state = {};
        this.info = copyArr(props.info);
    }

    componentDidMount() {
        this.setRefresh();
    }

    setRefresh = (next = ()=> {}) => {
        this.setState({[`random${this.idx}`]: Math.random()}, next);
    }

    deleteItem(idx) {
        this.info.splice(idx, 1);
    }


    goToList = () => {
        this.props.set(copyArr(this.info));
        this.props.router.pop();
    }

    goToLastPage = () => {
        this.nav.pop();
        this.deleteItem(this.idx--);
        this.setRefresh();
    }

    goToNextPage(nextRoute, query) {
        let idx = this.idx,
            info = this.info;
        info[idx + 1] = {
            query: {...query}
        }
        this.idx++;
        this.setRefresh();
    }

    onPress(sinfo, nextRoute) {
        let info = this.info, idx = this.idx;
        if (sinfo.first) {
            //每页第一个，全国 全省 全市
            if (idx) this.deleteItem(idx);
            else info[idx] = sinfo;
            this.setRefresh(this.goToList);
        } else if (sinfo.current.level === 3) {
            //选择到区，最后一级
            info[idx] = sinfo;
            this.setRefresh(this.goToList);
        } else {
            let current = sinfo.current,
                query = sinfo.query,
                nextQueryParams = {
                    name: current.name,
                    code: current.code,
                    level: query.level + 1
                };
            info[idx] = sinfo;
            this.nav.push(nextRoute);

            if (!idx) {
                //在省级别，选中了直辖市，直接查询条件设置为三级
                //直辖市编码
                let municipal = {
                    //省级编码：区县级编码
                    '110000': '110100', '120000': '120100', '310000': '310100', '500000': '500100'
                };
                let isMc = current.code in municipal;
                if (isMc) {
                    sinfo.isMc = isMc;
                    nextQueryParams.level = 3;
                    nextQueryParams.code = municipal[current.code];
                }
            }
            this.setRefresh(() => {
                this.goToNextPage(nextRoute, nextQueryParams)
            });
        }
    }

    renderProvince(dv) {
        let view = <Button title={this.province.name || dv} selectBd={!!this.province.name}/>;
        return view;
    }

    renderCity(dv) {
        let view = <View/>;
        if (this.province.name && this.idx > 0) {
            view = <Button title={this.city.name || dv} selectBd={!!this.city.name}/>;
        }
        return view;
    }

    renderArea(dv) {
        let view = <View/>;
        if (!this.province.isMc && this.province.name && this.city.name && this.idx > 1) {
            view = <Button title={this.area.name || dv} selectBd={!!this.area.name}/>;
        }
        return view;
    }

    renderBack() {
        let view = <View/>;
        if (this.info.length > 1) {
            view = <BaseBtn onPress={this.goToLastPage}><Text
                style={[estyle.padding, estyle.note, {color: Env.color.main}]}>返回上一级</Text></BaseBtn>
        }
        return view;
    }

    renderNavigationBar() {
        this.province = this.info[0] || {};
        this.city = this.info[1] || {};
        this.area = this.info[2] || {};
        let info = this.province.isMc ? ['省', '区县', ''] : ['省', '市', '区县'],
            view = <View style={[estyle.cardBackgroundColor]}>
                <View style={[estyle.fxRow]}>
                    {this.renderProvince(info[0])}
                    {this.renderCity(info[1])}
                    {this.renderArea(info[2])}
                </View>
                <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                    <Text style={[estyle.padding, estyle.fx1, estyle.note]}>{`选择${info[this.idx]}`}</Text>
                    {this.renderBack()}
                </View>
            </View>;
        return view;
    }

    render() {
        const routes = [
            {component: AreaList, idx: 0},
            {component: AreaList, idx: 1},
            {component: AreaList, idx: 2}
        ];

        return (

            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title={this.props.title}/>
                <Location {...this.props}/>
                {this.renderNavigationBar()}
                <Navigator
                    initialRoute={routes[this.initIdx]}
                    initialRouteStack={routes}
                    renderScene={(route, navigator) => {
                        this.nav = this.nav || navigator;
                        let Component = route.component,
                            random = this.state['random' + route.idx],
                            obj = this.info[route.idx] || {};
                        return <View style={[estyle.fx1]}>
                            <Component
                                random={random}
                                current={obj.current || {}}
                                query={obj.query || {}}
                                onPress={(sinfo) => {
                                    let nextRoute = routes[route.idx + 1];
                                    this.onPress(sinfo, nextRoute);
                                }}
                            />
                        </View>
                    }}
                />
            </View>
        );
    }
}