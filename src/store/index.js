import {createStore} from "vuex";
import axios from "axios";
import City from "../model/city";
import Parking from "../model/parking";

const store = createStore({
    state() {
        return {
            cities: [],
            user: null,
        };
    },

    mutations: {
        setCities(state, cities) {
            state.cities = cities;
        },
        deleteCity(state, cityId) {
            state.cities = state.cities.filter(city => 
                city.id != cityId
            );
        },
        addCity(state, city) {
            state.cities.push(city);
        },
        setCityParkings(state, { cityId, parkings }) {
            for(let city of state.cities) {
                if(city.id == cityId) {
                    city.parkings = parkings;
                    return;
                }
            }

            console.log("vuex, mutations, setCityParkings : city not found for id " + cityId);
            console.log("state.cities : ");
            console.log(state.cities);
            console.log("");
        },
        setUser(state, user) {
            state.user = user;
        }
    },

    actions: {
        getCities(context) {
            axios.get("http://raxk1131.odns.fr/city")
                .then(response => {
                    let cities = response.data.map(city => {
                        return City.fromObject(city);
                    });

                    context.commit("setCities", cities);
                });
        },
        getCityParkings(context, cityId) {
            //city = context.getters.city(cityId);
            //example of how to use getters inside actions
            //incase it's needed somewhere else in the future 

            axios.get(`http://raxk1131.odns.fr/city/${cityId}/parkings`)
                .then(response => {
                    let parkings = response.data.map(parking => {
                        return Parking.fromObject(parking);
                    });

                    context.commit("setCityParkings", {
                        cityId,
                        parkings
                    });
                });
        }
    },

    getters: {
        cities(state) {
            return state.cities;
        },

        city(state) {
            return (cityId) => {
                for(let city of state.cities) {
                    if(city.id == cityId) {
                        return city;
                    }
                }
    
                return null;
            } 
        } ,

        parking(state) {
            return (cityId, parkingId) => {
                for(let city of state.cities) {
                    if(city.id == cityId) {
                        
                        for(let parking of city.parkings) {
                            if(parking.id == parkingId) {
                                return parking;
                            }
                        }
                    }
                }
    
                return null;
            }
        },

        user(state) {
            return state.user;
        },
    }
});

export default store;