import mailApi from '@/api/mail.api'

let mail = {
    namespaced: true,
    state: {
        dialogs: [],
        users: [],
        messages: [],
        currentDialogId: -1,
        currentUserId: -1,
        searching: false,
    },
    mutations: {
        setCurrentDialogId(state, currentDialogId) {
            state.currentDialogId = currentDialogId
        },
        setCurrentUserId(state, currentUserId) {
            state.currentUserId = currentUserId
        },
        setDialogs(state, dialogs) {
            state.dialogs = dialogs
        },
        setUsers(state, users) {
            state.users = users
        },
        setMessages(state, messages) {
            state.messages = messages
        },
        setSearching(state, value) {
            state.searching = value
        },
        clearUsers(state) {
            state.users = []
        },
        clearSearchText(state) {
            state.searchText = ''
        },
        clearMessages(state) {
            state.messages = []
        },
    },
    actions: {
        async dialogClick({commit, state}, id) {
            if (state.currentDialogId === id)
                return

            commit('setCurrentDialogId', id)

            const response = await mailApi.getMessages({dialog_id: state.currentDialogId, count_messages: 10})
            commit('setMessages', response.data.results)
        },
        async userClick({commit, state, dispatch}, id) {

            if (state.currentUserId.id === id)
                return

            if (state.currentDialogId !== -1)
                commit('setCurrentDialogId', -1)

            try {
                let response = await mailApi.existDialog({user_id: id})
                dispatch('stopSearchUser')
                dispatch('dialogClick', response.data.id)
            } catch(error) {
                console.log(error)
                if (error.response.status === 404) {
                    commit('clearMessages')
                    commit('setCurrentUserId', id)
                }
            }
        },
        async searchUser({commit}, text) {
            commit('setSearching', true)
            let response = await mailApi.searchUser(text)
            commit('setUsers', response.data.results)
        },
        stopSearchUser({commit}) {
            commit('clearSearchText')
            commit('setSearching', false)
            commit('setCurrentUserId', -1)
            commit('clearUsers')
        },
        async sendMessageOrCreateDialog({state, dispatch, rootGetters}, text) {
            if (state.currentDialogId === -1 && state.currentUserId !== -1) {
                const user = state.users.find(t => t.id === state.currentUserId)
                const response = await mailApi.newDialog([rootGetters['auth/getCurrentUser'], user], text)
                dispatch('dialogClick', response.data.id)
                dispatch('stopSearchUser')
            } else if (state.currentDialogId !== -1) {
                await mailApi.newMessage(state.currentDialogId, text)
            }
        },
        async getDialogs({commit}) {
            const response = await mailApi.getDialogs()
            commit('setDialogs', response.data.results)
        }
    },
    getters: {
        interlocutor: (state, getters, rootState, rootGetters) => {
            if (state.currentDialogId !== -1) {
                const dialog = state.dialogs.find(t => t.id === state.currentDialogId)
                if (dialog.owners.length === 1)
                    return dialog.owners[0]
                if (dialog.owners[0].id !== rootGetters['auth/getCurrentUser'].id)
                    return dialog.owners[0]
                else return dialog.owners[1]
            } else if (state.currentUserId !== -1) {
                return state.users.find(t => t.id === state.currentUserId)
            }
        },
    },
}

export default mail