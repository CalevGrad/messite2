import tokenService from '../services/token.service'
import authentication from '../api/auth.api'

let auth = {
    namespaced: true,
    state: {
        accessToken: tokenService.getAccessToken() || '',
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
            const response = await authentication.signIn(username, password)

            tokenService.setAccessToken(response.data.access)
            tokenService.setRefreshToken(response.data.refresh)

            commit('setAccessToken', response.data.access)
            commit('setRefreshToken', response.data.refresh)
        },
        async getNewAccessToken({commit, state}) {
            const response = await  authentication.refresh({ 'refresh': state.refreshToken })
            tokenService.setAccessToken(response.data.access)
            commit('setAccessToken', response.data.access)
        },
        logout({commit}) {
            commit('setCurrentUser', {})
            commit('removeTokens')
            tokenService.removeAccessToken()
            tokenService.removeRefreshToken()
        },
        async getCurrentUser({commit}) {
            const response = await authentication.getCurrentUser()
            commit('setCurrentUser', response.data)
        }
    },

    getters: {
        isLoggedIn: (state) => !!state.accessToken,
    },
}

export default auth