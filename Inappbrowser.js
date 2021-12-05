
import React, {useCallback, useState} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  Linking,
  Alert,
  TextInput,
  View,
  Button,
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';



const App = () => {
  // const [url, setUrl] = useState('https://www.npmjs.com/package/react-native-inappbrowser-reborn');

const urlPdf = 'https://my-test-wc719.s3.us-east-2.amazonaws.com/lab-report-documents/1632398349.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARPELQCLSCV4KSN7U%2F20210923%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210923T115918Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Signature=72b76eb118501e771d22b0f77cec61e938c5cb5374cbd6f3bc4fa5a910c42483';
const urlImage = 'https://my-test-wc719.s3.us-east-2.amazonaws.com/lab-report-documents/1632399469.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARPELQCLSCV4KSN7U%2F20210923%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210923T121754Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Signature=bdb3d0891ef99689c8277db1e19626c1925c934b5cb23aded96cec4b067a0010';
  const openLink = async (type ,animated = true) => {
    try {
     
      if (await InAppBrowser.isAvailable()) {
        // A delay to change the StatusBar when the browser is opened
        const delay = animated && Platform.OS === 'ios' ? 400 : 0;
        setTimeout(() => StatusBar.setBarStyle('light-content'), delay);
        const result = await InAppBrowser.open(type=='Pdf' ? urlPdf : urlImage, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: true,
          animated,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'flipHorizontal',
          modalEnabled: true,
          enableBarCollapsing: true,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
          hasBackButton: true,
          browserPackage: null,
          showInRecents: false,
        });
        // A delay to show an alert when the browser is closed
        
        // Alert.alert('Response', JSON.stringify(result));
      } else {
        // Linking.openURL(url);
        Alert.alert("Invalid url");
      }
    } catch (error) {
      
      const errorMessage = error.message || error;
      Alert.alert(errorMessage);
    } finally {      
      StatusBar.setBarStyle('dark-content');
    }
  };

  return (
    <View style={styles.container}>      
      <View style={styles.openButton}>
        <Button title="Open link" onPress={()=>openLink("Pdf")} />
        <View style={styles.openButton}/>
        <View style={styles.openButton}/>
        <Button title="Open Images" onPress={()=>openLink("Images")} />
      </View>     
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  urlInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  openButton: {
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    paddingBottom: Platform.OS === 'ios' ? 0 : 20,
  },
});

export default App;