import {PixelRatio, Dimensions, StatusBar, Platform} from 'react-native';

import Config from '../config';

const {width, height} = Dimensions.get('window');

const fontScale = PixelRatio.getFontScale(),
    pixelRatio = PixelRatio.get(),
    //baseFontSize = .04 * width;
    //baseFontSize = width / width * .5;
    baseFontSize = width / 720;
/*console.info(pixelRatio);
 console.info(width);
 console.info(height);
 console.info(fontScale);
 console.info(baseFontSize);*/
/*
 console.info(StatusBar.currentHeight)
 */
const fontSize = {
    base: baseFontSize,
    navTitle: baseFontSize * 36,  //导航标题
    articleTitle: baseFontSize * 32,  //文章标题或图标名称
    text: baseFontSize * 28, //文本字体
    note: baseFontSize * 24,  //注释最小字体
    mini: baseFontSize * 20  //注释最小字体

};

const color = {
    main: Config.mainColor,  //司机端主色
    auxiliary: '#ff9c00',  //辅色
    bg: '#f5f5f5',  //背景
    line: '#e5e5e5',  //（分隔）线
    navTitle: '#ffffff',  //导航标题
    text: '#666666',  //文本
    note: '#999999',  //注释
    important: '#333333',  //重要信息,
    modalBg: 'rgba(0,0,0,0.6)',  //弹窗或者列表黑色半透明背景
    testColor: '#15c206'  //体检开始颜色
};
const button = {
    size: {
        small: {
            width: baseFontSize * 200,
            height: baseFontSize * 72,
            borderRadius: baseFontSize * 4
        },
        middle: {
            width: baseFontSize * 280,
            height: baseFontSize * 82,
            borderRadius: baseFontSize * 6
        },
        large: {
            width: baseFontSize * 660,
            height: baseFontSize * 88,
            borderRadius: baseFontSize * 10
        },
        alert: {
            width: baseFontSize * 250,
            height: baseFontSize * 72,
            borderRadius: baseFontSize * 4
        }
    },
    color: {
        confirm: {
            normal: color.main,
            press: '#007db9',
            disabled: '#dddddd',
            disabledFont: '#ffffff'
        },
        cancel: {
            border: '#dddddd',
            normal: '#ffffff',
            press: '#cccccc',
            disabled: '#dddddd',
            disabledFont: '#ffffff'
        }
    }
};

const spacing = {
    margin: {
        vertical: 30 * fontSize.base,
        horizontal: 30 * fontSize.base
    },
    marginFont: {
        vertical: 10 * fontSize.base,
        horizontal: 10 * fontSize.base
    },
    padding: {
        vertical: 20 * fontSize.base,
        horizontal: 30 * fontSize.base
    }
};


const border = {
    width: 1,
    color: color.line
};
const style = {
    h1: {
        fontSize: fontSize.articleTitle,
        color: color.main
    },
    h2: {
        fontSize: fontSize.text,
        color: color.main
    },
    containerBackgroundColor: {
        backgroundColor: color.bg
    },
    cardBackgroundColor: {
        backgroundColor: '#ffffff'
    },
    border: {
        borderWidth: border.width,
        borderColor: border.color
    },
    borderTop: {
        borderTopWidth: border.width,
        borderTopColor: border.color
    },
    borderLeft: {
        borderLeftWidth: border.width,
        borderLeftColor: border.color
    },
    borderBottom: {
        borderBottomWidth: border.width,
        borderBottomColor: border.color
    },
    borderRight: {
        borderRightWidth: border.width,
        borderRightColor: border.color
    },
    fx1: {
        flex: 1
    },
    fxRow: {
        flexDirection: 'row'
    },
    fxRowCenter: {
        alignItems: 'center'
    },
    fxColumn: {
        flexDirection: 'column'
    },
    fxCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    fxColumnCenter: {
        justifyContent: 'center'
    },
    navTitle: {
        color: color.navTitle,
        fontSize: fontSize.navTitle
    },
    articleTitle: {
        fontSize: fontSize.articleTitle,
        color: color.text
    },
    text: {
        fontSize: fontSize.text,
        color: color.text
    },
    note: {
        fontSize: fontSize.note,
        color: color.note
    },

    marginLeft: {
        marginLeft: spacing.margin.horizontal
    },
    marginRight: {
        marginRight: spacing.margin.horizontal
    },
    marginBottom: {
        marginBottom: spacing.margin.vertical,
    },
    marginTop: {
        marginTop: spacing.margin.vertical,
    },

    marginVertical: {
        marginVertical: spacing.margin.vertical,
    },
    marginHorizontal: {
        marginHorizontal: spacing.margin.horizontal
    },
    margin: {
        marginVertical: spacing.margin.vertical,
        marginHorizontal: spacing.margin.horizontal
    },
    marginFontBottom: {
        marginBottom: spacing.marginFont.vertical,
    },

    padding: {
        paddingVertical: spacing.padding.vertical,
        paddingHorizontal: spacing.padding.horizontal
    },
    paddingRight: {
        paddingRight: spacing.padding.horizontal
    },
    paddingLeft: {
        paddingLeft: spacing.padding.horizontal
    },
    paddingTop: {
        paddingTop: spacing.padding.vertical
    },
    paddingBottom: {
        paddingBottom: spacing.padding.vertical
    },
    paddingVertical: {
        paddingVertical: spacing.padding.vertical,
    },
    paddingHorizontal: {
        paddingHorizontal: spacing.padding.horizontal
    },
    iosStatusBarHeight: {
        paddingTop: fontSize.base * (Platform.OS == 'ios' ? 36 : 0)
    },
    topBtn: {
        width: fontSize.base * 84,
        height: fontSize.base * 84,
        alignItems: 'center',
        justifyContent: 'center'
    }
};

const vector = {
    call: { //电话尺寸
        size: 50 * baseFontSize
    },
    star: {
        color: {
            normal: '#dddddd',
            highlight: color.auxiliary
        },
        size: {
            small: baseFontSize * 26,
            middle: baseFontSize * 38,
            large: baseFontSize * 50
        }
    },
    arrow: {
        color: {
            topBar: '#ffffff',
            listItem: '#666666'
        },
        size: baseFontSize * 20
    },
    captcha: {
        size: {
            width: 140 * baseFontSize,
            height: 40 * baseFontSize
        }
    },
    checked: {
        size: {
            middle: baseFontSize * 38,
            large: baseFontSize * 60
        }
    }
};
const icon = {
    size: {
        middle: {
            width: baseFontSize * 60,
            height: baseFontSize * 60
        },
        large: {
            width: baseFontSize * 100,
            height: baseFontSize * 100
        }
    }
}
const isAndroid = Platform.OS === 'android',
        isIOS = Platform.OS === 'ios';

const marker = {
    bubble: {
        title: '',
        iconText: '',
        iconTextColor: isIOS ? color.main.replace('#','') : color.main,
        iconTextSize: 14,
        offsetX: .5,
        offsetY: .8,
        iconTextX:.5,
        iconTextY:.5,
        callOut: false,
        click: true
    },
    icon: {
        pre: isAndroid ? 'and_' : '',
        resPre: isAndroid ? 'res/icons/' : '',  //前缀
        resSuf: isAndroid ? '.png' : ''     //后缀
    },
    car: {
        title: '',
        iconText: '',
        imageName: isIOS ? '9100008' : 'and_9100008',
        iconTextColor: isIOS ? color.important.replace('#','') : color.important,
        iconTextSize: 14,
        offsetX: .5,
        offsetY: 1.4,
        iconTextX: .5,
        iconTextY: .45,
        callOut: false,
        click: false
    },

    car_rotate: {
        imageName: isIOS ? '91002' : 'res/icons/91002.png',
        direction: 0,
        //iconTextColor: isIOS ? color.main.replace('#','') : color.main,
        //iconTextSize: 14,
        click: false,
    }
}
const pattern = {
    phone: /^(1[3-9])\d{9}$/,
    password: /^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\+\{\}\|:"<>\?\-=\[\]\;',\\.\/]{6,20}$/,
    code: /^\d{6}$/,
    carCode: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/i,
    identityCard: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|x)$/i
};
const msg = {
    form: {
        phone: {
            require: '请输入手机',
            placeholder: '请输入手机',
            pattern: '手机格式不正确'
        },
        password: {
            require: '请输入密码',
            placeholder: '请输入密码',
            pattern: '密码请输入6-20位半角字符，建议数字、字母、符号组合'
        },
        truename: {
            require: '请输入姓名',
            placeholder: '请输入姓名',
        },
        code: {
            require: '请输入短信验证码',
            placeholder: '请输入短信验证码',
            pattern: '短信验证码格式不正确'
        },
        carCode: {
            require: '请输入车牌号',
            placeholder: '请输入车牌号',
            pattern: '车牌号格式不正确'
        }
    }
};
const refreshCircle = {
    bg: '#ffffff',
    colors: [color.main]
};

export default {
    screen: {
        ratio: pixelRatio,
        width: width,
        height: height - (Platform.OS == 'ios' ? 0 : StatusBar.currentHeight),
        fontScale: fontScale,
        barHeight: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight
    },
    font: fontSize,
    color: color,
    vector: vector,
    button: button,
    style: style,
    msg: msg,
    pattern: pattern,
    refreshCircle: refreshCircle,
    icon: icon,
    marker: marker,
    isAndroid: isAndroid,
    isIOS: isIOS
};
