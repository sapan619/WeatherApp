import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store= new Vuex.Store({

    state:{
        cities:["Kolkata","London","Paris","Delhi","Hyderabad","Boston"],
        label:[],
        value:[],
        dataReceived:{}
    }
});