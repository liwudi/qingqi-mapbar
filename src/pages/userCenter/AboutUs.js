/**
 * Created by cryst on 2016/10/9.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Linking
} from 'react-native';


import TopBanner from '../../components/TopBanner';
import ListItem from '../../components/ListItem';
import Env from '../../utils/Env';
import Agreement from '../user/Agreement';
import Button from '../../components/widgets/Button';
import { getAppVersion } from '../../services/UpdateService';

const estyle = Env.style;
export default class AboutUs extends Component {

    constructor(props){
        super(props);
        this.state = {
            versionName : '',
            versionCode : ''
        }
    }

    componentDidMount(){
        getAppVersion().then(v => {
            this.setState({
                versionName : v.versionName,
                versionCode : v.versionCode
            })
        });
    }

    render() {
        return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="关于我们"/>
				<View style={[estyle.fx1, estyle.fxCenter]}>
					<Image style={[{width:Env.font.base * 140,height:Env.font.base * 140}]}
						   source={require('../../assets/images/fawjiefang.png')}
					/>
				</View>
				<View style={[estyle.fx1]}>
					<ListItem left="官方网址" right="www.fawjiefang.com.cn" rightPress={() => {
                        Linking.openURL('http://www.fawjiefang.com.cn/').catch(err => console.error('An error occurred', err));
                    }}/>
                    {/*<ListItem left="客服电话" right="400-1234-123"/>*/}
					<ListItem left="版本信息" right={this.state.versionName}/>
				</View>
				<View style={[estyle.fx1, estyle.fxRowCenter, {justifyContent: 'flex-end'}]}>
					<Button onPress={()=>{this.props.router.push(Agreement)}}>
						<Text style={[{color:Env.color.main, fontSize: Env.font.mini}]}>服务条款和隐私政策</Text>
					</Button>
					<Text style={[{fontSize: Env.font.mini, color: Env.color.note}, estyle.paddingTop, estyle.marginBottom]}>一汽解放青岛汽车有限公司</Text>
                    {/*<Text style={[{fontSize: Env.font.mini, color: Env.color.note}]}>Copyright © 2016 FAW Group Corporation</Text>*/}
                    {/*<Text style={[{fontSize: Env.font.mini, color: Env.color.note}, estyle.marginBottom]}>All Rights Reserved.</Text>*/}
				</View>

			</View>
        );
    }
}

