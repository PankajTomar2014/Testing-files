import React, { Component } from 'react';

import { SafeAreaView,View,PanResponder, Text, StyleSheet, Animated} from 'react-native';

class DragText extends Component {
textPosition={x:0,y:0};
  constructor(props){
    super(props);
    this.state={
      text:'Hi,I am Pankaj'
    }

    this.position.addListener(latestPosition =>{
      this.textPosition =latestPosition;
    })
  }
  position =  new Animated.ValueXY();

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder:()=>true,
    onPanResponderMove:(e,gestureState)=>{
      const newPosition  = {x:gestureState.dx,y:gestureState.dy};
      this.position.setValue(newPosition);
    },
    onPanResponderGrant:()=>{
      this.position.setOffset({x:this.textPosition.x,y:this.textPosition.y})
      this.position.setValue({x:0,y:0});
    },
    onPanResponderEnd:()=>{
      this.position.flattenOffset();
    }
  });

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View  
        style={[styles.ViewStyle,this.position.getLayout()]}
        {...this.panResponder.panHandlers}
        >
           <Text style={styles.textStyle}>{this.state.text}</Text>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  ViewStyle:{
        backgroundColor:'red',
        // height:100,
        // width:100
  },
  textStyle:{
    fontSize:20,
    // color:'yellow'
  }
});
export default DragText;