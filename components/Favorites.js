import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image, TextInput} from 'react-native';
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API_KEY} from '@env';
import {addFavorite, selectLocationDetails, clearLocationDetails} from '../slices/navSlice';
import {useDispatch, useSelector}from 'react-redux';
import {Picker} from '@react-native-picker/picker';

const Favorites = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const locationDetails = useSelector(selectLocationDetails);
    const [location, setLocation] = useState({});
    const [icons, setIcons] = useState(null);
    
    // function to select icon based on name
    const getIcon = (name) => {
        if (name.includes('work') || name.includes('Work')) {
            return 'briefcase';
        }
        else if (name.includes('gym') || name.includes('Gym')) {
            return 'barbell';
        }
        else if (name.includes('restaurant') || name.includes('Restaurant')) {
            return 'fast-food';
        }
        else if (name.includes('home') || name.includes('Home')) {
            return 'bed';
        }
        else if (name.includes('airport') || name.includes('Airport')) {
            return 'airplane';
        }
        else if (name.includes('mall') || name.includes('Mall')) {
            return 'cart';
        }
        else {return 'map';}
    }

    const submit = () => {
        // condition to ensure that users cannot input a location without name or location 
        if (Object.keys(locationDetails).length == 0 && (name != "" && Object.keys(location).length != 0)){
            dispatch(addFavorite({
                name: name,
                location: location,
                icon: icons
            }));
            navigation.goBack();
        }
        else if (Object.keys(locationDetails).length != 0 && name!== "") {
            dispatch(addFavorite({
                name: name,
                location: locationDetails,
                icon: icons
            }));
            navigation.goBack();
        }
        else {
            return
        }
        dispatch(clearLocationDetails());
    }


    return (
        <SafeAreaView style={tw `flex items-center bg-white h-full p-5`}>
            <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Icon
                    style={tw `p-2 bg-black rounded-full w-10 mt-4`}
                    name='arrowleft'
                    color='white'
                    type='antdesign'/>
            </TouchableOpacity>

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

            {/* Google Autocomplete API */}
            <View style={tw `pt-5 flex`}>
                <Text style={tw `text-base tracking-widest leading-7 mb-10 text-gray-600`}>Add places you frequent often to the favorites locations to be able to set your starting point and your destination with ease</Text>

                    <TextInput
                    style={[{
                        height: 40,
                        fontSize: 18,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 12,
                        paddingLeft: 12,
                        marginBottom: 20
                    }]}
                    placeholder="Name of place"
                    onChangeText={(name) => {setName(name); setIcons(getIcon(name))}}
                    defaultValue={name}/>


                {Object.keys(locationDetails).length == 0 && <GooglePlacesAutocomplete
                placeholder='Input address'
                styles = {{
                    container: {
                        flex: 0
                    },
                    textInput: {
                        fontSize: 18,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 12,
                        marginTop: 20
                    },
                }}
                // function to be activated on Press
                onPress={(data, details = null) => {
                    setLocation(() => ({
                        address: data.formatted_address,
                        location: details.geometry.location,
                        description: data.description
                    }))

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
                debounce={400}/>}
            </View>

            <View style={tw `flex-row bg-white justify-evenly py-2 mt-40 border-t border-gray-100`}>
            <TouchableOpacity
                onPress = {() => submit()}
                style={tw `flex-row  items-center p-2 bg-gray-200 mr-5 ml-2 rounded-xl`}>
                    <Icon
                    style={tw `mr-3 ml-2 rounded-full bg-gray-300 p-2`}
                    name='car'
                    type="ionicon"
                    color="black"
                    size={20}/>
                    <View>
                        <Text
                        style={tw `font-semibold text-base ml-2 px-3`}> Add to Favorites</Text>
                    </View>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
}

export default Favorites;
