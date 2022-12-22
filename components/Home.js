import React from 'react';
import {useDispatch, useSelector}from 'react-redux';
import { Image, View, SafeAreaView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import NavOption from './NavOption';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API_KEY} from '@env';
import {setOrigin, 
        setDestination, 
        setLocationDetails,
        selectOrigin} from '../slices/navSlice';
import NavFavourites from './NavFavourites';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';

const Home = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const origin =useSelector(selectOrigin);

    const addAddress = () => {
        dispatch(setLocationDetails(origin));
        navigation.navigate('Favorites')
    }

    return (
        <SafeAreaView style={tw `bg-white h-full`}>
        <View style={tw `p-5`}>

            {/* Logo */}
            <Image
            style={{
                width: 100,
                height: 100,
                resizeMode: 'contain'
            }}
            source={{
                uri: "https://links.papareact.com/gzs"
            }}/>


            <View style={tw `flex flex-row`}>
                {/* Google places autocomplete */}
                <GooglePlacesAutocomplete
                placeholder='where from'
                styles = {{
                    container: {
                        flex: 1
                    },
                    textInput: {
                        fontSize: 18
                    },
                }}
                // function to be activated on Press
                onPress={(data, details = null) => {
                    dispatch(setOrigin({
                        location: details.geometry.location,
                        description: data.description
                    }))
                    dispatch(setDestination(null))
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                    key: GOOGLE_MAP_API_KEY,
                    language: 'en'
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}/>

                <TouchableOpacity
                style={tw `w-20`}
                onPress={() => addAddress()}>
                    <AntDesign
                        style={tw `mr-4 mt-1 rounded-full bg-gray-300 pl-5 py-1`}
                        name= 'plus'
                        color="black"
                        size={25}/>
                </TouchableOpacity>
            </View>
            

            <NavOption/>
            <NavFavourites/>
        </View>
    </SafeAreaView>
    );
}



export default Home;
