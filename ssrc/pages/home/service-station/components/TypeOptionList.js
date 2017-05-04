import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet, ListView, ScrollView,TouchableOpacity} from 'react-native';
import TypeOptionLabel from './TypeOptionLabel'
import Env from '../../../../utils/Env';
import * as Icons from '../../../../components/Icons';
import ViewForRightArrow from '../../../../components/ViewForRightArrow';
export default class TypeOptionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked:''
        };
    }
    static defaultProps = {
        type: [{key:'',value:'全部'},{key:5,value:'五星'},{key:4,value:'四星'},{key:3,value:'三星'}
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