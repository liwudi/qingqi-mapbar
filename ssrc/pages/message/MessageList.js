/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
    ScrollView
} from 'react-native';

import moment from 'moment';

import TopBanner from '../../components/TopBanner';
import PageList from '../../components/PageList';
import Env from '../../utils/Env';
const estyle = Env.style;

import {setCurrentActivePage, getMessages} from '../../actions/MessageActions';
import { setCurrentPage } from '../../services/PushService';

class MessageList extends Component {

	constructor(props){
		super(props);
	}

    setCurrentPage = (index) => {
        this.props.dispatch(setCurrentActivePage({message:index}));
    }

    componentDidMount(){
        this.props.dispatch(getMessages());
    }
    componentWillReceiveProps(nextProps){

        // if(nextProps.messageStore.PersonalMessageUnread.count != this.props.messageStore.PersonalMessageUnread.count){
            // let tabsState = this.state.tabs;
            // tabsState[1].sign = nextProps.messageStore.PersonalMessageUnread.count;
            // this.setState({
            //     tabs: tabsState
            // })
        // }

        if(JSON.stringify(this.activePageStore) !== JSON.stringify(nextProps.activePageStore)){
            setCurrentPage(
                nextProps.activePageStore.main,
                nextProps.activePageStore.message,
                () => {
                    this.props.dispatch(getMessages());
                }
            );
            this.activePageStore = nextProps.activePageStore;
        }
        console.log(nextProps.messageStore.PersonalMessage.length,this.props.messageStore.PersonalMessage.length)

        if(nextProps.messageStore.PersonalMessage.length != this.props.messageStore.PersonalMessage.length){
            setTimeout(() => this.refs.list.reInitFetch(), 50);
        }
    }

	render() {
		return (
			<View style={styles.body}>
				<TopBanner leftShow={false} {...this.props} title="消息"/>
				<PageList
					ref="list"
					style={estyle.fx1}
					renderRow={(message) => {
                        message.message =  message.message || {};
                        return <TouchableOpacity style={styles.messageBox} >
							<View style={styles.messageDate}><Text style={styles.messageDateText}>{moment(message.time).format('MM-DD HH:mm:ss')}</Text></View>
							<View style={styles.messageBody}>
								<Text style={styles.messageTitle}>{message.message.Title}</Text>
								<Text style={styles.messageText}>{message.message.Content}</Text>
							</View>
						</TouchableOpacity>
                    }}
					fetchData={() => {
                        return Promise.resolve({
                            list : Object.assign([], this.props.messageStore.PersonalMessage).reverse(),
                            pageTotal:1
                        })
                    }}
				/>

			</View>
		);
	}
}

export default connect(function (stores) {
	return {
		messageStore: stores.messageStore,
        activePageStore: stores.activePageStore
	}
})(MessageList);

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