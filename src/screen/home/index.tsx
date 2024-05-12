import {StatusBar, Text, View} from 'react-native';
import React from 'react';
import { Counter } from '../../components/counter';

export default function HomeScreen() {
  return (
    <View>
      {/* <StatusBar /> */}
      <Counter />
    </View>
  );
}
