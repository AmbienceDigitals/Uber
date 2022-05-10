import React, {useEffect} from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'twrnc';
import { useSelector, useDispatch}from 'react-redux';
import {selectFavorite, setOrigin, setDestination} from '../slices/navSlice';
import { useNavigation } from '@react-navigation/core';
import {useRoute}from '@react-navigation/native';
import uuid from 'react-native-uuid';
import {Dimensions} from 'react-native';


const deviceHeight = Dimensions.get('window').height;
const height = deviceHeight * 0.11

const NavFavourites = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const favorites = useSelector(selectFavorite);

    return (
    <View style={tw `h-96 relative ${route.name !== 'Home' && 'h-72'}`}>
        <FlatList
        keyExtractor={() => uuid.v4()}
        data={favorites}
        ItemSeparatorComponent={() => (
            <View
            style={[tw `bg-gray-200`, {height: 0.5,}]}/>
        )}
        renderItem={({item: {location, name, icon}}) => (
            <TouchableOpacity
            onPress={() => {
                if (route.name === 'Home' ) {
                    dispatch(setOrigin({
                        location: location.location,
                        description: location.description
                    }))
                    dispatch(setDestination(null))
                }
                else {
                    dispatch(setDestination({
                        location: location.location,
                        description: location.description
                    }))
                    navigation.navigate('RideOptionsCard')
                }
            }}
            style={tw `flex-row items-center p-2 bg-gray-200 w-80 m-auto mb-3 rounded-xl ${route.name !== 'Home' && 'ml-4'}`}>
                <Icon
                style={tw `rounded-full bg-gray-300 p-3 mr-3 ml-3`}
                name={icon}
                type='ionicon'
                color="black"
                size={20}/>
                <View
                style={tw `justify-evenly`}>
                    <Text
                    style={tw `font-semibold text-lg`}>{name} </Text>
                    <Text
                    style={tw `text-sm text-black w-64`}>{location !== null && location.description}</Text>
                </View>
            </TouchableOpacity>
        )}/>

        <View style={[tw `flex-row bg-white justify-evenly border-t border-gray-100 w-72 m-auto`, deviceHeight < 769 && styles.spacing]}>
            <TouchableOpacity
                onPress = {() => navigation.navigate('Favorites')}
                style={[tw `flex-row items-center justify-center p-2 bg-gray-200 rounded-2xl ml-3 `, route.name === "Home" ? styles.button : ""]}>
                    <Icon
                    style={tw `ml-2 rounded-full bg-gray-300 p-3`}
                    name='car'
                    type="ionicon"
                    color="black"
                    size={20}/>
                    <View>
                        
                        <Text
                        style={tw `font-semibold text-base px-3`}> Add Favorite Locations </Text>
                    </View>
            </TouchableOpacity>
        </View>
    </View>
    )
}

export default NavFavourites

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 16
    },
    spacing: {
        marginBottom: height
    }
})
