import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import {AntDesign} from '@expo/vector-icons'
import tw from 'twrnc';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../slices/navSlice';

const data = [
    {
        id: '123',
        title: 'Get a ride',
        image: "https://links.papareact.com/3pn",
        screen: 'MapScreen'
    },
    {
        id: '456',
        title: 'Order Food',
        image: "https://links.papareact.com/28w",
        screen: 'EatScreen'
    },
];

const NavOption = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({item}) => (
            <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={tw `p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 mb-4`}
            disabled={!origin}>
                <View 
                style={tw `${!origin && 'opacity-20'}` }>
                    <Image 
                    style={{
                        width: 120,
                        height: 120,
                        resizeMode: 'contain',
                    }}
                    source={{uri: item.image}}></Image>
                    <Text
                    style={tw `mt-2 text-lg font-semibold`}>{item.title}</Text>
                    <AntDesign
                    style={tw `p-2 bg-black rounded-full w-10 mt-4`}
                    name='arrowright'
                    color='white'
                    />
                </View>
            </TouchableOpacity>
        )}>

        </FlatList>
    )
}

export default NavOption
