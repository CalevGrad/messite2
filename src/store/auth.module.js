import tokenService from '../services/token.service'
import authentification from '../api/auth'

let auth = {
    state: {
        accessToken: tokenService.getToken() || '',
        refreshToken: tokenService.getRefreshToken() || '',
        currentUser: {},
    },
    mutations: {
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken
        },
        setRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken
        },
        setCurrentUser(state, currentUser) {
            state.currentUser = currentUser
        },
        removeTokens(state) {
            state.accessToken = ''
            state.refreshToken = ''
        }
    },
    actions: {
        async signIn({commit}, payload) {
            const { username, password } ={ ...payload }
            const response = await authentification.signIn(username, password)

            tokenService.setAccessToken(response.data.access)
            tokenService.setRefreshToken(response.data.refresh)

            commit('setAccessToken', response.data.access)
            commit('setRefreshToken', response.data.refresh)
        },
        async getNewAccessToken({commit, state}) {
            const response = await  authentification.refresh({ 'refresh': state.refresh })
            commit('setAccessToken', response.data.access)
        },
        logout({commit}) {
            commit('setCurrentUser', {})
            commit('removeTokens')
            tokenService.removeAccessToken()
            tokenService.removeRefreshToken()
        },
    },
    getters: {
        isLoggedIn: (state) =>!!state.accessToken
    },
}

export default auth