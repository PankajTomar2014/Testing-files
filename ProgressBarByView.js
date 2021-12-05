import React, {Component} from 'react';  
import { StyleSheet, View, Animated} from 'react-native';  
    
export default class ProgressBar extends Component {  


  
    state={  
        progressStatus: 0,  
    }  
    anim = new Animated.Value(0);  
    componentDidMount(){  
        this.onAnimate();  
    }  
    onAnimate = () =>{  
        this.anim.addListener(({value})=> {  
        this.setState({progressStatus: parseInt(value,10)});  
        });  
        Animated.timing(this.anim,{  
             toValue: 100,  
             duration: 6000,  
        }).start();  
    }  
  render() { 
    const {DynamicWidth,backColor,innerColor} = this.props;    
    return (  
      <View style={[styles.container,{backgroundColor:backColor,width: DynamicWidth}]}>  
            <Animated.View  
                style={[ 
                    styles.inner,{backgroundColor:innerColor,width: this.state.progressStatus+'%'},  
                ]}  
            />
      </View>  
    );  
  }  
}  
const styles = StyleSheet.create({  
    container: {
    height: 5,  
    alignSelf:'center',  
    borderRadius: 5,
    // backgroundColor:"#808080",  
    justifyContent: "center",  
  },  
  inner:{    
    height: 5,  
    borderRadius: 5,  
    // backgroundColor:"#cccccc",  
  },  
  label:{  
    fontSize:23,  
    color: "black",  
    position: "absolute",  
    zIndex: 1,  
    alignSelf: "center",  
  }  
});  