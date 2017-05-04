/**
 * Created by mapbar on 2017/2/24.
 */
import React, {Component} from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import SubmitButton from '../../../components/SubmitButton';
import {IconClose, IconCaretDown} from '../../../components/Icons';
import {getProAbbreviation} from '../../../services/AppService';
import Toast from '../../../components/Toast';
import LabelInput from '../../../components/LabelInput';

class MyInfoCarCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabHeight: 0,
            carTypeList: [],
            pro: typeof (this.props.data.carNumber) === 'string' ? this.props.data.carNumber[0] : '京',
            code: typeof (this.props.data.carNumber) === 'string' ? this.props.data.carNumber.substring(1) : ''
        };
    }

    componentDidMount() {
        getProAbbreviation()
            .then((data) => {
                this.setState({carTypeList: data.list});
            })
            .catch((e) => {
                Toast.show(e.messsage, Toast.SHORT);
            })
    }

    onSave() {
        if (LabelInput.Validate(this.refs)) {
            if (this.props.data.carCode === (this.state.pro + this.state.code)) {
                this.props.router.pop();
                return;
            }
            this.setState({doing: true});
            if (this.props.successFun) {
                this.props.successFun({carNumber: (this.state.pro + this.state.code)})
                    .then(() => {
                        this.props.router.pop();
                    })
                    .catch((err) => {
                        Toast.show(err.message, Toast.SHORT);
                    })
                    .finally(() => {
                        this.setState({doing: false});
                    })
            }
        }
    }

    open() {
        this.setState({tabHeight: 400 * basefont})
    }

    close() {
        this.setState({tabHeight: 0})
    }

    typeListRender() {
        return (
            this.state.carTypeList.map((item, index) => {
                return <TouchableOpacity key={index} style={[estyle.paddingVertical, estyle.fxCenter, {
                    height: 100 * basefont,
                    width: 50 * basefont
                }]}
                                         onPress={() => {
                                             this.setState({pro: item.name});
                                             this.close();
                                         }}
                >
                    <Text
                        style={[estyle.text, {color: item.name === this.state.pro ? Env.color.main : Env.color.text}]}>{item.name}</Text>
                </TouchableOpacity>
            })
        )
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="车牌号"/>
                <ScrollView style={[estyle.fx1]}>
                    <View style={[estyle.marginTop]}>
                        <LabelInput
                            ref="cardLenght"
                            style={[estyle.marginTop, estyle.borderBottom]}
                            onChangeText={(clength) => {
                                this.setState({code: clength.toUpperCase()});
                            }}
                            onFocus={ this.close.bind(this)}
                            value={this.state.code}
                            defaultValue={this.props.data.carNumber ? this.props.data.carNumber.substring(1) : ''}
                            secureTextEntry={true}
                            placeholder='请输入车牌号'
                            autoCapitalize="characters"
                            labelSize="3"
                            maxLength={6}
                            leftView={
                                <View style={[{width: 200 * basefont}, estyle.fxRow]}>
                                    <Text style={[estyle.text, estyle.paddingVertical, {color: Env.color.important}]}>车牌号</Text>
                                    <TouchableOpacity style={[estyle.marginLeft, estyle.fxCenter, estyle.fxRow]}
                                                      onPress={this.open.bind(this)}>
                                        <Text
                                            style={[estyle.text, {marginRight: 10 * basefont}]}>{this.state.pro}</Text>
                                        <IconCaretDown />
                                    </TouchableOpacity>
                                </View>
                            }
                            validates={[
                                {require: true, msg: '请输入车牌号'},
                                {pattern: /^[A-Za-z][A-Za-z0-9]{5}$/, msg: '车牌号格式错误'}
                            ]}
                        />
                    </View>
                    <View style={[estyle.marginTop, estyle.fxCenter]}>
                        <SubmitButton size="large"
                                      doing={this.state.doing}
                                      onPress={() => this.onSave()}>保存</SubmitButton>
                    </View>
                </ScrollView>
                <View style={[estyle.padding, {height: this.state.tabHeight}]}>
                    <View style={[estyle.fxRow, estyle.padding, estyle.borderBottom]}>
                        <TouchableOpacity onPress={this.close.bind(this)}>
                            <IconClose color={Env.color.note}/>
                        </TouchableOpacity>
                        <View style={[estyle.fx1, estyle.fxCenter]}>
                            <Text style={[estyle.text]}>请选择省份</Text>
                        </View>
                    </View>
                    <ScrollView style={[estyle.fx1]}>
                        <View style={[estyle.fx1, estyle.fxRow, estyle.fxRowCenter, {
                            overflow: 'hidden',
                            flexWrap: 'wrap'
                        }]}>
                            {this.typeListRender()}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const basefont = Env.font.base;
const estyle = Env.style;
const styles = StyleSheet.create({});

export default MyInfoCarCode