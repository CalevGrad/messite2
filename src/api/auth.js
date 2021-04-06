import server from "@/api/server";

const signIn = (username, password) => {
    return server.post('/token', {username, password})
}

const refresh = (refresh) => {
    return server.post('/token/refresh', {refresh})
}

export default { signIn, refresh }