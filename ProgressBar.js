import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { AsyncStorage,View } from 'react-native';
import * as Progress from 'react-native-progress';


class App extends Component {
  state={
    number:0
  }

  componentDidMount(){
        setInterval(()=>{
          this.setState({number:this.state.number+0.1})
        },100)
  }


  render() {

    return (
      <View style={{flex:1,alignItems:'center',justifyContent:"center"}}>
      
          <Progress.Bar 
          color='green'
          progress={this.state.number} 
          width={370}
          style={{alignSelf:'center',backgroundColor:"red"}}  />
      </View>
    );
  }
}

export default App ;
