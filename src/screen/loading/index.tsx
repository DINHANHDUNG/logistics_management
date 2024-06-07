import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../common/color';
import {useAppSelector} from '../../app/hooks';
import {authStore} from '../../app/features/auth/authSlice';

export default function LoadingScreen() {
  const navigation = useNavigation();
  const auth = useAppSelector(authStore);

  const checkLogin = () => {
    if (auth.IDUser) {
      if (auth.FlagQuanLy) {
        return navigation.replace('AdminTab');
      }
      return navigation.replace('UserTab');
    }
    navigation.replace('LoginScreen');
  };

  //Xu ly loading truoc khi vao app, check login
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar /> */}
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
