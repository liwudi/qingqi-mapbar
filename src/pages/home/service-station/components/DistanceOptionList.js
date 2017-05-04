/**
 * Created by linyao on 2016/10/18.
 */
import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet, ListView, ScrollView,TouchableOpacity} from 'react-native';
import Env from '../../../../utils/Env';
import Button from '../../../../components/widgets/Button'
import * as Icons from '../../../../components/Icons';
import ViewForRightArrow from '../../../../components/ViewForRightArrow';
export default class DistanceOptionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked:0
        };
    }
    static defaultProps = {
        type: [{key:0,value:'距离优先'},{key:1,value:'星级优先'}
        ]
    };

    _onPress() {
    }


    renderListView() {
        return this.props.type.map((data,idx)=>{
            return <ViewForRightArrow key={idx} style={[estyle.borderBottom]}
                                      rightIcon={this.state.checked === data.key ? Icons.IconCheckMark :null}
                                      onPress={()=>{this.setState({checked:data.key});this.props.onPress(data)}}
                                      iconColor={Env.color.main}
                                      iconSize={Env.vector.checked.size.large}>
                <Text>{data.value}</Text>
            </ViewForRightArrow>;
        })
    }

    render() {
        return (
            <View style={[estyle.fx1]}>
                <View style={[estyle.cardBackgroundColor]}>
                    { this.renderListView() }
                </View>
                <TouchableOpacity style={[estyle.fx1]} onPress={()=>{this.props.close()}}>
                    <View style={[estyle.fx1,{width: Env.screen.width}]}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const estyle = Env.style;