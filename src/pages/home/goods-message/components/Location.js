import React, {Component} from 'react';
import {Text,View} from 'react-native';
import Button from '../../../../components/widgets/Button';
import {IconLocationMarker}  from '../../../../components/Icons';
import Env from '../../../../utils/Env';
const estyle = Env.style;
export default class Area extends Component {
    goToList = () => {
        let info = global.gmInfo || [];
        if (info.length) {
            this.props.set(info);
            this.props.router.pop();
        }
    }

    renderAddress = () => {
        let view = <View/>;
        if(this.props.locationAddress) {
            view = <View style={[estyle.cardBackgroundColor, estyle.padding, estyle.borderBottom, estyle.marginBottom]}>
                <Button style={[{alignItems: 'flex-start'}]} onPress={this.goToList}>
                    <Text style={[estyle.text, {color: Env.color.main}]} numberOfLines={1}>
                        <IconLocationMarker size={Env.font.base * 30} color={Env.color.main}/>
                        <Text> </Text>
                        当前位置：
                        <Text style={[estyle.text, {color: Env.color.main}]}>{this.props.locationAddress}</Text>
                    </Text></Button>
            </View>
        }
        return view;
    }

    render() {
        return <View>
            {this.renderAddress()}
        </View>
    }
}