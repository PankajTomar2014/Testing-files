
import React, {useState, useRef} from 'react';

// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

//Import React Native Video to play video
import Video from 'react-native-video';


const App = () => {
  const videoPlayer = useRef(null);
  const [paused, setPaused] = useState(false);


  return (
    <View style={{flex: 1}}>
      <Video
        onEnd={()=>console.log("onEnd")}
        onLoad={()=>console.log("onLoad")}
        onLoadStart={()=>console.log("onLoadStart")}
        onProgress={()=>console.log("onProgress")}
        paused={paused}
        controls={true} 
        repeat={true}    //Repeat the video
        ref={videoPlayer}   
        source={{
          uri:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        }}
        style={styles.mediaPlayer}
        volume={10}
      />    
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});