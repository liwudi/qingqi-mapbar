/**
 * Created by cryst on 2016/10/20.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import Env from '../../../../utils/Env';
const estyle = Env.style;
import ViewForRightArrow from '../../../../components/ViewForRightArrow';
import {IconUser} from '../../../../components/Icons'
export default class MyCarItem extends Component {


    render() {
        let data = this.props.data;
       // console.info(data)
        return (
            <View>
                <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                    <Text style={[estyle.articleTitle]}>{data.carCode || '未设置车牌号'}</Text>
                    {data.status == 1  && <View style={[styles.currentCar, { paddingHorizontal: Env.font.base * 10}]}><Text
                        style={[{color: '#fff', fontSize:Env.font.mini}]}>当前车辆</Text></View>}

                </View>
                <View style={[estyle.fxRow, {alignItems:'flex-end'}]}>
                    <IconUser color={Env.color.main}/>
                    <Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
                    <Text style={[estyle.note, {color: Env.color.text}]}>{data.mainDriver||"无"}</Text>
                    <Text style={[estyle.note, estyle.marginLeft]}>副：</Text>
                    <Text style={[estyle.note, {color: Env.color.text}]}>{data.subDriver||"无"}</Text>
                </View>
            </View>
      /*      <ViewForRightArrow onPress={this.props.onPress} rightIcon={this.props.icon && IconFontAwesome}>

            </ViewForRightArrow>*/
        )
    }
}
const styles = StyleSheet.create({
    currentCar: {
        borderRadius: 10,
        backgroundColor: Env.color.auxiliary,
        marginLeft:10
    }
});