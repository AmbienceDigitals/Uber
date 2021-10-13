import React from 'react';
import {useDispatch}from 'react-redux';
import { Image, Text, View, SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOption from '../components/NavOption';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API_KEY} from '@env';
import {setOrigin, setDestination} from '../slices/navSlice';

const HomeScreen = () => {
    const dispatch = useDispatch()

    return (
        <SafeAreaView style={tw `bg-white h-full`}>
            <View style={tw `p-5`}>
                <Image
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain'
                }}
                source={{
                    uri: "https://links.papareact.com/gzs"
                }}></Image>
                <GooglePlacesAutocomplete
                placeholder='where from'
                styles = {{
                    container: {
                        flex: 0
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
                <NavOption/>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen
