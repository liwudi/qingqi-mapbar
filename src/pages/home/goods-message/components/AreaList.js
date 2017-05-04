import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';
import Toast from '../../../../components/Toast';
import Button from './Button';
import {goodsAreaList} from '../../../../services/AppService';
import Env from '../../../../utils/Env';

const estyle = Env.style;
export default class AreaList extends Component {
    constructor() {
        super();
        this.state = {
            refreshing: true,
            list: [],
            current: {},
            query: {}
        }
        this.titles = ['', '全国', '全省', '全市'];
    }

    componentWillReceiveProps(props, state) {
        this.toFetch(props);
    }
    componentDidMount() {
        this.toFetch(this.props);
    }
    toFetch(props) {
        if(!props.random) return;
        if(this.state.list.length) return;
        if(this.state.query.code == props.query.code && this.state.query.level == props.query.level) return;
        this.setState({current: {...props.current}, query:{...props.query}}, ()=>{
            setTimeout(this.fetchData, 500);
        });
    }
    fetchData = () => {
        let query = this.state.query;
        goodsAreaList(query.code, query.level).then((data) => {
            let list = data.list, refreshing = false;
            this.setState({list, refreshing});
        }).catch(e => {
            Toast.show(e.message, Toast.SHORT);
            this.setState({refreshing: false});
        });
    }
    renderList() {
        let list = this.state.list || [];
        if(!list.length) {
            return <View/>;
        }
        list[0] = {
            ...this.state.query
        }
        return list.map((v, k) => {
            let title = this.titles[this.state.query.level],
                first = !k;
            if(v.name) v.name = v.name.replace('自治', '');

            return <Button title={k ? v.name : title} key={k} selectBg={this.state.current.code===v.code} onPress={() => {
                let current = {...this.state.current};
                current.code = v.code;
                this.setState({current}, () => {
                    setTimeout(() => {
                        this.props.onPress({
                            first: first,
                            name: first ? title : v.name,
                            current: {...v, level: this.state.query.level},
                            query: {
                                ...this.state.query
                            }
                        })
                    }, 100);
                });
            }}
            />
        });
    }
    render () {
        return (
            <View style={[estyle.fx1, estyle.cardBackgroundColor]}>
                <ScrollView style={[estyle.fx1]} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.fetchData}
                        colors={Env.refreshCircle.colors}
                        progressBackgroundColor={Env.refreshCircle.bg}
                    />
                }>
                    <View style={[estyle.fx1, estyle.fxRow, {overflow: 'hidden', flexWrap:'wrap'}]}>
                        {this.renderList()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}