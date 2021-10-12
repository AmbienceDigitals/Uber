import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import {store} from './store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MapScreen from './screens/MapScreen';
import EatScreen from './screens/EatScreen';

const App = () => {
  // inbuilt function for creating navigation
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            {/* screen for Home */}
            <Stack.Screen
            name='HomeScreen'
            // component to display on stack
            component={HomeScreen}
            options={{
              // disable name from showing as an header
              headerShown: false
            }}/>

             {/* screen for Map */}
            <Stack.Screen
            name='MapScreen'
            // component to display on stack
            component={MapScreen}
            options={{
              // disable name from showing as an header
              headerShown: false
            }}/>

             {/* screen for Eat Screen */}
            <Stack.Screen
            name='EatScreen'
            // component to display on stack
            component={EatScreen}
            options={{
              // disable name from showing as an header
              headerShown: false
            }}/>
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;