/**
 * Created by yaocy on 2016/11/2.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	ListView,
	RefreshControl,
	TouchableOpacity
} from 'react-native';
import Env from '../../../utils/Env';
const estyle = Env.style;
import TopBanner from '../../../components/TopBanner';
import LabelInput  from '../../../components/LabelInput';
import ListTitle from '../../../components/ListTitle';
import BorderButton from '../../../components/BorderButton';
import { queryCity } from '../../../services/AppService';
import PageSectionList from '../../../components/PageSectionList';
import { IconSearch } from '../../../components/Icons';


export default class SettingStName extends Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			isRefreshing: false,
			ds,
			searchKey: ''
		};
	}


	componentWillMount() {
	}

	onRefresh() {
	}

	render() {
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title={'城市选择'}/>
				<LabelInput
					style = {[estyle.borderBottom]}
					placeholder='请输入城市名称'
					labelSize="0"
					ref="key"
					rightView={<IconSearch color={Env.color.note}/>}
					onChangeText={(searchKey) => {this.setState({searchKey})}}/>
				<PageSectionList
					style={estyle.fx1}
					getSectionData={(list) => {
						let rs = {};
						list.filter(item => {
							return item.subList && item.subList.length > 0;
						})
						.forEach(item => {
							if(item.fletter){
								rs[item.fletter] = item.subList || [];
							}
						})
						return rs;
					}}
					renderSectionHeader={(sectionData, sectionId) => {
						return <ListTitle title={sectionId}/>
					}}
					renderRow={(row) => {
						return (
							<TouchableOpacity style={[estyle.borderBottom, estyle.cardBackgroundColor, this.props.style]}>
								<View style={[estyle.margin, estyle.fxRow]}>
									<Text style={[estyle.text, estyle.fx1, {textAlign: 'left'}]}>{row.cname}</Text>
									<BorderButton
										style={{marginLeft: 10 * Env.font.base}}
										onPress={() => {
											this.props.select({
                                                cityName: row.cname,
                                                cityCode: row.cid
                                            });
											this.props.router.pop();
                                        }}
									>选择</BorderButton>
								</View>
							</TouchableOpacity>
						)
					}}
					reInitField={[this.state.searchKey]}
					fetchData={() => {
						if(global.myLineCityList && !this.state.searchKey){
							return Promise.resolve(global.myLineCityList);
						}else{
                            return queryCity(this.state.searchKey).then(rs => {
								!this.state.searchKey && (global.myLineCityList = rs);
                                return rs;
                            })
						}

					}}
				/>
			</View>
		)
	}
}