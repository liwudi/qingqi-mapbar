/**
 * Created by ligj on 2016/9/23.
 */
import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import Video from 'react-native-video';
import Env from '../utils/Env'
const estyle = Env.style;

export default class VideoShow extends Component {

    componentWillUnmount(){
        global.toVideoShowFunIsPlayIng = false;
    }

    render() {
        return (
            <View style={[estyle.fx1]}>
                <Video
                    resizeMode="cover"
                    style={estyle.fx1}
                    source={
                        {
                            uri:'my_video',
                            headers:{
                                'refer':'myRefer'
                            }
                        }
                    }
                    onEnd={() => {
                        this.props.router.pop();
                    }}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

/**
 * <WebView
 mediaPlaybackRequiresUserAction={false}
 style={[{width:Env.screen.width,height:Env.screen.height}]}
 source={{uri:'file:///android_asset/video/1481686612160.mp4'}}
 onMessage={(event) => {

							let e = JSON.parse(event.nativeEvent.data);
                            console.log(e.event)
							if(e.event == 'ended'){
                                this.setState({modalShow:false});
							}
						}}
 />
 **/
