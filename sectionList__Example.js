import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList
} from "react-native";
import Constants from "expo-constants";

const DATA = [
  {
    title: "A",
    data: ["Arun", "Abhishake", "Anmol","Aishwariya",'Aaditya',"Aadhunik"]
  },
  {
    title: "B",
    data: ["Babul", "Badal", "Badrinath"]
  },
  {
    title: "C",
    data: ["Cheese", "Chakradev", "Cream","Chaitanya","Chakraborty"]
  },
  {
    title: "D",
    data: ["Daitya", "Daipayan",'Dahana','Dahak','Dangal']
  },
  {
    title: "E",
    data: ["Eeshan", "Egaiarasu",'Eeshwar','Ehimay','Enemy']
  }
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});

export default App;