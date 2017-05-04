import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import Env from '../utils/Env';
const color = Env.button.color.cancel;

export default class ColorButton extends Component {
  _onPress() {}
  getStars () {
    let score = this.props.score > 5 ? 5 : Math.floor(this.props.score),
        haveHalfStart= this.props.score - score == 0 ? false : true ,
        color = Env.vector.star.color.highlight,
        startArr= new Array(score),
        surPlusStart= 5, //要补全的星数
        startBox= [],
        name = 'star';
    if(startArr.length > 0){
       startBox = startArr.fill(0).map((item,idx)=>{
        let ndix = idx + 1;
        return <Icon name="star" key={ndix} size={this.props.size} color={color} />
      });
    }
    surPlusStart= haveHalfStart ? surPlusStart-score-1 : surPlusStart-score;
    if(haveHalfStart){
      startBox.push(<Icon name="star-half-o" key={score+1} size={this.props.size} color={color} />)
    }
    if(surPlusStart>0){
      for(let i=0; i<surPlusStart; i++){
        startBox.push(<Icon name="star-o" key={surPlusStart+5+i} size={this.props.size} color={color} />)
      }
    }
    return startBox;

    // return new Array(5).fill(0).map((item, idx) => {
    //   let nidx = idx + 1, dif = 0;
    //   return <Icon name="star" key={idx}
    //                size={this.props.size}
    //                color={color} />
    // });

  }
  
  
  render() {
    // let size = Env.button.size[this.props.type || 'middle'];
    return (
            <View style={styles.container}>
              {this.getStars()}
            </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
/*    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.border*/
  },
  text: {
 /*   fontSize: Env.font.articleTitle*/
  }
});


