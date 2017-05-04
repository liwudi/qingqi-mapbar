import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import Button from './Button';
import {carModel, carLength} from '../../../../services/AppService';
import Env from '../../../../utils/Env';
const estyle = Env.style;
const models = [0,'高栏车','挂车','平板车','厢车','冷藏车','特种车','高低板'],
    lengths = [0,'4.2','4.5','5.2','6.2','6.8','7.2','7.6','8.2','9.6','11.7','12.0','12.5','13.0','13.5','14.0','16.0','17.0','17.5'
        ,'18.0','22.0'];
export default class Area extends Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }
    //车型
    carModel(){
        return Promise.resolve({
            list: models
        });
    }
    //车长
    carLength(){
        return Promise.resolve({
            list: lengths
        });
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let service = this.props.type === 'model' ? this.carModel : this.carLength;
        service().then(data => {
            this.setState({list: data.list});
        })
    }
    renderList() {
        let list = this.state.list || [];
        return list.length ? list.map((v, k) => {
            return <Button title={v||'不限'} key={k} selectBg={this.props.select==v} onPress={() => {this.props.onPress(v)}}/>
        }) : <View/>;
    }
    render () {
        return (
            <View style={[estyle.fxRow, estyle.cardBackgroundColor]}>
                <ScrollView>
                    <View style={[estyle.fxRow, {overflow: 'hidden', flexWrap:'wrap'}]}>
                        {this.renderList()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}