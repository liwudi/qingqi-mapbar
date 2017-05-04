/**
 * Created by cryst on 2016/10/12.
 */
/**
 * Created by cryst on 2016/10/10.
 */
import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image, Alert} from 'react-native';
import StarGroup from '../../../../components/StarGroup'
import Env from '../../../../utils/Env';
import ServiceStationAppointmentDetail from '../ServiceStationAppointmentDetail';
import {delRated} from '../../../../services/ServiceStationService';
import Toast from '../../../../components/Toast';
const basefont = Env.font.base;
const estyle = Env.style;
export default class ServiceStationAppointmentItem extends Component {
    _onPress() {
    }

    //删除评论
    delMyRated(id) {
        delRated(id)
            .then(() => {
                this.props.RenderList && this.props.RenderList();
                Toast.show('删除成功', Toast.SHORT)
            })
            .catch(() => {
                Toast.show('删除失败', Toast.SHORT)
            })
    }

    render() {
        console.log('头像',this.props.photo);
        return (
            <View style={[estyle.cardBackgroundColor, estyle.borderBottom, estyle.padding]}>
                <View style={[estyle.fxRow,estyle.fxCenter]}>
                    <View style={[estyle.marginRight]}>
                        <Image
                            source={this.props.photo}
                            style={[styles.photo,{position: 'absolute',top:0,left:0,zIndex:10}]}
                        />
                        <Image
                            source={require('../../../../assets/images/driver.png')}
                            style={styles.photo}
                        />
                    </View>
                    <View style={[estyle.fx1]}>
                        <View style={[estyle.fxRowCenter, estyle.fxRow]}>
                            <Text
                                onPress={()=>{ this.props.orderCode && this.props.router.push(ServiceStationAppointmentDetail,{order:{woCode:this.props.orderCode}}) }}
                                style={[estyle.text,{color: this.props.orderCode ? Env.color.main:Env.color.text}]}>{this.props.name}</Text>
                            <Text
                                style={[estyle.fx1, estyle.marginLeft, estyle.note,{textAlign:'right'}]}>{this.props.carType}</Text>
                        </View>
                        <View style={[estyle.fxRowCenter, estyle.fxRow, {marginVertical: basefont * 12}]}>
                            <StarGroup score={this.props.score} size={Env.vector.star.size.small}/>
                            {
                                this.props.orderCode ?
                                    <Text onPress={()=>{
                                         Alert.alert(
                                            '删除评论',
                                            '您确定要删除该条评价吗？',
                                            [
                                              {text: '确认', onPress: () => this.delMyRated(this.props.ratedId)},
                                              {text: '取消', onPress: () => console.log('Pressed!')},
                                            ]
                                        )
                                     }} style={[estyle.marginLeft, estyle.note,{color:Env.color.main}]}>删除</Text>
                                    : null
                            }
                            <Text style={[estyle.fx1,estyle.marginLeft, estyle.note,{textAlign:'right'}]}>{this.props.date}</Text>
                        </View>
                    </View>
                </View>
                <Text style={[estyle.note,estyle.marginTop]}>{this.props.content}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    photo: {
        width: basefont * 70,
        height: basefont * 70,
        borderRadius: basefont * 35
    }
});

