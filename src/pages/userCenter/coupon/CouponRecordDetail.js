/**
 * Created by linyao on 2016/12/26.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Navigator,
    ScrollView,
    RefreshControl
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import {recordDetail} from '../../../services/ServiceStationService';
import ListItem from '../../../components/ListItem';

import Env from '../../../utils/Env';
const estyle = Env.style;

export default class CouponRecordDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isRefreshing:true
        }
    }

    componentDidMount() {
        recordDetail(this.props.recordId)
            .then((data) => {
                this.setState({data: data,isRefreshing:false})
            })
            .catch((err)=>{})
    }

    render() {
        let data = this.state.data;
        return (
            <View style={[estyle.fx1,{backgroundColor:Env.color.bg}]}>
                <TopBanner {...this.props} title="消费结果"/>
                <ScrollView style={[estyle.fx1]} refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            colors={[Env.color.main]}
                            progressBackgroundColor="#fff"
                        />
                    }
                >
                    {
                       data ?
                           <View style={[estyle.cardBackgroundColor,estyle.marginHorizontal,estyle.padding]}>
                               <View style={[estyle.borderBottom,estyle.paddingVertical,estyle.fxCenter]}>
                                   <Text style={[estyle.articleTitle]}>{data.provider}</Text>
                               </View>
                               <ListItem left={'交易券号'} right={data.tradeCode+''} color={Env.color.text}/>
                               <ListItem left={'优惠券'} right={data.couponName+''} color={Env.color.text}/>
                               <ListItem left={'交易数额'} right={data.tradeNum+''} color={Env.color.text}/>
                               <ListItem left={'交易后余额'} right={data.balance+''} color={Env.color.text}/>
                               <ListItem left={'时间'} right={data.consumerTime} color={Env.color.text}/>
                               <ListItem left={'消费者'} right={data.usedUser} color={Env.color.text}/>
                               <ListItem left={'消费者联系方式'} right={data.usedUserPhone} color={Env.color.text}/>
                           </View> : <View/>
                    }
                </ScrollView>
            </View>
        );
    }
}