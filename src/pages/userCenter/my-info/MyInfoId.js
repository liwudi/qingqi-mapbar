/**
 * Created by cryst on 2016/10/16.
 * edit by zhaidongyou on 2016/10/17
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import LabelInput from '../../../components/LabelInput';
import Env from '../../../utils/Env';
import { getUserDetail } from '../../../actions/UserActions';
import Toast from '../../../components/Toast';
import SubmitButton from '../../../components/SubmitButton';
import {modifyDriverInfo} from '../../../services/UserService';

class MyInfoId extends Component {
    constructor(props){
        super(props);
        this.state = {
            doing: false
        };
    }

    componentWillMount() {
        this.setState({identityCard:this.props.data.identityNo});
    }

    onSave() {
        if (LabelInput.Validate(this.refs)) {
            // if(this.props.userStore.userInfo.identityCard === this.state.identityCard) {
            //     this.props.router.pop();
            //     return;
            // }
            if(this.props.successFun){
                this.props.successFun({identityNo:this.state.identityCard})
                    .then(()=>{
                        Toast.show('身份证修改成功', Toast.SHORT);
                        this.props.router.pop();
                    })
                    .catch((e)=>{
                        Toast.show(e.message, Toast.SHORT);
                    })
                    .finally(()=>{
                        this.setState({doing: false});
                    })
            }
        }
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="身份证"/>
                <View  style={[estyle.fxRowCenter]}>
                    <LabelInput
                        ref="identityCard"
                        style={[estyle.marginTop, estyle.borderBottom]}
                        onChangeText={identityCard => {
                            this.setState({identityCard:identityCard.toUpperCase()});
                        }}
                        defaultValue={this.props.data.identityNo}
                        secureTextEntry={true}
                        placeholder='请输入18位身份证号码'
                        label="身份证"
                        autoCapitalize="characters"
                        labelSize="3"
                        maxLength={18}
                        validates={[
                            {require:true, msg: '请输入身份证号码'},
                            {pattern:Env.pattern.identityCard, msg:'身份证格式错误'}
                        ]}
                    />
                    <View style={[estyle.fxRow, estyle.padding]}>
                        <Text style={[estyle.text]}>&nbsp;</Text>
                    </View>
                    <SubmitButton size="large"
                                   doing={this.state.doing}
                                   onPress={() => this.onSave()}>保存</SubmitButton>
                </View>

            </View>
        );
    }
}
const estyle = Env.style;
export default connect(function(stores) {
    return { userStore: stores.userStore }
})(MyInfoId);