import Vue from 'vue'

import Router from 'vue-router'
import Login from "@/views/Login";
import Mail from "@/views/Mail";
import store from "@/store";

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
                    await store.dispatch('auth/logout')
                }
                next()
            },
        }
    ]
})

router.beforeEach((to, from, next) => {
    // if (to.matched.some((record) => record.meta.requiresAuth)) {
    //     store.dispatch('auth/fetchCurrentUser').then(next)
    // }
    if (
        to.name !== '/login' &&
        to.name !== '/registration' &&
        to.matched.some((record) => record.meta.requiresAuth) &&
        !store.getters['auth/isLoggedIn']
    ) {
        next({ path: '/login', replace: false })
    } else {
        next()
    }
})

export default router