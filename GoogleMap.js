import React, { Component } from 'react';  
import { StyleSheet, View } from 'react-native';  
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';  
  
export default class App extends Component {  
  render() {  
    return (  
      <View style={styles.MainContainer}>  
  
        <MapView  
        // style={{height:100,width:300}}
          style={styles.mapStyle}  
          showsUserLocation={true}  
          zoomEnabled={true} 
          showsMyLocationButton={true} 
          zoomControlEnabled={true}  
          initialRegion={{  
            latitude: 28.630265982418692,   
            longitude: 77.3768695914546,  
            latitudeDelta: 0.0922,  
            longitudeDelta: 0.0421,  
          }}>  
  
          <Marker  
            coordinate={{ latitude: 28.630265982418692, longitude: 77.3768695914546 }}  
            title={"Sparx IT Solution"}  
            description={"IT Company"}  
          />  
        </MapView>  
          
      </View>  
    );  
  }  
}  
  
const styles = StyleSheet.create({  
  MainContainer: {
    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
    // flex:1,
    // backgroundColor:'green',
    alignItems: 'center',  
    justifyContent: 'flex-end',  
  },  
  mapStyle: {  
    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
  },  
});  