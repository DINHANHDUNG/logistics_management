import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CompleteScreen from '../../screen/completeScreen';
import DetailCompleteScreen from '../../screen/completeDetailScreen';

function StackComplate() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
      <Stack.Screen
        name="DetailCompleteScreen"
        component={DetailCompleteScreen}
      />
    </Stack.Navigator>
  );
}

export default StackComplate;
