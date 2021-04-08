const ACCESS_TOKEN_NAME = 'accessToken'
const REFRESH_TOKEN_NAME = 'refreshToken'

const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_NAME)
}

const setAccessToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN_NAME, token)
}

const removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME)
}

const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_NAME)
}

const setRefreshToken = (token) => {
    localStorage.setItem(REFRESH_TOKEN_NAME, token)
}

const removeRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN_NAME)
}

export default { getAccessToken, setAccessToken, removeAccessToken, getRefreshToken, setRefreshToken, removeRefreshToken }