import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/auth.module";
import mail from "@/store/mail.module";

Vue.use(Vuex)

let store = new Vuex.Store({
    modules: {
        auth,
        mail,
    },
})

export default store
