import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet, ListView,TouchableOpacity,ScrollView} from 'react-native';
import Button from '../../../../components/widgets/Button';
import Env from '../../../../utils/Env';
import { areaCondition } from '../../../../services/AppService'
import * as Icons from '../../../../components/Icons';
import ViewForRightArrow from '../../../../components/ViewForRightArrow';
export default class ColorButton extends Component {
    //选择附件时，返回的写死的数据
    fujin=[ { id: '50' , name: '50公里' },{ id: '100' , name: '100公里' },{ id: '200' , name: '200公里' },{ id: '500' , name: '500公里' }, ];
    constructor(props) {
        super(props);
        this.state = {
            active: '', //range, type, distance
            province: [],
            checkProvince: '200',
            cityList: this.fujin,
            checkCity: '200'
        };
    }
    componentDidMount(){
        this.fetchData();
    }
    //获取省市数据
    fetchData(row){
        areaCondition(row && row.id)
            .then((data)=>{
                if(row){
                    data.unshift({id:row.id,name:'全部',showName:row.name});
                    this.setState({cityList: data});
                }else {
                    this.setState({ province: data });
                }
            })
            .catch()
    }
    //选中省份后获取城市数据
    getCity(row){
        this.setState({checkProvince:row.id});
        if(row.id === '200'){
            this.setState({ cityList: this.fujin });
            this.props.checkKm(row);
        }else {
            this.fetchData(row);
            this.props.checkPro(row);
        }
    }
    //选择城市
    checkCity(row){
        this.setState({checkCity:row.id});
        if(this.state.checkProvince === '200'){
            this.props.checkKm(row);
        }else {
            this.props.checkCity(row);
        }
    }

    renderListView() {
        return this.state.province.map((rowData,idx)=>{
            return <Button onPress={ ()=>{this.getCity( rowData)} }  key={idx}><Text style={this.state.checkProvince == rowData.id ? styles.checkedCity : styles.city}>{rowData.name}</Text></Button>;
        })
    }

    renderCityView(){
        return this.state.cityList.map((data,idx)=>{
            return <ViewForRightArrow key={idx} style={[estyle.borderBottom]}
                                      rightIcon={this.state.checkCity === data.id ? Icons.IconCheckMark :null}
                                      iconColor={Env.color.main}
                                      onPress={ ()=>{ this.checkCity(data) } }
                                      iconSize={Env.vector.checked.size.large}>
                <Text>{data.name}</Text>
            </ViewForRightArrow>;
        })
    }

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.container}>
                    <View style={styles.provinceContainer}>
                        <ScrollView>
                            { this.renderListView() }
                        </ScrollView>
                    </View>
                    <View style={styles.cityContainer}>
                        <ScrollView>
                            {this.renderCityView()}
                        </ScrollView>
                    </View>
                </View>
               <TouchableOpacity style={[estyle.fx1]} onPress={()=>{this.props.close()}}>
                    <View style={styles.buttom} />
                </TouchableOpacity>
            </View>
        );
    }
}

const estyle = Env.style;
const basefont = Env.font.base;
const styles = StyleSheet.create({
    body : {
        flexDirection: 'column',
        flex : 1
    },
    container: {
        flex : 4,
        backgroundColor: '#ffff',
        flexDirection: 'row'
    },
    text: {
        fontSize: Env.font.articleTitle
    },
    provinceContainer: {
        width: basefont * 180,
        backgroundColor: '#ffffff'
    },
    cityContainer:{
        flex:1,
        backgroundColor:'#fff'
    },
    letterContainer: {
        width: basefont * 90
    },
    line: {
        borderBottomWidth: 0.5,
        borderBottomColor: Env.color.line
    },
    letter: {
        fontSize: Env.font.note,
        color: Env.color.note
    },
    city: {
        width: basefont * 180,
        fontSize: Env.font.text,
        color: Env.color.text,
        padding: Env.font.text * .7,
        backgroundColor:'rgb(245,245,245)'
    },
    checkedCity: {
        width: basefont * 180,
        fontSize: Env.font.text,
        color: Env.color.text,
        padding: Env.font.text * .7,
        backgroundColor:'#fff'
    },
    buttom: {
        flex : 1,
        width: Env.screen.width
    }
});

