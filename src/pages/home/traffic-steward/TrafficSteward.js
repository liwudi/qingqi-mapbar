/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';
import ConfirmButton from '../../../components/ConfirmButton';
import TopBanner from '../../../components/TopBanner';
import {queryMaintainReminder, carMaintained} from '../../../services/AppService';
import {IconWaring} from '../../../components/Icons';
import Alert from '../../../components/Modals/Alert';
import Env from '../../../utils/Env';
import Toast from '../../../components/Toast';


const estyle = Env.style;
export default class TrafficSteward extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertActive: false,
            error: '',
            isRefreshing: true
        };
        this.defaultData = null;
    }

    fetchData () {
        queryMaintainReminder()
            .then((data)=>{this.setState({data});})
            .catch((err) => {
                if(err.resultCode == 507){
                    this.setState({error: err,data:err.data});
                }
                 Toast.show(err.message, Toast.SHORT)
            })
            .finally(()=>{this.setState({isRefreshing: false,isShow:true})})
    };

    level() {
        this.setState({alertActive: false});
        this.props.doBack();
    }

    renderAlert() {
        return <Alert visible={this.state.alertActive}
                      onClose={this.level.bind(this)}>{this.state.error}</Alert>
    }

    onRefresh() {
        this.fetchData();
    }

    componentDidMount() {
        this.fetchData();
    }

    //点击已保养按钮
    carMaintained() {
        this.setState({isRefreshing: true});
        carMaintained()
            .then((data)=>{this.fetchData()})
            .catch()
            .finally(()=>{this.setState({isRefreshing: false});});
    }

    renderList() {
            let data = this.state.data || {};
            return <View style={[estyle.fx1]}>
                <View style={[estyle.fxRow, estyle.paddingVertical, estyle.border, estyle.cardBackgroundColor]}>
                    <View style={[estyle.fx1, estyle.fxRowCenter, estyle.borderRight]}>
                        <View>
                            <Text style={[estyle.navTitle, {color: Env.color.main}]}>{data.totalmileage || '--'}</Text>
                            <Text style={[estyle.text]}>已行驶总里程(km)</Text>
                        </View>
                    </View>
                    <View style={[estyle.fx1, estyle.fxRowCenter]}>
                        <View>
                            <Text style={[estyle.navTitle, {color: Env.color.main}]}>{data.nextMileage || '--'}</Text>
                            <Text style={[estyle.text]}>下次应保养里程(km)</Text>
                        </View>
                    </View>
                </View>
                <Text style={[estyle.text, estyle.marginLeft, estyle.marginFontBottom, estyle.marginTop]}>保养剩余里程</Text>
                <View style={[estyle.cardBackgroundColor, estyle.borderBottom, estyle.padding]}>
                    <Text style={[estyle.text]}>距下次保养还有<Text
                        style={[estyle.navTitle, {color: Env.color.main}]}>{data.reMileage || '--'}</Text>km</Text>
                    {
                        data.reMileage ? (
                            data.reMileage <=1000 ? <View style={[estyle.fxRow, estyle.fxCenter]}>
                                <IconWaring color="red" style={[estyle.marginRight]} /><Text style={[estyle.fx1, estyle.note]}> 请及时对车辆进行保养</Text>
                                <ConfirmButton size="small" disabled={this.state.isRefreshing}
                                               onPress={this.carMaintained.bind(this)}>已保养</ConfirmButton>
                            </View> : <View/>
                        ) : <View style={[estyle.fxRow, estyle.fxCenter]}>
                            {
                                this.state.error ? <Text style={[estyle.fx1, estyle.note]}><IconWaring color="red" style={[estyle.marginRight]}/>{this.state.error.message}</Text>
                                    : <Text style={[estyle.fx1, estyle.note]}><IconWaring color="red"/>已超出车辆最高保养里程</Text>
                            }
                        </View>
                    }
                </View>
                <Text style={[estyle.text, estyle.marginLeft, estyle.marginFontBottom, estyle.marginTop]}>保养项目</Text>
                <View style={[estyle.cardBackgroundColor, estyle.borderBottom, estyle.paddingHorizontal]}>
                    <View style={[estyle.paddingVertical, estyle.borderBottom]}>
                        <Text style={[estyle.text]}>下次保养项目<Text
                            style={[estyle.text, {color: Env.color.main}]}>{(data.maintainItems && data.maintainItems.length) ? data.maintainItems.length : 0}</Text>项</Text>
                    </View>
                    {
                        (data.maintainItems && data.maintainItems.length) ? data.maintainItems.map((item, idx) => {
                            return <Text key={idx}
                                         style={[estyle.text, estyle.paddingVertical]}>{+idx + 1}、{item}</Text>;
                        }) : <View/>
                    }
                </View>
            </View>
        return null;
    }

    renderView() {
        // if (this.state.error) {
        //     return this.renderAlert();
        // }
        return this.renderList();
    }

    render() {
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="行车管家"/>
                <ScrollView style={[estyle.fx1]}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                    colors={Env.refreshCircle.colors}
                                    progressBackgroundColor={Env.refreshCircle.bg}
                                />
                            }>
                    {this.state.isShow ? this.renderList(): null}
                </ScrollView>
            </View>
        );
    }
}