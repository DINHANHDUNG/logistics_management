import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HistoryStatusScreen from '../../screen/historyStatus';
import ProcessingDetailScreen from '../../screen/processingDetailScreen';
import ProcessingScreen from '../../screen/processingScreen';

function StackProcessing() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProcessingScreen" component={ProcessingScreen} />
      <Stack.Screen
        name="ProcessingDetailScreen"
        component={ProcessingDetailScreen}
      />
      <Stack.Screen
        name="HistoryStatusScreen"
        component={HistoryStatusScreen}
      />
    </Stack.Navigator>
  );
}

export default StackProcessing;
