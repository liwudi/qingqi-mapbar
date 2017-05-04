/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';

import Env from '../../../utils/Env';
import TopBanner from '../../../components/TopBanner';
import ConfirmButton from '../../../components/ConfirmButton'
import TextArea from '../../../components/widgets/TextArea.android';
import TouchStarGroup from '../../../components/TouchStarGroup'
import Toast from '../../../components/Toast';
import {orderConfir} from '../../../services/ServiceStationService';
import Item from './components/ServiceStationAppointmentItem';
import SubmitButton from '../../../components/SubmitButton';

const estyle = Env.style,
    basefont = Env.font.base;
export default class ServiceStationEvaluate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: '',
            content: ''
        }
    }

    assess() {
        if (this.state.score) {
            if (this.state.doing) return;
            this.setState({doing: true});
            orderConfir(this.props.woCode, this.state.score, this.state.content, this.props.stationId)
                .then(() => {
                    this.props.prantFetch && this.props.prantFetch();
                    Toast.show('恭喜您，评价成功！', Toast.SHORT);
                    this.props.router.pop();
                })
                .catch((err) => {
                    Toast.show(err.message, Toast.SHORT);
                })
                .finally(() => {
                    this.setState({doing: false});
                })
        } else {
            Toast.show('服务评星不能为空', Toast.SHORT);
        }
    }

    render() {
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="服务站评价"/>
                <View style={[estyle.fx1]}>
                    <View style={[estyle.cardBackgroundColor, estyle.margin, estyle.paddingHorizontal]}>
                        <View style={[estyle.borderBottom, estyle.fxRowCenter]}>
                            <Text
                                style={[estyle.text, estyle.padding, {color: Env.color.important}]}>{this.props.stationName}</Text>
                        </View>
                        <View style={[estyle.fxRowCenter]}>
                            <Text style={[estyle.note]}>服务评星</Text>
                            <TouchStarGroup score={0} size={Env.vector.star.size.large} onChange={(score) => {
                                this.setState({score: score})
                            }}/>
                        </View>
                        <View
                            style={[estyle.border, estyle.cardBackgroundColor, estyle.padding, estyle.marginVertical]}>
                            <TextInput
                                style={[estyle.text, {height: 150 * Env.font.base}]}
                                onChangeText={ (text) => {
                                    this.setState({content: text})
                                } }
                                placeholder="对服务站的服务说点什么"
                                maxLength={60}
                                multiline={true}
                                placeholderTextColor={Env.color.note}
                            />
                            <Text style={[estyle.note, {textAlign: 'right'}]}>最多输入60个字</Text>
                        </View>
                    </View>
                    <View style={[estyle.fxRowCenter, estyle.marginBottom]}>
                        <SubmitButton style={[estyle.marginTop]}
                                      doing={this.state.doing}
                                      onPress={() => {
                                          this.assess()
                                      }}>提交评价</SubmitButton>
                    </View>
                </View>
            </View>
        );
    }
}