import axios from 'axios'
import store from "@/store";
import router from "@/router/router";

let serverApi = axios.create({
    baseURL: `${process.env.VUE_APP_SERVER_PATH}/api`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

serverApi.interceptors.response.use(null, responseErrorHandler)

async function responseErrorHandler(error) {
    const {response} = error

    if (response.status === 403 && response.data.code === 'token_not_valid') {
        await store.dispatch("auth/getNewAccessToken")
        return serverApi(error.config)
    }

    if (response.status === 401 && response.data.code === 'token_not_valid') {
        try {
            await store.dispatch('auth/logout')
            if (router.history.current.name !== 'login') {
                await router.push('/login')
            }
        } catch (e) {
            console.error(e)
        }
    }

    return Promise.reject(error)
}

serverApi.interceptors.request.use((config) => {
    const token = store.state.auth.accessToken
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
    }
    return config
})

export default serverApi