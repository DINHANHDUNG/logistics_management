import React, {useEffect} from 'react';
import {BackHandler, SafeAreaView, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screen/home';
import LoadingScreen from './src/screen/loading';
import LoginScreen from './src/screen/login';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './src/components/drawer';
import DeliveryListScreen from './src/screen/deliveryListScreen';
import CompleteScreen from './src/screen/completeScreen';
import DetailCompleteScreen from './src/screen/completeDetailScreen';
import PouroilScreen from './src/screen/pouroilScreen';
import PouroilDetailScreen from './src/screen/PouroilDetailScreen';
import ImagePickerModal from './src/components/modals/selectImgModal';
import ProcessingScreen from './src/screen/processingScreen';
import ProcessingDetailScreen from './src/screen/processingDetailScreen';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  function SettingsScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }

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

  function StackComplate() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
        <Stack.Screen
          name="DetailCompleteScreen"
          component={DetailCompleteScreen}
        />
      </Stack.Navigator>
    );
  }
  function StackPouroil() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="PouroilScreen" component={PouroilScreen} />
        <Stack.Screen
          name="PouroilDetailScreen"
          component={PouroilDetailScreen}
        />
      </Stack.Navigator>
    );
  }
  function StackProcessing() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ProcessingScreen" component={ProcessingScreen} />
        <Stack.Screen name="ProcessingDetailScreen" component={ProcessingDetailScreen} />
      </Stack.Navigator>
    );
  }

  // Navigator cho Admin
  function AdminTabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            switch (route.name) {
              case 'Trạng thái xe':
                iconName = focused ? 'car' : 'car-outline';
                break;
              case 'Chuyến vận chuyển':
                iconName = focused ? 'bus' : 'bus-outline';
                break;
              case 'Báo cáo':
                iconName = focused ? 'analytics' : 'analytics-outline';
                break;
              default:
                iconName = 'help-circle-outline';
                break;
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Trạng thái xe" component={DeliveryListScreen} />
        <Tab.Screen name="Chuyến vận chuyển" component={HomeScreen} />
        <Tab.Screen name="Báo cáo" component={SettingsScreen} />
      </Tab.Navigator>
    );
  }

  // Navigator cho User
  function UserTabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
              case 'Đã giao':
                iconName = focused ? 'checkbox' : 'checkbox-outline';
                break;
              case 'Đang thực hiện':
                iconName = focused ? 'hourglass' : 'hourglass-outline';
                break;
              case 'Hoàn thành':
                iconName = focused
                  ? 'checkmark-done'
                  : 'checkmark-done-outline';
                break;
              case 'Đổ dầu':
                iconName = focused ? 'gas-station' : 'gas-station-outline';
                break;
              default:
                iconName = 'help-circle-outline';
                break;
            }
            if (route.name != 'Đổ dầu') {
              return <Icon name={iconName} size={size} color={color} />;
            }
            // Bạn có thể trả về bất kỳ thành phần nào bạn muốn ở đây!
            return <IconMaterial name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Đã giao" component={DeliveryListScreen} />
        <Tab.Screen name="Đang thực hiện" component={StackProcessing} />
        <Tab.Screen name="Hoàn thành" component={StackComplate} />
        <Tab.Screen name="Đổ dầu" component={StackPouroil} />
      </Tab.Navigator>
    );
  }

  function AdminDrawerNavigator() {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="AdminTab" component={AdminTabNavigator} />
      </Drawer.Navigator>
    );
  }

  function UserDrawerNavigator() {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="UserTab" component={UserTabNavigator} />
      </Drawer.Navigator>
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
