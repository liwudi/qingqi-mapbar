/**
 * Created by ligj on 2016/10/9.
 * edit by zhaidongyou on 2016/10/13
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import {driverCarList, setCurrentCar} from '../../../services/AppService';
const estyle = Env.style;
import Button from '../../../components/widgets/Button'
import Item from './components/MyCarItem'
import NoCar from './components/NoCar'
import CarDetail from './CarDetail';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import {IconCheckMark} from '../../../components/Icons';
import Toast from '../../../components/Toast';
import { getUserDetail , getCouponNum } from '../../../actions/UserActions';

class MyCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selecting: false
        };
    }

    finaliy() {
        this.setState({
            isRefreshing: false,
            selecting: false,
            carId: this.defaultCarId
        });
    }

    fetchData() {
        this.setState({isRefreshing: true});
        this.props.dispatch(getUserDetail());
        driverCarList()
            .then((data) => {
                this.setState({'selecting': false, data: data});
            })
            .catch(this.finaliy.bind(this))
            .finally(this.finaliy.bind(this));
    };

    onRefresh() {
        this.fetchData();
    }

    componentWillMount() {
        this.fetchData();
    }

    setCar() {
        if (this.state.selecting) {
            if (this.defaultCarId != this.state.carId) {
                this.setState({isRefreshing: true});
                setCurrentCar(this.state.carId)
                    .then(() => {
                        this.fetchData();
                        this.props.dispatch(getUserDetail());
                        this.props.dispatch(getCouponNum());
                    })
                    .catch(e => {
                        Toast.show(e.message, Toast.SHORT);
                        this.setState({
                            isRefreshing: false,
                            selecting: false,
                        });
                    });
            } else {
                this.setState({'selecting': false});
            }
        } else {
            this.setState({'selecting': !this.state.selecting});
        }
    }

    goToDetail(carId) {
        this.props.router.push(CarDetail, {nav: {carId: carId}});
    }

    selectCar(carId) {
        if (this.state.selecting) {
            this.setState({'carId': carId});
        } else {
            this.goToDetail(carId);
        }
    }

    renderList() {
        let data = this.state.data;
        if(data === undefined || data.list === undefined) return ;
        return data.list.map((item, idx) => {
            item.status && (this.defaultCarId = item.carId);
            /*         console.info(this.defaultCarId)
             console.info(item)*/
            return <ViewForRightArrow key={idx}
                                      rightIcon={this.state.selecting && IconCheckMark}
                                      iconSize={this.state.selecting && Env.vector.checked.size.large}
                                      onPress={this.selectCar.bind(this, item.carId)}
                                      iconColor={(this.state.selecting && this.state.carId == item.carId) && Env.color.auxiliary}
            ><Item
                router={this.props.router}
                data={item}/>
            </ViewForRightArrow>;
        })
    }

    renderView() {
        if (this.state.data) {
            return this.state.data.list.length ? this.renderList() : <NoCar  {...this.props}/>;
        }
        return <View/>;
    }

    rightView() {
        if (this.state.data && this.state.data.list.length) {
            return <Button onPress={this.setCar.bind(this)}><Text style={{
                color: Env.color.navTitle,
                fontSize: Env.font.text
            }}>{this.state.selecting ? '完成' : '设置当前车辆'}</Text></Button>;
        }
        return null;
    }


    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner
                    {...this.props}
                    title="我的车辆"
                    rightView={this.rightView()}
                />
                <ScrollView style={[estyle.fx1]}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                    colors={Env.refreshCircle.colors}
                                    progressBackgroundColor={Env.refreshCircle.bg}
                                />
                            }>
                    {this.renderView()}
                </ScrollView>
            </View>
        )
    }
}

export default connect(function(stores) {
    return { userStore: stores.userStore }
})(MyCar);