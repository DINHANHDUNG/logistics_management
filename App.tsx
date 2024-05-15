import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
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
import HeaderCustom from './src/components/header';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './src/components/drawer';
import DeliveryListScreen from './src/screen/delivery/deliveryListScreen';

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

  // Màn hình admin
  function ListStatusCar() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Admin Screen!</Text>
      </View>
    );
  }

  // Màn hình user
  function Pouroil() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Pouroil!</Text>
      </View>
    );
  }
  function Complete() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Complete!</Text>
      </View>
    );
  }
  function Processing() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Processing!</Text>
      </View>
    );
  }
  function Delivered() {
    return (
      <View style={{flex: 1}}>
        <HeaderCustom
          title="Tiêu đề"
          onActionPress={() => {}}
          IconRight={<Icon name={'help-circle-outline'} size={16} />}
        />
        <Text>Delivered!</Text>
      </View>
    );
  }

  function MainNavigator() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="AdminTab" component={AdminDrawerNavigator} />
        <Stack.Screen name="UserTab" component={UserDrawerNavigator} />
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
        <Tab.Screen name="Đã giao" component={Delivered} />
        <Tab.Screen name="Đang thực hiện" component={Processing} />
        <Tab.Screen name="Hoàn thành" component={Complete} />
        <Tab.Screen name="Đổ dầu" component={Pouroil} />
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
