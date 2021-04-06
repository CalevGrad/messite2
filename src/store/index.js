import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/auth.module";

Vue.use(Vuex)

let store = new Vuex.Store({
    modules: {
        auth,
    },
})

export default store
