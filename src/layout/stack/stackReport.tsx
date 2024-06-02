import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListReportScreen from '../../screen/listReport';
import TransportTripDetailScreen from '../../screen/transportTripDetailScreen';
import RepairReportScreen from '../../screen/repairReportScreen/repairReportScreen';
import PouroilReportScreen from '../../screen/pouroilReportScreen/pouroilReportScreen';
import StatusCarReportScreen from '../../screen/statusCarReportScreen';
import VehicleCoordinationReportScreen from '../../screen/vehicleCoordinationReportScreen';

function StackReport() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ListReportScreen" component={ListReportScreen} />
      <Stack.Screen name="RepairReportScreen" component={RepairReportScreen} />
      <Stack.Screen
        name="PouroilReportScreen"
        component={PouroilReportScreen}
      />
      <Stack.Screen
        name="StatusCarReportScreen"
        component={StatusCarReportScreen}
      />
      <Stack.Screen
        name="VehicleCoordinationReportScreen"
        component={VehicleCoordinationReportScreen}
      />
    </Stack.Navigator>
  );
}

export default StackReport;
