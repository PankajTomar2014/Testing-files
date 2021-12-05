import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


class App extends Component {

  state={
    number:0,
  }
  componentDidMount(){
    setInterval(()=>{
      this.setState({number:this.state.number+20})
    },50)   
  }
  componentWillUnmount(){
    if(this.state.number>100){
          this.setState({number:0})
    }
   
  }

  render() {
    console.log("ppppp=->",this.state.number)
    return (
      <AnimatedCircularProgress
            size={100}
            width={5}
            fill={this.state.number}
            duration={200}
            tintColor="#ff0076"            
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875" />
    );
  }
}

export default App ;

