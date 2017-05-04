/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
    ActivityIndicator,
	WebView
} from 'react-native';
import Env from '../../../utils/Env';
const estyle = Env.style;
/*import TripDetailMap from './TripDetailMap';
import TripDetailData from './TripDetailData';*/
import TopBanner from '../../../components/TopBanner';
import Button from '../../../components/widgets/Button';
import {IconShare} from '../../../components/Icons'
const DEFAULT_URL = 'http://m.mapbar.com';
import TabNavigator from '../../../components/TabNavigator';
//import Server from  '../../../service-config/ServerConfig';
//import SplashScreen from 'react-native-splash-screen';
import Login from '../../user/index';
import {queryTripInfo} from '../../../services/TripService';

import TripLine from './TripLine';

class TripData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId:'',
			token:''
		}
	}
	componentWillMount(){
		global.storage.load({
			key: 'token',
			autoSync: false,
		}).then((rs)=>{
			this.setState({
				token: rs.token,
				userId: rs.userId
			})
		}).catch((e) => {
			this.props.router.replace(Login)
			//SplashScreen.hide();
		})
	}
    componentDidMount(){
        queryTripInfo(this.props.nav.tripId,this.props.nav.tripDate)
			.then((res)=>{
        		this.setState({data:res});
			})
	}
	render() {
		let uri = {
			uri: 'tripDetail/index.html'
		};
		console.log(uri.uri);
		return this.state.userId && this.state.token && this.state.data ?
		<WebView style={[estyle.fx1]}
						source={uri}
						startInLoadingState={false}
						javaScriptEnabled={true}
					 	injectedJavaScript={`window.tripDetailData=${JSON.stringify(this.state.data)};getTripFromId()`}
					/> : <ActivityIndicator style={estyle.fx1}/>
	}
}

const tabs = [
	{
		title:'行程数据',
		component: TripData
	},
	{
		title:'行程轨迹',
		component: TripLine
	}
];

export default class TripDetail extends Component {
	constructor(props){
		super(props);
        this.state = {
            cridx : 0
        }
	}

	toShare() {

	}
	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner
					{...this.props}
					title="行程分析详情"
				/>
				<TabNavigator {...this.props} tabs={tabs} isSwipe={false} curRouterIdx={this.state.cridx}
                onChangeTab={(cridx) => {
                    this.setState({cridx});
                }}/>
			</View>
		);
	}
}