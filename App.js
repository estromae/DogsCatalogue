import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/components/LoginScreen';
import Catalogue from './src/components/admin/CatalogueScreen';
import Find from './src/components/admin/FindScreen';
import Edit from './src/components/comum/EditScreen';

const Stack = createStackNavigator()

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Home}/>
      <Stack.Screen name="CatalogueScreen" component={Catalogue}/>
      <Stack.Screen name="FindScreen" component={Find}/>
      <Stack.Screen name="EditScreen" component={Edit}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
