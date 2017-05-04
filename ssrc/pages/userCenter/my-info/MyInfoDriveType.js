/**
 * Created by cryst on 2016/10/16.
 * edit by zhaidongyou on 2016/10/17
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ListView,
    ScrollView
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import * as Icons from '../../../components/Icons';
import  Env from '../../../utils/Env';
import {modifyDriverInfo} from '../../../services/UserService';
import LabelInput from '../../../components/LabelInput';
import Toast from '../../../components/Toast';
import { getUserDetail } from '../../../actions/UserActions';

const estyle = Env.style;

class MyInfoDriveType extends Component {
    constructor(props){
        super(props);
        this.userInfo = props.userStore.userInfo;
        this.state = {
            doing: false,
            ls : [
                'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'C3'
            ],
            drivingLicenseString : this.userInfo.drivingLicenseString
        };
    }
    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    componentWillMount() {
        this.setState({name: this.userInfo.name});
    }
    onSave(data, idx) {
        console.info(arguments)
        if(this.state.doing) return;
        if(data === this.userInfo.drivingLicenseString) {
            this.setState({doing: false});
            //避免快速点击下路由报错
            //this.props.router.pop();
            return;
        }
        this.setState({drivingLicenseString: data, doing: true});

        modifyDriverInfo('', idx).then(()=>{
            Toast.show('驾驶证类型修改成功', Toast.SHORT);
            this.props.dispatch(getUserDetail());
            //避免快速点击下路由报错
            // setTimeout(() => {
            //     this.props.router.pop();
            // },1000);
        }).catch((e)=>{
            Toast.show(e.message, Toast.SHORT);
        }).finally(()=>{
            this.setState({doing: false});
        });
    }
    renderList() {
        return this.state.ls ? this.state.ls.map((data, idx) => {
            return <ViewForRightArrow key={idx} style={[estyle.borderBottom]}
                                      rightIcon={this.state.drivingLicenseString === data ? Icons.IconCheckMark :null}
                                      onPress={()=>{this.onSave(data, +idx + 1);}}
                                      iconColor={Env.color.main}
                                      iconSize={Env.vector.checked.size.large}>
                        <Text>{data}</Text>
                    </ViewForRightArrow>;
        }) : <View/>;
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="选择驾驶证类型"/>
                <ScrollView style={[estyle.fx1]}>
                    {this.renderList()}
                </ScrollView>
            </View>
        );
    }
}
export default connect(function(stores) {
    return { userStore: stores.userStore }
})(MyInfoDriveType);