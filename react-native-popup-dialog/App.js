
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { ConfirmAlert, ScanQRAlert } from './ConfirmAlert';
 


 
export default App = () => {  
  const [
    visibleConfirmAlert, setVisibleConfirmAlert
  ] = useState(false);

  const [
    visibleQRcodeAlert, setVisibleQRcodeAlert
  ] = useState(false);

 
  return (
    <SafeAreaView style={styles.container}>
   
        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={() => setVisibleQRcodeAlert(true)}>
          <Text style={styles.buttonTextStyle}>
            OPEN QR CODE
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={() => setVisibleConfirmAlert(true)}>
          <Text style={styles.buttonTextStyle}>
            OPEN REMOVE ALERT
          </Text>
        </TouchableHighlight>       
 
 
     <ScanQRAlert
          visible={visibleQRcodeAlert}
          onClose={()=> setVisibleQRcodeAlert(false)}
          userName={'pankaj'}
     />   

     <ConfirmAlert
      visible={visibleConfirmAlert}
      onClose={()=> setVisibleConfirmAlert(false)}
      userName={'pankaj'}
     />
       

    </SafeAreaView>
  );
};

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  
  },
  buttonStyle: {
    width: '80%',
    padding: 10,
    backgroundColor: '#f5821f',
    marginVertical: 15,
    borderRadius:5,
  },
  buttonTextStyle: {
    fontSize:20,
    color: 'white',
    textAlign: 'center',
  },
});
