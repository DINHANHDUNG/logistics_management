import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import StackReport from '../stack/stackReport';
import StackStatusCar from '../stack/stackStatusCar';
import StackTransportTrip from '../stack/stackTransportTrip';
import StackVehicleCoordination from '../stack/vehicleCoordination';
import {colors} from '../../common/color';

function AdminTabNavigator() {
  const Tab = createBottomTabNavigator();

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
              iconName = focused ? 'car-sport' : 'car-sport-outline';
              break;
            default:
              iconName = 'help-circle-outline';
              break;
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.colorMain2,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Trạng thái xe" component={StackStatusCar} />
      <Tab.Screen name="Chuyến vận chuyển" component={StackTransportTrip} />
      <Tab.Screen name="Điều phối" component={StackVehicleCoordination} />
      <Tab.Screen name="Báo cáo" component={StackReport} />
    </Tab.Navigator>
  );
}

export default AdminTabNavigator;
