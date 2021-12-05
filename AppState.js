import React, {Component} from 'react'
import {AppState,View, Text} from 'react-native'

class AppStateExample extends Component {

  state = {
    appState: AppState.currentState,
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:30}}>Current state is: {this.state.appState}</Text>
      </View>
      
    );
  }

}

export default AppStateExample;