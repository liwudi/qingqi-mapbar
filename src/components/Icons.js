/**
 * Created by ligj on 2016/10/11.
 */
import React from 'react';

import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Env from '../utils/Env';

const size = Env.font.navTitle;
const color = Env.color.text;

export class IconSearch extends React.Component {
	render(){
		return (
			<IconEntypo name="magnifying-glass" size={size} color={color} {...this.props}/>
		)
	}
}
/**
 * 地图
 */
export class IconMap extends React.Component {
	render(){
		return (
			<IconEntypo name="map" size={size} color={color} {...this.props}/>
		)
	}
}
/**
 * 位置
 */
export class IconLocationMarker extends React.Component {
    render(){
        return (
            <IconEntypo name="location" size={size} color={color} {...this.props}/>
        )
    }
}
/**
 * 右箭头 >
 */
export class IconArrowRight extends React.Component {
	render(){
		return (
			<IconEntypo name="chevron-thin-right" size={size} color={color} {...this.props}/>
		)
	}
}
/**
 * 左箭头 <
 */
export class IconArrowLeft extends React.Component {
	render(){
		return (
			<IconEntypo name="chevron-thin-left" size={size} color={color} {...this.props}/>
		)
	}
}

//ios-call-outline
export class IconCall extends React.Component {
	render(){
		return (
			<IconIonicons name="ios-call-outline" size={size} color={color} {...this.props}/>
		)
	}
}


/**
 * 警告
 */
export class IconWarning extends React.Component {
	render(){
		return (
			<IconEntypo name="warning" size={size} color={color} {...this.props}/>
		)
	}
}
/**
* 向下箭头
* */
export  class IconArrowDown extends React.Component {
    render(){
        return(
            <IconFontAwesome name="caret-down" size={size} color={Env.color.main} {...this.props} />
        )
    }
}

/**
 * close
 * */
export  class IconClose extends React.Component {
	render(){
		return(
			<IconIonicons name="ios-close-outline" size={size} color={color} {...this.props} />
		)
	}
}

/**
 * location
 * */
export  class IconLocation extends React.Component {
	render(){
		return(
			<IconFontAwesome name="location-arrow" size={size} color={color} {...this.props} />
		)
	}
}

/**
 * list
 * */
export  class IconList extends React.Component {
	render(){
		return(
			<IconFontAwesome name="list-ul" size={size} color={color} {...this.props} />
		)
	}
}

export  class IconEye extends React.Component {
	render(){
		return(
			<IconIonicons name="ios-eye-outline" size={size} color={color} {...this.props} />
		)
	}
}

export  class IconEyeOff extends React.Component {
	render(){
		return(
			<IconIonicons name="ios-eye-off-outline" size={size} color={color} {...this.props} />
		)
	}
}
/**
 * user
 * */
export  class IconUser extends React.Component {
	render(){
		return(
			<IconFontAwesome name="user" size={size} color={color}  {...this.props} />
		)
	}
}
/**
 * add
 * */
export  class IconPlus extends React.Component {
	render(){
		return(
			<IconFontAwesome name="plus" size={size} color={Env.color.color} {...this.props} />
		)
	}
}

/**
 * fire
 * */
export  class IconFire extends React.Component {
	render(){
		return(
			<Octicons name="flame" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * 扫码
 * */
export  class IconBarcode extends React.Component {
	render(){
		return(
			<IconIonicons name="md-barcode" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * 分享
 * */
export  class IconShare extends React.Component {
	render(){
		return(
			<IconIonicons name="md-share" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * 分享
 * */
export  class IconCheckCircle extends React.Component {
	render(){
		return(
			<IconFontAwesome name="check-circle-o" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * clock
 * */
export  class IconClock extends React.Component {
	render(){
		return(
			<IconFontAwesome name="clock-o" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * ribbon
 * //奖牌
 * */
export  class IconRibbon extends React.Component {
	render(){
		return(
			<IconIonicons name="ios-ribbon" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * 对勾
 */
export  class IconCheckMark extends React.Component {
	render(){
		return(
			<IconIonicons name="ios-checkmark-outline" size={size} color={color}  {...this.props} />
		)
	}
}
/**
 * 链接中断
 */
export  class IconChainBroken extends React.Component {
	render(){
		return(
			<IconFontAwesome name="chain-broken" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * 向上箭头
 */
export  class IconArrowUp extends React.Component {
	render(){
		return(
			<IconFontAwesome name="arrow-up" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * 播放
 */
export  class IconPlay extends React.Component {
	render(){
		return(
			<IconFontAwesome name="play-circle" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * 暂停
 */
export  class IconPause extends React.Component {
	render(){
		return(
			<IconFontAwesome name="pause-circle" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * 加号
 */
export  class IconAdd extends React.Component {
	render(){
		return(
			<IconIonicons name="md-add" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * 减号
 */
export  class IconRemove extends React.Component {
	render(){
		return(
			<IconIonicons name="md-remove" size={size} color={color}  {...this.props} />
		)
	}
}

/**
 * 层叠窗口
 */
export  class IconBrowsers extends React.Component {
	render(){
		return(
			<IconIonicons name="ios-browsers-outline" size={size} color={color}  {...this.props} />
		)
	}
}


/**
 * 油桶
 */
export  class IconDrums extends React.Component {
	render(){
		return(
			<IconIonicons name="ios-color-fill-outline" size={size} color={color}  {...this.props} />
		)
	}
}


/**
 * speed
 */
export  class IconSpeed extends React.Component {
	render(){
		return(
			<IconIonicons name="ios-speedometer-outline" size={size} color={color}  {...this.props} />
		)
	}
}
//<Icon name="clock-o" size={30 * Env.font.base}/>


//<Icon name="clock-o" size={30 * Env.font.base}/>
/**
 * 垃圾桶
 * */
export  class IconTrash extends React.Component {
	render(){
		return(
			<IconEntypo name="trash" size={size} color={color}  {...this.props} />
		)
	}
}
/**
 * 向左实心箭头
 * */
export  class IconCaretLeft extends React.Component {
	render(){
		return(
			<IconFontAwesome name="caret-left" size={size} color={Env.color.color} {...this.props} />
		)
	}
}
/**
 * 向右实心箭头
 * */
export  class IconCaretRight extends React.Component {
	render(){
		return(
			<IconFontAwesome name="caret-right" size={size} color={Env.color.color} {...this.props} />
		)
	}
}
/**
 * 红旗
 * */
export  class IconFlag extends React.Component {
	render(){
		return(
			<IconFontAwesome name="flag" size={size} color={Env.color.color} {...this.props} />
		)
	}
}

/**
 * 警告
 */
export  class IconWaring extends React.Component {
    render(){
        return(
			<IconFontAwesome name="exclamation-circle" size={size} color={Env.color.color} {...this.props} />
        )
    }
}
//圆框减号
export  class IconMinus extends React.Component {
    render(){
        return(
            <IconFontAwesome name="minus-circle" size={size} color={Env.color.main} {...this.props} />
        )
    }
}
//圆框加号
export  class IconPlusCircle extends React.Component {
    render(){
        return(
            <IconFontAwesome name="plus-circle" size={size} color={Env.color.main} {...this.props} />
        )
    }
}
//录音
export  class IconMicrophone extends React.Component {
    render(){
        return(
			<IconFontAwesome name="microphone" size={size} color={Env.color.main} {...this.props} />
        )
    }
}
//空心x
export  class IconTimesCirle extends React.Component {
    render(){
        return(
			<IconFontAwesome name="times-circle" size={size} color={Env.color.main} {...this.props} />
        )
    }
}
//播放按钮
export  class IconAudioPlay extends React.Component {
    render(){
        return(
			<IconFontAwesome name="play-circle-o" size={size} color={Env.color.main} {...this.props} />
        )
    }
}
//停止按钮
export  class IconPlayStop extends React.Component {
    render(){
        return(
			<IconFontAwesome name="stop-circle-o" size={size} color={Env.color.main} {...this.props} />
        )
    }
}
//手机
export  class IconMobile extends React.Component {
    render(){
        return(
			<IconFontAwesome name="mobile" size={size} color={Env.color.main} {...this.props} />
        )
    }
}
//星星实心
export  class Star_i extends React.Component {
    render(){
        return(
            <IconFontAwesome name="star" size={size} color={Env.color.main} {...this.props} />
        )
    }
}
//星星空心
export  class Star_o extends React.Component{
    render(){
        return(
            <IconFontAwesome name="star-o" size={size} color={Env.color.main} {...this.props} />
        )
    }
}
/**
 * 问号
 */
export  class IconQuestion extends React.Component {
    render(){
        return(
            <IconFontAwesome name="question-circle-o" size={size} color={Env.color.main} {...this.props} />
        )
    }
}
/**
 * 向下实心小箭头
 */
export  class IconCaretDown extends React.Component {
    render(){
        return(
            <IconFontAwesome name="caret-down" size={size} color={Env.color.main} {...this.props} />
        )
    }
}