import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransportTripDetailScreen from '../../screen/transportTripDetailScreen';
import TransportTripScreen from '../../screen/transportTripScreen';

function StackTransportTrip() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="TransportTripScreen"
        component={TransportTripScreen}
      />
      <Stack.Screen
        name="TransportTripDetailScreen"
        component={TransportTripDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default StackTransportTrip;
