import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { BackHandler, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import AdminTabNavigator from './src/layout/tab/adminTabNavigator';
import UserTabNavigator from './src/layout/tab/userTabNavigator';
import LoadingScreen from './src/screen/loading';
import LoginScreen from './src/screen/login';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  function MainNavigator() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="AdminTab" component={AdminTabNavigator} />
        <Stack.Screen name="UserTab" component={UserTabNavigator} />
      </Stack.Navigator>
    );
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
