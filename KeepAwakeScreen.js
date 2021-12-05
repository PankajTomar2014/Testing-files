// import 'react-native-gesture-handler';
// import React, {Component} from 'react';
// import {LogBox} from 'react-native'
// import Navigation from './src/Navigation/Navigation';
// import Details from './src/Screen/Details';
// LogBox.ignoreAllLogs();
// function App() {  return <Navigation />}
// export default App;
// Keep the Screen Awake/On for the Infinite Time in React Native
// https://aboutreact.com/react-native-keep-awake/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

// import KeepAwake Component
import KeepAwake from 'react-native-keep-awake';

const App = () => {
  //Default Keep Awake off
  const [keepScreenAwake, setKeepScreenAwake] = useState(false);

  const changeKeepAwake = (shouldBeAwake) => {
    //To keep screen awake using function Calling
    setKeepScreenAwake(shouldBeAwake);
    if (shouldBeAwake) {
      //Calling the Activate function to Active Keep awake and
      //Make the Screen On for infinite time
      KeepAwake.activate();
      alert('Screen will be awake for infinite time');
    } else {
      //Calling the deactivate function to Deactive Keep awake
      KeepAwake.deactivate();
      alert('Screen awake time will become normal now');
    }
  };

  const changeKeepAwakeComponenet = (shouldBeAwake) => {
    //To keep screen awake using Compoenent
    setKeepScreenAwake(shouldBeAwake);
    if (shouldBeAwake) {
      alert('Screen will be awake for infinite time');
    } else {
      alert('Screen awake time will become normal now');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
      onPress={()=> KeepAwake.activate()}
      style={{margin: 20,backgroundColor:'red'}}
      >
          <Text style={styles.titleText}>
            ONN
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
        onPress={()=> KeepAwake.deactivate()}
        style={{margin: 20,backgroundColor:'green'}}
        >
          <Text style={styles.titleText}>
            OFF
          </Text>
        </TouchableOpacity>

        
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});