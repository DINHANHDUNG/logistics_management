import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import DeliveryListScreen from '../../screen/deliveryListScreen';
import StackProcessing from '../stack/stackProcessing';
import StackComplate from '../stack/stackComplate';
import StackPouroil from '../stack/stackPouroil';
import {colors} from '../../common/color';
import {useAppSelector} from '../../app/hooks';
import {authStore} from '../../app/features/auth/authSlice';

function UserTabNavigator() {
  const Tab = createBottomTabNavigator();
  const auth = useAppSelector(authStore);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: '#3E48A0',
        },

        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Kế hoạch':
              iconName = focused ? 'checkbox' : 'checkbox-outline';
              break;
            case 'Thực hiện':
              iconName = focused ? 'hourglass' : 'hourglass-outline';
              break;
            case 'Hoàn thành':
              iconName = focused ? 'checkmark-done' : 'checkmark-done-outline';
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
        tabBarActiveTintColor: colors.colorMain2,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Kế hoạch" component={DeliveryListScreen} />
      <Tab.Screen name="Thực hiện" component={StackProcessing} />
      {auth.FlagHoanThanhDoDau && (
        <>
          <Tab.Screen name="Hoàn thành" component={StackComplate} />
          <Tab.Screen name="Đổ dầu" component={StackPouroil} />
        </>
      )}
    </Tab.Navigator>
  );
}

export default UserTabNavigator;
