import Vue from 'vue'

import Router from 'vue-router'
import Login from "@/views/Login";
import Mail from "@/views/Mail";

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
            meta: {
                requiresAuth: true,
            },
        }
    ]
})

export default router