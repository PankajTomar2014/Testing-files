import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import BackgroundImage from './BackgroundImage';
const w = Dimensions.get('window');
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage
          thumbnailSource={{ uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=50&buster=${Math.random()}` }}          
          source={{ uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=${w.width * 2}&buster=${Math.random()}` }}
          style={{ width: w.width, height: w.width }}
          resizeMode="cover"
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  
  container: {
   flex:1,
   alignItems:'center',
   justifyContent:"center"
  },
});