import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PouroilDetailScreen from '../../screen/PouroilDetailScreen';
import PouroilScreen from '../../screen/pouroilScreen';

function StackPouroil() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PouroilScreen" component={PouroilScreen} />
      <Stack.Screen
        name="PouroilDetailScreen"
        component={PouroilDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default StackPouroil;
