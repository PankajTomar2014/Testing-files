import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  startTimer = ( )=>{
   this.timer = setInterval(() => {
      this.setState({value: this.state.value + 1});
    }, 100);
  }
  endTimer = async( )=>{
   if(this.timer)  await clearImmediate(this.timer)
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={{fontSize:this.state.value}}> {this.state.value} </Text>
        <Button title="START" onPress={() => this.startTimer()} />

        <Button title="END" onPress={() => this.endTimer()} />
      </View>
    );
  }
}

export default App;
