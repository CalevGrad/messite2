import mailApi from '@/api/mail.api'

let mail = {
    namespaced: true,
    state: {
        dialogs: [],
        users: [],
        messages: [],
        currentDialogId: -1,
        currentUser: null,
        searching: false,
    },
    mutations: {
        setCurrentDialog(state, currentDialogId) {
            state.currentDialogId = currentDialogId
        },
        setCurrentUser(state, currentUser) {
            state.currentUser = currentUser
        },
        setActiveForDialog(state, id, value) {
            const dialog = state.dialogs.find(t => t.id === id)
            this.$set(dialog, "active", value)
        },
        setActiveForUser(state, id, value) {
            const user = state.users.find(t => t.id === id)
            this.$set(user, "active", value)
        },
        setUsers(state, users) {
            state.users = users
        },
        setSearching(state, value) {
            state.searching = value
        },
        clearUsers(state) {
            state.users = []
        }
    },
    actions: {
        dialogClick({commit, state}, id) {
            if (state.currentDialogId === id)
                return

            if (this.currentDialogId !== -1)
                commit('setActiveForDialog', state.currentDialogId, false)

            commit('setActiveForDialog', id, true)

            commit('setCurrentDialog', id)
        },
        async userClick({commit, state, dispatch}, user) {
            if (state.currentUser.id === user.id) {
                commit('setActiveForUser', user.id, true)
            }

            if (state.currentUser !== null)
                commit('setActiveForUser', state.currentUser.id, false)

            try {
                let response = await mailApi.existDialog({user_id: user.id})
                commit('clearUsers')
                commit('setSearching', false)
                dispatch('dialogClick', response.data.id)
            } catch(error) {
                console.log(error)
                if (error.response.status === 404) {
                    commit('setActiveForUser', user.id, true)
                    commit('setCurrentUser', user)
                }
            }
        },
        async searchUser({commit}, username) {
            commit('setSearching', true)
            let response = await mailApi.searchUser(username)
            commit('setUsers', response.data.results)
        }
    },
}

export default mail