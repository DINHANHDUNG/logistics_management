import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import stackReport from '../stack/stackReport';
import StackStatusCar from '../stack/stackStatusCar';
import StackTransportTrip from '../stack/stackTransportTrip';

function AdminTabNavigator() {
  const Tab = createBottomTabNavigator();

  function SettingsScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Điều phối xe!</Text>
      </View>
    );
  }
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
            case 'Điều phối':
              iconName = focused ? 'bus' : 'bus-outline';
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
      <Tab.Screen name="Trạng thái xe" component={StackStatusCar} />
      <Tab.Screen name="Chuyến vận chuyển" component={StackTransportTrip} />
      <Tab.Screen name="Điều phối" component={SettingsScreen} />
      <Tab.Screen name="Báo cáo" component={stackReport} />
    </Tab.Navigator>
  );
}

export default AdminTabNavigator;
