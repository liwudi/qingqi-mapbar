import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Env from '../../utils/Env';

export default class IconButton extends Component {
  render() {
  	const _size = this.props.size || Env.font.note;
    const _color = this.props.color || Env.color.text;
    return (
        <View style={[styles.container]} >
	        <Icon name={this.props.iconName} size={_size + 20} color={_color} />
	        <Text style={{fontSize:_size , color:_color, marginTop:-6 * Env.font.base}} >{this.props.title}</Text>
            {this.props.sign && this.props.sign > 0 ? <View style={[Env.style.fxCenter,{width:Env.font.base * 22,height:Env.font.base * 22,borderRadius:Env.font.base * 20,backgroundColor:'red',position:'absolute',top:0,right:Env.font.base * -16}]}>
                <Text style={{color:'#FFF',fontSize:Env.font.base * 16}}>{this.props.sign}</Text>
            </View> : null}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
