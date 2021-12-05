
import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomLabel from './CustomLabel';

export default function App() {
  const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
  const [sliderOneValue, setSliderOneValue] = React.useState([5]);
  const [multiSliderValue, setMultiSliderValue] = React.useState([3, 7]);
  const [
    nonCollidingMultiSliderValue,
    setNonCollidingMultiSliderValue,
  ] = React.useState([0, 100]);

  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);

  const sliderOneValuesChange = values => setSliderOneValue(values);

  sliderOneValuesChangeFinish = () => setSliderOneChanging(false);

  multiSliderValuesChange = values => setMultiSliderValue(values);

  nonCollidingMultiSliderValuesChange = values =>
    setNonCollidingMultiSliderValue(values);

  return (
    <View style={styles.container}>      
      <View style={styles.sliders}>

        <View style={styles.sliderOne}>       
          <Text style={styles.text}>{multiSliderValue[0]} </Text>
          <Text style={styles.text}>{multiSliderValue[1]}</Text>
        </View>
        <MultiSlider
          values={[multiSliderValue[0], multiSliderValue[1]]}
          sliderLength={250}
          onValuesChange={multiSliderValuesChange}
          min={0}
          max={10}
          step={1}
          allowOverlap
          snapped
          customLabel={CustomLabel}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliders: {
    margin: 20,
    width: 280,
  },
  text: {
    alignSelf: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});