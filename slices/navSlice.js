import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    favorites: [],
    locationDetails: {}
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },

        setDestination: (state, action) => {
            state.destination = action.payload
        },

        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload
        },

        addFavorite: (state, action) => {

            state.favorites.push(action.payload)
        },

        setLocationDetails: (state, action) => {
            state.locationDetails = action.payload
        },

        clearLocationDetails: (state) => {
            state.locationDetails = Object.assign({}, {});
        }
    }
});

export const {
    setOrigin,
    setDestination,
    setTravelTimeInformation,
    addFavorite,
    setLocationDetails,
    clearLocationDetails
} = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectFavorite = (state) => state.nav.favorites;
export const selectLocationDetails = (state) => state.nav.locationDetails;
export default navSlice.reducer