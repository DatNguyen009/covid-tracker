import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        url: "https://covid19.mathdro.id/api/",
        dt: {},
        dataDaily: [],
        dataCountry: {},
        valuePickerCountry: '',
        dataCountryDetail: [],
        dataRankConfirmed: []
    },
    getters: {
        getDataDaily(state) {
            return state.dataDaily.map(item => {
                return {
                    date: item.reportDate,
                    confirmed: item.confirmed,
                    deaths: item.deaths
                }
            })
        },

        async filterCountry(state) {
            let array = [];
            await Axios.get(`https://covid19.mathdro.id/api/countries/${state.valuePickerCountry}`)
                .then(res => {
                    array.push(res.data.confirmed.value, res.data.recovered.value, res.data.deaths.value);
                })
                .catch(err => console.log(err))
            return array;

        },


    },
    mutations: {
        fetchData(state, dataCovid) {
            state.dt = dataCovid;
        },
        fetchDataDaily(state, dataDaily) {
            state.dataDaily = dataDaily;
        },
        fetchCountry(state, dataCountry) {
            state.dataCountry = dataCountry;
        },
        saveValuePickCountry(state, valuePickerCountry) {
            state.valuePickerCountry = valuePickerCountry;
        },
        saveDataCountryDetail(state, dataCountryDetail) {
            state.dataCountryDetail = dataCountryDetail;
        },
        RankConfirmed(state, dataRankConfirmed) {
            const mapData = dataRankConfirmed.map(item => {
                return {
                    'nameCountry': item.countryRegion,
                    'confirmed': item.confirmed
                }
            })
            state.dataRankConfirmed = mapData;
        },

    },
    actions: {
        async fetchData(context, credentials) {
            await Axios.get(credentials.url)
                .then(res => {
                    context.commit('fetchData', res.data);
                })
                .catch(err => console.log(err))
        },
        async fetchDataDaily(context, credentials) {

            await Axios.get(credentials.url)
                .then(res => {
                    context.commit('fetchDataDaily', res.data);
                })
                .catch(err => console.log(err))
        },
        async fetchCountry(context, credentials) {
            await Axios.get(credentials.url)
                .then(res => {
                    context.commit('fetchCountry', res.data);
                })
                .catch(err => console.log(err))

        },
        async saveValuePickerCountry(context, credentials) {
            let array = [];
            await Axios.get(`https://covid19.mathdro.id/api/countries/${credentials.valuePickerCountry}`)
                .then(res => {
                    array.push(res.data.confirmed.value, res.data.recovered.value, res.data.deaths.value);
                })
                .catch(err => console.log(err))
            context.commit('saveDataCountryDetail', array);
            context.commit('saveValuePickCountry', credentials.valuePickerCountry);
        },
        async RankConfirmed(context, credentials) {

            await Axios.get(credentials.url)
                .then(res => {
                    context.commit('RankConfirmed', res.data);
                })
                .catch(err => console.log(err))
        }
    },
    modules: {}
})