import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	RefreshControl
} from 'react-native';
import TopBanner from '../../../components/TopBanner';
import ListItem from '../../../components/ListItem';
import Env from '../../../utils/Env';
const estyle = Env.style;
import {carParameter} from '../../../services/AppService';

export default class CarParameter extends Component {
	constructor(props) {
		super(props);
	}

	fetchData () {
		this.setState({isRefreshing: true});
		carParameter(this.props.nav.carId)
			.then((data)=>{this.setState({data});})
			.catch()
			.finally(()=>{this.setState({isRefreshing: false});});
	};
	onRefresh() {
		this.fetchData();
	}
	componentWillMount() {
		this.fetchData();
	}
	renderList() {
		let data = this.state.data;
		/*
		* data.modelName	String	型号
		 data.vin	String	vin码
		 data.gearBoxModel	String	变速箱型号
		 data.engineModel	String	发动机型号
		 data.rearxleAratio	String	后桥速比
		 data.tireModel	String	轮胎型号
		 */
		return <View>
			<ListItem left="型号" right={data.modelName}/>
			<ListItem left="VIN" right={data.vin}/>
			<ListItem left="变速箱型号" right={data.gearBoxModel}/>
			<ListItem left="发动机型号" right={data.engineModel}/>
			<ListItem left="后桥速比" right={data.rearxleAratio}/>
			<ListItem left="轮胎型号" right={data.tireModel}/>
		</View>;
	}
	renderView() {
		if(this.state.data) {
			return this.renderList();
		}
		return <View/>
	}
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title={this.props.nav.carCode}/>
				<ScrollView style={[estyle.fx1]}
							refreshControl={
								<RefreshControl
									refreshing={this.state.isRefreshing}
									onRefresh={this.onRefresh.bind(this)}
									colors={Env.refreshCircle.colors}
									progressBackgroundColor={Env.refreshCircle.bg}
								/>
							}>
					{this.renderView()}
				</ScrollView>
			</View>
		);
	}
}