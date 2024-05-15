import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screen/home';

const Tab = createBottomTabNavigator();

function BottomTab() {
  const router = [
    {
      name: 'Home',
      component: HomeScreen,
    },
    {
      name: 'Settings',
      component: HomeScreen,
    },
  ];
  return (
    <Tab.Navigator>
      {router.map(e => (
        <Tab.Screen name={e.name} component={e.component} />
      ))}
    </Tab.Navigator>
  );
}

export default BottomTab;
