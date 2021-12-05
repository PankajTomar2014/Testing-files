import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AlphabetList from 'react-native-flatlist-alphabet';
import sampleData from './sampleData';
import colors from './colors';
import sizes from './sizes';

export default class App extends Component {
  state = {};

  renderListItem = (item) => {
    return (
      <View style={styles.listItemContainer}>
        <Text style={styles.listItemLabel}>{item.value}</Text>
      </View>
    );
  };

  renderSectionHeader = (section) => {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AlphabetList
          style={{flex: 1}}
          data={sampleData}
          renderItem={this.renderListItem}
          renderSectionHeader={this.renderSectionHeader}
          getItemHeight={() => sizes.itemHeight}
          sectionHeaderHeight={sizes.headerHeight}
          letterItemStyle={{ height: 20}}
          indexLetterColor={colors.primary}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },

  listItemContainer: {
    flex: 1,
    height: sizes.itemHeight,
    paddingHorizontal: sizes.spacing.regular,
    justifyContent: 'center',
    borderTopColor: colors.seperatorLine,
    borderTopWidth: 1,
  },

  listItemLabel: {
    color: colors.text.dark,
    fontSize: 14,
  },

  sectionHeaderContainer: {
    height: sizes.headerHeight,
    backgroundColor: colors.background.dark,
    justifyContent: 'center',
    paddingHorizontal: sizes.spacing.regular,
  },

  sectionHeaderLabel: {
    color: colors.background.light,
  },
});
