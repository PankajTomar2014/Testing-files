import React, { version } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,  
} from 'react-native';
import { RNCamera } from 'react-native-camera';
// version "react-native-camera": "^3.43.0",
export default class CameraScreen extends React.Component {
  state = {
    pic:'',
    changeCemera: false,
  }

  captureImage = async( )=>{
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      console.log(data.uri);
      this.setState({pic:data.uri})
    }
  }

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}  
        style={styles.container}
        type={this.state.changeCemera ? 'front' : 'back'}
        // playSoundOnCapture={true}
      
      
      >
        <View style={{flex:1,justifyContent:"flex-end",alignItems:"center",}}>
        <View style={{flexDirection:"row",height:100,width:'90%',alignSelf:'center',justifyContent:"space-between",alignItems:"center",}}>
        <View
            style={{height:56,width:'30%',justifyContent:"center",alignItems:'center'}}           
            >
              <Image
                source ={this.state.pic ? {uri:this.state.pic} : null}
                resizeMode='contain'
                style={{height:50,width:50,borderWidth:1,borderColor:'#fff',borderRadius:50}}
              />
            
          </View>

          <TouchableOpacity
            style={{height:56,width:'30%',borderRadius:20,justifyContent:"center",alignItems:'center'}}
            onPress={()=>this.captureImage()}
            >
              <View 
                style={{borderWidth:5,borderColor:'#fff',borderRadius:50,height:56,width:50,borderRadius:35,justifyContent:"center",alignItems:'center'}}              
              />
            
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{height:56,width:'30%',borderRadius:20,justifyContent:"center",alignItems:'center'}}
            onPress={()=>this.setState({changeCemera:!this.state.changeCemera})}
            >
              <Image
                source ={{uri:'https://static.thenounproject.com/png/79558-200.png'}}
                resizeMode='contain'
                style={{height:50,width:50,tintColor:'#fff'}}
              />
            
          </TouchableOpacity>

        </View>
        </View>
        
       
        
        
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});