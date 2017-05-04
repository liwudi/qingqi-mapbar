/**
 * Created by ligj on 2016/9/26.
 */
import React from 'react';

import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native';

import Env from '../utils/Env';
const estyle = Env.style;


export default class TabBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentIndex:0
		}
	}
	changeTab = (index, isJump = true) => {
		this.setState({currentIndex:index});
		isJump && this.props.navigator && this.props.navigator.jumpTo(this.props.tabs[index]);
	}
	render (){
		return (
			<View style={[estyle.borderBottom,
				estyle.cardBackgroundColor,
				estyle.fxRow, styles.container]}>
				{this.props.tabs.map((tab, index) => {
					return (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this.changeTab.bind(this,index)}
							key={index}
							style={[
								estyle.fxCenter,
								styles.tab,
								this.state.currentIndex === index && styles.select,
								{width:Env.screen.width / this.props.tabs.length}
							]}
						>
							<View>
								<Text style={[
                                    estyle.text,
                                    this.state.currentIndex === index && styles.textSelect,
                                ]}>{tab.title}</Text>
								{tab.sign && tab.sign > 0 ? <View style={[
                                    Env.style.fxCenter,
                                    {
                                        width:Env.font.base * 22,
                                        height:Env.font.base * 22,
                                        borderRadius:Env.font.base * 20,
                                        backgroundColor:'red',
                                        position:'absolute',
                                        top:0,
                                        right:Env.font.base * -25}]}>
									<Text style={{color:'#FFF',fontSize:Env.font.base * 16}}>{tab.sign||0}</Text>
								</View> : null}

							</View>
						</TouchableOpacity>
					)
				})}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height:90 * Env.font.base
	},
	tab:{
		borderBottomWidth:6 * Env.font.base,
		borderBottomColor: 'transparent'
	},
	select:{
		borderBottomColor:Env.color.main
	},
	textSelect:{
		color:Env.color.main,
	}
});