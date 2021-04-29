import mailApi from '@/api/mail.api'

let mail = {
    namespaced: true,
    state: {
        dialogs: [],
        users: [],
        searchUsers: [],
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
        setUsers(state, users) {
            state.users = users
        },
        setDialogs(state, dialogs) {
            state.dialogs = dialogs
        },
        setSearchUsers(state, users) {
            state.searchUsers = users
        },
        setMessages(state, messages) {
            state.messages = messages
        },
        setSearching(state, value) {
            state.searching = value
        },
        clearSearchUsers(state) {
            state.searchUsers = []
        },
        clearSearchText(state) {
            state.searchText = ''
        },
        clearMessages(state) {
            state.messages = []
        },
        addDialog(state, dialog) {
            state.dialogs.unshift(dialog)
        },
        addUser(state, user) {
            state.users.push(user)
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
                let response = await mailApi.existDialog(id)
                dispatch('dialogClick', response.data.id)
                dispatch('stopSearchUser')
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
            commit('setSearchUsers', response.data.results)
        },
        stopSearchUser({commit}) {
            commit('clearSearchText')
            commit('setSearching', false)
            commit('setCurrentUserId', -1)
            commit('clearSearchUsers')
        },
        async sendMessageOrCreateDialog({commit, state, dispatch, rootGetters}, text) {
            if (state.currentDialogId === -1 && state.currentUserId !== -1) {
                const user = state.searchUsers.find(t => t.id === state.currentUserId)
                const response = await mailApi.newDialog([rootGetters['auth/getCurrentUser'].id, user.id], text)

                commit('addUser', user)
                commit('addDialog', response.data)
                dispatch('dialogClick', response.data.id)
                dispatch('stopSearchUser')
            } else if (state.currentDialogId !== -1) {
                await mailApi.newMessage(state.currentDialogId, text)
            }
        },
        async getDialogs({commit}) {
            const response = await mailApi.getDialogs()
            let usersId = []
            for (let dialog of response.data.results)
                usersId.push(...dialog.owners)
            const response1 = await mailApi.getUsers(usersId)
            commit('setUsers', response1.data.results)
            commit('setDialogs', response.data.results)
        }
    },
    getters: {
        interlocutor: (state, getters, rootState, rootGetters) => {
            if (state.currentDialogId !== -1) {
                const dialog = state.dialogs.find(t => t.id === state.currentDialogId)

                if (dialog.owners.length === 1 || dialog.owners[0] !== rootGetters['auth/getCurrentUser'].id)
                    return getters.getUser(dialog.owners[0])
                else return getters.getUser(dialog.owners[1])
            } else if (state.currentUserId !== -1) {
                return state.searchUsers.find(t => t.id === state.currentUserId)
            }
        },
        getUser: (state) => (id) => {
            return state.users.find(t => t.id === id)
        },
    },
}

export default mail