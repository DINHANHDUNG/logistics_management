import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import { colors } from '../../common/color';

export default function LoadingScreen() {
  const navigation = useNavigation();
  //Xu ly loading truoc khi vao app, check login
  useEffect(() => {
    setTimeout(() => {
      //fake 3s vao app
      navigation.replace('UserTab');
      // navigation.replace('AdminTab');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <ActivityIndicator size="large" color={colors.colorMain2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});