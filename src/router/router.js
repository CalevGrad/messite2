import Vue from 'vue'

import store from "@/store";
import Router from 'vue-router'
import Login from "@/views/Login";
import Mail from "@/views/Mail";
import Registration from "@/views/Registration";

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Mail,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: async (to, from, next) => {
                if (store.getters['auth/isLoggedIn']) {
                    next('')
                } else next()
            },
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration,
        },
        {
            path: '*',
            name: '404',
            beforeEnter: async (to, from, next) => {
                next('')
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !store.getters['auth/isLoggedIn']
    ) {
        next({ path: '/login', replace: false })
    } else if (to.matched.some((record) => record.meta.requiresAuth)) {
        next()
        store.dispatch('auth/getCurrentUser').then()
    } else {
        next()
    }
})

export default router