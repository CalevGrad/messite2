import serverApi from "@/api/server.api";

const signIn = (username, password) => {
    return serverApi.post('auth/token/', {username, password})
}

const signUp = (username, password) => {
    return serverApi.post('auth/users/', {username, password})
}

const refresh = (refresh) => {
    console.log(refresh)
    return serverApi.post('auth/token/refresh/', refresh)
}

const getCurrentUser = () => {
    return serverApi.get('current-user/')
}

export default { signIn, signUp, refresh, getCurrentUser }