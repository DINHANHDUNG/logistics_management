import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StatusCarScreen from '../../screen/statusCarScreen';
import StatusCarDetailScreen from '../../screen/statusCarDetailScreen';

function StackStatusCar() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="StatusCarScreen" component={StatusCarScreen} />
      <Stack.Screen
        name="StatusCarDetailScreen"
        component={StatusCarDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default StackStatusCar;
