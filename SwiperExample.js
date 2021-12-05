import React, { Component } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
 
import Swiper from 'react-native-swiper'
 

 
export default class SwiperComponent extends Component {

  state={
    laoder:false
  }

  loader = ( )=>{
    return(
      <ActivityIndicator color='red' size='small' />
    )
  }
  render() {
    return (
      <Swiper 
      // autoplayDirection={true}
      // onScrollBeginDrag={(e)=>e}
      // buttonWrapperStyle={{height:100,width:100,backgroundColor:'red'}}
      nextButton={()=>console.log("NEXT")}
      prevButton={()=>console.log("PREVIOUS")}
      // autoplayTimeout={0.1}
      loadMinimalLoader={()=> this.loader()}
      style={styles.wrapper}  
      // autoplay={true} 
      loop	={false} 
      showsButtons={true}
      >
        <View style={styles.slide1}>
            <Image style={styles.slide1} source={{uri:"https://www.sample-videos.com/img/Sample-jpg-image-20mb.jpg"}}/>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})