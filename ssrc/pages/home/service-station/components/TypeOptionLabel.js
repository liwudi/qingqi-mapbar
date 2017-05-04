import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet, ListView} from 'react-native';
import Button from '../../../../components/widgets/Button'
import Env from '../../../../utils/Env';
import Icon from 'react-native-vector-icons/Entypo';
const color = Env.button.color.confirm;
export default class ColorButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false
        }

    }

    _onPress () {
        this.setState({check: !this.state.check});
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.all ? (
                        <View style={[styles.normal, styles.all]}>
                            <Button onPress={this._onPress.bind(this)}>
                                <Icon name="check" size={14}
                                      color="rgba(0,0,0,0)"/>
                                <Text style={styles.text}>{this.props.title}</Text>
                                <Icon name="check" size={14}
                                      color="rgba(0,0,0,0)"/>
                            </Button>

                        </View>
                    ) : (
                        <View style={[styles.normal, this.state.check ? styles.highlight : '']}>
                            <Button onPress={this._onPress.bind(this)}>
                                <Icon name="check" size={14}
                                      color={this.state.check ? Env.color.main : '#dddddd'}/>
                                <Text style={styles.text}>{this.props.title}</Text>
                                <Icon name="check" size={14}
                                      color="rgba(0,0,0,0)"/>
                            </Button>

                        </View>
                    )
                }

            </View>
        );
    }
}

const basefont = Env.font.base;
const styles = StyleSheet.create({
    container: {
        width: Env.screen.width / 3.02,
        height: 80 * basefont
    },

    normal: {
        backgroundColor: '#dddddd',
        margin: basefont * 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: basefont * 3,
        borderWidth: 0.5,
        borderColor: Env.color.line,
        paddingHorizontal: basefont * 5
    },
    all: {
        backgroundColor: '#ffffff'

    },
    highlight: {

        borderColor: Env.color.main,
        backgroundColor: '#ffffff'
    },
    text: {
        fontSize: Env.font.text,
        color: Env.color.text,
        flex:1,
        textAlign: 'center'
    }
});

