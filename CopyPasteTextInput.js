import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Text, TextInput} from 'react-native';
import {CustomeButton} from './Src/Components/All';

// https://www.npmjs.com/package/@mattermost/react-native-paste-input?activeTab=readme

const maxLength = 20;

export default App = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    clearClipboard();
  }, []);

  const onChangeTextfn = async text => {
    try {
      setError('');
      if (text === '') {
        // do nothing;
      }
      const copiedContent = await Clipboard.getString();
      const isPasted = text.includes(copiedContent);
      if (isPasted) {
        paste();
      } else {
        Clipboard.setString('');
        setText(text);
      }

      console.log('copied text found------', isPasted);
    } catch (error) {
      console.log('onChangeTextfn error-----', error);
    }
  };

  const paste = async () => {
    try {
      const copiedContent = await Clipboard.getString();
      const checkLength = copiedContent.slice(0, maxLength);
      console.log(checkLength.length);
      setText(checkLength);
      Clipboard.setString('');
    } catch (error) {
      console.log('paste error-----', error);
    }
  };

  const clearClipboard = () => {
    try {
      Clipboard.setString('');
      setText('');
      console.log('clear Clipboard done');
    } catch (error) {
      console.log('clear Clipboard error-----', error);
    }
  };

  const submit = () => {
    try {
      if (text == '' && text.length == 0) {
        setError('Please enter text');
      } else {
        console.log('text reveived---------', text);
      }
    } catch (error) {
      console.log('submit error-----', error);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      {error && <Text style={{color: 'red', fontSize: 30}}>{error}</Text>}

      <Text style={{fontSize: 35, color: 'black'}}>
        {text ? text : ' No text here!'}
      </Text>

      <TextInput
        placeholder="Enter text"
        placeholderTextColor={'white'}
        // contextMenuHidden={true} // disable paste popup menu
        onChangeText={text => onChangeTextfn(text)}
        maxLength={maxLength}
        defaultValue={text}
        style={{
          width: '85%',
          alignSelf: 'center',
          marginTop: 50,
          color: 'black',
          fontSize: 20,
          height: 50,
          backgroundColor: 'gray',
          marginBottom: 30,
        }}
      />
      <CustomeButton btnText={'Submit'} onPress={() => submit()} />

      <CustomeButton btnText={'PASTE'} onPress={() => paste()} />
      <CustomeButton
        btnText={'Clear Clipboard'}
        onPress={() => clearClipboard()}
      />
    </SafeAreaView>
  );
};
