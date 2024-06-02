import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VehicleCoordinationScreen from '../../screen/vehicleCoordinationScreen';

function StackVehicleCoordination() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="VehicleCoordinationScreen"
        component={VehicleCoordinationScreen}
      />
    </Stack.Navigator>
  );
}

export default StackVehicleCoordination;
