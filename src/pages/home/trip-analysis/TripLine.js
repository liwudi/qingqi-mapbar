/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import TopBanner from '../../../components/TopBanner';
import TrackPlayback from '../components/TrackPlayback';
import Env from '../../../utils/Env';
const estyle = Env.style;
export default class MonitorMapTrack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            init:false
        }
    }


    shouldComponentUpdate(props) {
  /*      console.info('shouldComponentUpdate')
        console.info(props.curRouterIdx)
        console.info(this.state.init)*/
        if(props.curRouterIdx && !this.state.init) {
            setTimeout(() => {
                this.setState({init: true});
            //    console.info('setTimeout')
            }, 500);

        }
        return true;
    }

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                {this.state.init ?
				<TrackPlayback {...this.props}/> :
                    <View/>}
			</View>
		);
	}
}