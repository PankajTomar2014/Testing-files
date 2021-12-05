import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';

const DURATION = 1000;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  startVibrate = () => {
    Vibration.vibrate(DURATION);
  };

  stoptVibrate = () => {
    Vibration.cancel();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.startVibrate()}
          style={styles.btn}>
          <Text style={styles.txt}>{'Vibrate Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.stoptVibrate()}
          style={styles.btn}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
            {'Vibrate Stop'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1, 
    justifyContent:"center",
    alignItems: 'center'
  },
  btn: {
    height: 50,
    borderRadius: 20,
    width: 300,
    marginVertical: 10,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
