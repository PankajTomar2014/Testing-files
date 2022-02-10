import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btnTextHolder}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.changeLayout}
            style={styles.Btn}>
            <Text style={styles.btnText}>Expand / Collapse</Text>
          </TouchableOpacity>
          <View
            style={{
              height: this.state.expanded ? null : 0,
              overflow: 'hidden',
            }}>
            <Text style={styles.text}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  text: {
    fontSize: 17,
    color: 'red',
    padding: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  btnTextHolder: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  Btn: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
