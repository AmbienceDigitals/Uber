import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import Map from '../components/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import {Entypo} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core';
import {useRoute, useNavigationState, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Favorites from '../components/Favorites';


const MapScreen = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const route = useRoute();
    // const routes = useNavigationState(state => state.routes)
    // const currentRoute = routes[routes.length -1].name

    // function getHeaderTitle(route) {
        // If the focused route is not found, we need to assume it's the initial screen
        // This can happen during if there hasn't been any navigation inside the screen
        // In our case, it's "Feed" as that's the first screen inside the navigator
        const routeName = getFocusedRouteNameFromRoute(route.name);
        // }

    return (
        <View>
            <TouchableOpacity
            style={tw `bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
            onPress={() => navigation.navigate('HomeScreen')}>
                <Entypo
                name='menu'/>
            </TouchableOpacity>
            
            <View style={tw `h-1/2`}>
                <Map/>
                <Text>{routeName}</Text>
            </View>

            <View style={tw `h-1/2`}>
                <Stack.Navigator>
                    {/* Navigation component */}
                    <Stack.Screen
                    name="NavigateCard"
                    component={NavigateCard}
                    options={{
                        headerShown: false
                    }}/>
                    {/* Ride Component */}
                    <Stack.Screen
                    name="RideOptionsCard"
                    component={RideOptionsCard}
                    options={{
                        headerShown: false
                    }}/>
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen
