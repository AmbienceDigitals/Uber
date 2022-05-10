import React from 'react';
import { Image, Text, View, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorites from '../components/Favorites';
import Home from '../components/Home';


const HomeScreen = () => {
    const Stack = createNativeStackNavigator();

    return (
        <SafeAreaView>
            <View style={tw `h-full`}>
                <Stack.Navigator>
                    {/* Navigation component */}
                    <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false
                    }}/>
                    {/* Ride Component */}
                    <Stack.Screen
                    name="Favorites"
                    component={Favorites}
                    options={{
                        headerShown: false
                    }}/>
                </Stack.Navigator>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen
