import server from "@/api/server";

const signIn = (username, password) => {
    return server.post('auth/token/', {username, password})
}

const signUp = (username, password) => {
    return server.post('auth/users/', {username, password})
}

const refresh = (refresh) => {
    console.log(refresh)
    return server.post('auth/token/refresh/', refresh)
}

const getCurrentUser = () => {
    return server.get('current-user/')
}

export default { signIn, signUp, refresh, getCurrentUser }