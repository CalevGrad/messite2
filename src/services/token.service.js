const TOKEN_NAME = 'token'

const getAccessToken = () => {
    return localStorage.getItem(TOKEN_NAME)
}

const setAccessToken = (token) => {
    localStorage.setItem(TOKEN_NAME, token)
}

const removeAccessToken = () => {
    localStorage.removeItem(TOKEN_NAME)
}

const getRefreshToken = () => {
    return localStorage.getItem(TOKEN_NAME)
}

const setRefreshToken = (token) => {
    localStorage.setItem(TOKEN_NAME, token)
}

const removeRefreshToken = () => {
    localStorage.removeItem(TOKEN_NAME)
}

export default { getAccessToken, setAccessToken, removeAccessToken, getRefreshToken, setRefreshToken, removeRefreshToken }