/**
 * Created by bogdanbegovic on 8/26/16.
 */

import {
    StyleSheet
} from 'react-native';

import Env from '../../utils/Env';

const fontBase =  Env.font.base;

export default StyleSheet.create({

    //CALENDAR STYLES
    calendarContainer: {
        overflow: 'hidden',
        paddingBottom:fontBase * 20,
        backgroundColor:'red',
        height:fontBase * 160
    },
    datesStrip: {
        flexDirection: 'row'
    },
    calendarDates: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    calendarHeader: {
        fontSize: fontBase * 28,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical:  fontBase * 16
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal:fontBase * 16
    },
    icon: {
        width: fontBase * 40,
        height: fontBase * 40,
        resizeMode: 'contain',
        backgroundColor:"blue"
    },

    //CALENDAR DAY
    dateContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: fontBase * 10,
        width: fontBase * 80,
        height: fontBase * 80,
        borderRadius: 200,
    },
    dateName: {
        fontSize: fontBase * 14,
        textAlign: 'center'
    },
    weekendDateName: {
        fontSize: fontBase * 14,
        textAlign: 'center',
        color:'#f0f0f0'
    },
    dateNumber: {
        fontSize: fontBase * 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    weekendDateNumber: {
        fontSize: fontBase * 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'#f0f0f0'
    },
    textSelect:{
        color:'#FFF'
    },
    point:{
        width: fontBase * 8,
        height: fontBase * 8,
        borderRadius:50,
        backgroundColor:null
    },
    pointSelect:{
        width: fontBase * 8,
        height: fontBase * 8,
        borderRadius:50,
        backgroundColor:'#A7A7A7'
    }
});
