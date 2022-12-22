import {useState, useEffect} from 'react';
// import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import {store} from './store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MapScreen from './screens/MapScreen';
import EatScreen from './screens/EatScreen';
import Favorites from './components/Favorites';
import { KeyboardAvoidingView, Text } from 'react-native';
import {Ionicons, AntDesign, FontAwesome} from '@expo/vector-icons';
// import {useFonts} from 'expo-font';
import * as Font from 'expo-font';

const App = () => {
  // inbuilt function for creating navigation
  const Stack = createNativeStackNavigator();

  // let customFonts = {
  //   'ionicons':  require('./assets/Fonts/Ionicons.ttf'),
  //   // 'Ubuntu-Bold': require('./../assets/fonts/Ubuntu-Bold.ttf'),
  // };

  const [loaded, setLoaded] = useState(false)
  const _loadFontsAsync = async () => {
    await Font.loadAsync({
      ...Ionicons.font,
      ...AntDesign.font,
      ...FontAwesome.font
    });
    setLoaded(true)
  }

  // const [fontsLoaded] = useFonts({
  //   // 'anticon': require('./assets/anticon.ttf'),
  //   'ionicons': require('./assets/Fonts/Ionicons.ttf')
  // });

    // condition to run if font is not loaded
    useEffect(() => {
      _loadFontsAsync() 
    }, [])


    if (!loaded) return (
    <Text
    style={{
      marginVertical: 50
    }}>
      font not loaded
    </Text> )
    // condition to run if font is loaded
    else {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <SafeAreaProvider>
              <KeyboardAvoidingView
              style={{flex: 1}}>
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
    
                  <Stack.Screen
                    name="Favorites"
                    component={Favorites}
                    options={
                        {headerShown: false}
                    }/>
    
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
              </KeyboardAvoidingView>
    
            </SafeAreaProvider>
          </NavigationContainer>
        </Provider>
      );
    }
  
}

export default App;