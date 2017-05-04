/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    ListView
} from 'react-native';

import { getCategoryPosts } from '../../../services/NewsService';

import Env from '../../../utils/Env';
const estyle = Env.style;

import PageList from '../../../components/PageList';
import Post from './Post';

export default class Category extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <PageList
                style={[estyle.cardBackgroundColor, estyle.fx1]}
                renderRow={(post, sectionID, rowID) => {
                    return (
                        <TouchableOpacity activeOpacity={0.8} style={styles.messageBox} onPress={() => {this.props.router.push(Post,{post})}}>
                            <View style={styles.messageDate}><Text style={styles.messageDateText}>{post.modified}</Text></View>
                            <View style={styles.messageBody}>
                                <Text style={styles.messageTitle}>{post.title}</Text>
                                <Text style={styles.messageText}>{post.excerpt.replace(/<\/?[^>]*>/g,'').replace('Read More &rarr;','...')}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                fetchData={(pageNumber, pageSize) => {
                    return getCategoryPosts(this.props.id)
                }}
            />
        );
    }
}

const htmlStyles = StyleSheet.create({
    a: {
        fontWeight: '300',
        color: Env.color.main,
    },
    p: {
        fontSize:Env.font.text,
        color:Env.color.text,
        lineHeight : Env.font.base * 40,
    }
})

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:Env.color.bg
    },
    messageBox:{
        marginLeft:30 * Env.font.base,
        marginRight:30 * Env.font.base,
        marginTop:20 * Env.font.base,
        alignItems:'center',
    },
    messageDate:{
        backgroundColor:'#DDDDDD',
        borderRadius:6 * Env.font.base,
        paddingLeft:6 * Env.font.base,
        paddingRight:6 * Env.font.base
    },
    messageDateText:{
        color:'#FFF',
        fontSize:Env.font.note
    },
    messageBody:{
        borderWidth:1 * Env.font.base,
        borderColor:'#e5e5e5',
        paddingLeft:30 * Env.font.base,
        paddingRight:30 * Env.font.base,
        paddingTop:20 * Env.font.base,
        paddingBottom:20 * Env.font.base,
        borderRadius:10 * Env.font.base,
        marginTop:10 * Env.font.base,
        marginBottom:10 * Env.font.base,
        backgroundColor: '#FFF',
        width: Env.screen.width * .9
    },
    messageTitle:{
        fontSize:Env.font.articleTitle,
        color:Env.color.important
    },
    messageText:{
        marginTop:10 * Env.font.base,
        fontSize:Env.font.text,
        color:Env.color.text,
        lineHeight :30,
    }
});
