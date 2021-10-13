import React from 'react'
import { Text, SafeAreaView, View, StyleSheet} from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API_KEY} from '@env';
import { setDestination} from '../slices/navSlice';
import {useDispatch}from 'react-redux';
import { useNavigation } from '@react-navigation/core';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <SafeAreaView 
        style={tw `bg-white flex-1`}>
            <Text style={tw `text-center py-5 text-xl`}>Good Morning Ambience</Text>
            <View
            style={tw `border-t border-gray-200 flex-shrink`}>
                {/* goog;e places autocomplete */}
                <View>
                    <GooglePlacesAutocomplete
                    placeholder='where to'
                    styles = {toInputBoxStyles}
                    // function to be activated on Press
                    onPress={(data, details = null) => {
                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description
                        }));
                        navigation.navigate('RideOptionsCard')
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
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor:'#DDDDDF',
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})