import { createStore } from "vuex";
import axios from "axios";

const state = {
    location: '',
    time: '',
    weatherDescription: '',
    imageAbbr: '',
    weatherTemp: 0,
    loading: false
};

const mutations = {
    UPDATE_LOCATION(state, payload){
        state.location = payload;
    },
    UPDATE_TIME(state, payload){
        state.time = payload;
    },
    UPDATE_WEATHER_DETAILS(state, payload){
        state.weatherDescription = payload.weatherDescription;
        state.imageAbbr = payload.imageAbbr + '.png';
        state.weatherTemp = payload.weatherTemp.toFixed();
    },
    LOADING_PENDING(state){
        state.loading = true;
    },
    LOADING_COMPLETE(state){
        state.loading = false;
    }
};

const actions = {
    fetchWeather({ commit }, id){
        commit('LOADING_PENDING');
        axios.get(`/api/weather`, {
            params: {
                location: JSON.stringify({
                    latitude: LOCATION[id].latitude,
                    longitude: LOCATION[id].longitude,
                })
            }
        }).then((res) => {
            commit('UPDATE_LOCATION', LOCATION[id].name);
            commit('UPDATE_TIME', res.data.time);
            commit('UPDATE_WEATHER_DETAILS', res.data);
            commit('LOADING_COMPLETE');
        });
    }
};

const getters = {
    location: state => state.location,
    time: state => state.time,
    weatherDescription: state => state.weatherDescription,
    imageAbbr: state => state.imageAbbr,
    weatherTemp: state => state.weatherTemp,
    loading: state => state.loading
};

export default createStore({
    state,
    mutations,
    actions,
    getters
});

const LOCATION = {
    0: { latitude: 21.0245, longitude: 105.8412, name: 'Hanoi, Vietnam'},
    1: { latitude: 39.9075, longitude: 116.3972, name: 'Beijing, China'},
    2: { latitude: 22.2669, longitude: 114.1788, name: 'Hong Kong'},
    3: { latitude: 25.0478, longitude: 121.5319, name: 'Taipei, Taiwan'},
    4: { latitude: 39.0339, longitude: 125.7543, name: 'Pyongyang, North Korea'},
    5: { latitude: 37.5660, longitude: 126.9784, name: 'Seoul, South Korea'},
    6: { latitude: 35.6895, longitude: 139.6917, name: 'Tokyo, Japan'},
    7: { latitude: 10.8230, longitude: 106.6296, name: 'Ho Chi Minh City, Vietnam'}
};