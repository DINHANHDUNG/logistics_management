import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VehicleCoordinationScreen from '../../screen/vehicleCoordinationScreen';
import RentedVehicleScreen from '../../screen/rentedVehicleScreen';
import CompanyVehicleScreen from '../../screen/companyVehicleScreen';

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
      <Stack.Screen
        name="CompanyVehicleScreen"
        component={CompanyVehicleScreen}
      />
    </Stack.Navigator>
  );
}

export default StackVehicleCoordination;
