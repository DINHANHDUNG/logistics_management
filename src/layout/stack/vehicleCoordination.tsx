import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VehicleCoordinationScreen from '../../screen/vehicleCoordinationScreen';
import RentedVehicleScreen from '../../screen/rentedVehicleScreen';

function StackVehicleCoordination() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="VehicleCoordinationScreen"
        component={VehicleCoordinationScreen}
      />
      <Stack.Screen
        name="RentedVehicleScreen"
        component={RentedVehicleScreen}
      />
    </Stack.Navigator>
  );
}

export default StackVehicleCoordination;
