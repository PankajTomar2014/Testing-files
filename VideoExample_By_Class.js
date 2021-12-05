import React, { Component, PureComponent } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center',alignItem:"center"}}>
          <Video  // In video url check https  <--- s denote for security
          source={{uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}}   // Can be a URL or a local file.
          poster="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/English_Cocker_Spaniel_4.jpg/800px-English_Cocker_Spaniel_4.jpg"
          ref={(ref) => {this.player = ref}}  
          controls={true} 
          repeat={true}    //Repeat the video
          onLoad={()=>console.log("onLoad")}    
          onEnd={()=>console.log("onEnd")}                               // Store reference
          onBuffer={()=>console.log("Buffring") }                // Callback when remote video is buffering
          onError={()=>console.log("errrorr in Video") }               // Callback when video cannot be loaded
          style={styles.backgroundVideo} />
    </View>
    );
  }
}
var styles = StyleSheet.create({
  backgroundVideo: {
    backgroundColor:"#000",
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default App;