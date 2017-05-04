/**
 * Created by linyao on 2017/4/11.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Navigator
} from 'react-native';
import TopBanner from '../../../components/TopBanner';
import QRCode from 'react-native-qrcode';
import Env from '../../../utils/Env';
import huabian1 from '../../../assets/images/huabian1.png';
import huabian2 from '../../../assets/images/huabian2.png';
import huabian3 from '../../../assets/images/huabian3.png';

const estyle = Env.style;
const basefont = Env.font.base;
export default class CouponQRCode extends Component {
    render() {
        let data=this.props.data;
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="二维码查看"/>
                <View style={[estyle.fx1]}>
                    <View style={[estyle.padding]}>
                        <Image source={huabian1} style={styles.huabian1}/>
                        <View style={[estyle.cardBackgroundColor, estyle.paddingTop, estyle.fxCenter]}>
                            <View style={[estyle.padding]}>
                                <Text style={[estyle.note]}>请向商家或服务站出示消费码或二维码使用优惠劵</Text>
                            </View>
                        </View>
                        <Image source={huabian2} style={styles.huabian2}/>
                        <View style={[estyle.fxCenter,estyle.cardBackgroundColor]}>
                            <QRCode
                                value={data.tradeCode}
                                size={300 * basefont}
                                bgColor='#000'
                                fgColor='#fff'/>
                            <View style={[estyle.fxCenter,estyle.paddingVertical]}>
                                <Text style={[estyle.text,estyle.padding,estyle.borderTop]}>{data.tradeCode}</Text>
                            </View>
                        </View>
                        <Image source={huabian3} style={styles.huabian1}/>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    huabian1: {
        width: Env.screen.width - 60 * basefont,
        height: 15 * basefont
    },
    huabian2: {
        width: Env.screen.width - 60 * basefont,
        height: 54 * basefont,
    }
})