/**
 * Created by ligj on 2016/9/23.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import { UserActions } from '../../../actions/index';
import Toast from '../../../components/Toast';
import TopBanner from '../../../components/TopBanner';
import LabelInput from '../../../components/LabelInput';
import SubmitButton from '../../../components/SubmitButton';
import { modifyUserInfo } from '../../../services/UserService';
import HomeRouter from '../../HomeRouter';

import Env from '../../../utils/Env';

const estyle = Env.style;

const getBLen = function(str) {
    if (str == null) return 0;
    if (typeof str != "string"){
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g,"01").length;
}

class ModifyTrueName extends Component {
	constructor(props){
		super(props);
		this.userInfo = this.props.data ? {name: this.props.data.realName} : props.userStore.userInfo;
        this.state = {
            doing: false
        };
	}

	componentWillReceiveProps(nextProps){
		this.userInfo = nextProps.userStore.userInfo;
	}

	static Validate = LabelInput.Validate;
	validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    componentWillMount() {
        this.setState({name: this.userInfo.name});
    }
	onSave() {
		if (LabelInput.Validate(this.refs)) {
            if(getBLen(this.state.name) > 14){
                Toast.show('姓名不能超过7个汉字或14个字符', Toast.SHORT);
                return;
			}
            this.setState({doing: true});
            if(this.props.successFun){
                this.promiss(this.props.successFun({realname:this.state.name}));
            }else {
                this.promiss(modifyUserInfo(this.state.name));
            }
		}
	}
	promiss(pro){
        pro.then(()=>{
            !this.props.successFun && this.props.dispatch(UserActions.getUserDetail());
            Toast.show('姓名保存成功', Toast.SHORT);
            setTimeout(() => {
                this.toPage();
            },200);
        }).catch((e)=>{
            Toast.show(e.message, Toast.SHORT);
        }).finally(()=>{
            this.setState({doing: false});
        });
    }
	toPage() {
		if(this.props.router.navigator.getCurrentRoutes().length === 1) {
			this.props.router.resetTo(HomeRouter);
		} else {
			this.props.router.pop();
		}
	}
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="设置姓名" doBack={() => {
					if(this.props.userStore.userInfo.name){
						this.props.doBack();
					}else{
                        Toast.show('请输入真实姓名', Toast.SHORT);
					}

				}}/>
                <View  style={[estyle.fxRowCenter]}>
					<LabelInput
						ref="name"
						style={[estyle.marginTop, estyle.borderBottom]}
						onChangeText={name => {
							this.setState({name});
						}}
						defaultValue={this.userInfo.name}
						secureTextEntry={true}
						placeholder='请输入真实姓名'
						label="姓名"
						validates={[
							{require:true, msg: '请输入真实姓名'}
						]}
						maxLength={14}
					/>
					<View style={[estyle.marginBottom, estyle.fxRow, estyle.paddingHorizontal]}>
						<Text style={[estyle.note, estyle.fx1, {textAlign:'left'}]}>最长7个汉字，或14个字节</Text>
					</View>
					<SubmitButton size="large"
								  doing={this.state.doing}
                                   onPress={() => this.onSave()}>保存</SubmitButton>
				</View>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { userStore: stores.userStore }
})(ModifyTrueName);