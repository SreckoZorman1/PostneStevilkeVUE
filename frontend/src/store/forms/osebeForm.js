import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: {},
        loading: false,

        searchResultPoste_stevilke_id: [],

    },
    mutations: {
        getData(state, payload) {
            state.data = payload
        },

        startLoading(state) {
            state.loading = true
        },

        finishLoading(state) {
            state.loading = false
        },

        setPoste_stevilke_id(state, payload) {
            state.searchResultPoste_stevilke_id = payload
        },

    },
    actions: {
        async newHandler({commit, dispatch}, payload) {
            commit('startLoading')
            try {
                const result = await axios.post('/osebe', {data: payload.data})
                dispatch('snackbar/showSnackbar', 'Osebe has been created', {root: true})
                commit(`getData`, result.data)
            } catch (e) {
                dispatch('snackbar/showSnackbar', e, {root: true})
            } finally {
                commit('finishLoading')
            }
        },
        async edit({commit, dispatch}, payload) {
            commit('startLoading')
            try {
                const result = await axios.put(`/osebe/${payload.id}`, {id: payload.id, data: payload.data})

                dispatch('snackbar/showSnackbar', 'Osebe has been updated', {root: true})
                commit(`getData`, result.data)
            } catch (e) {
                dispatch('snackbar/showSnackbar', e, {root: true})
            } finally {
                commit('finishLoading')
            }
        },
        async getData({commit, dispatch}, payload) {
            commit('startLoading')
            try {
                const result = await axios.get(`/osebe/${payload}`)
                commit(`getData`, result.data)
            } catch (e) {
                dispatch('snackbar/showSnackbar', e, {root: true})
            } finally {
                commit('finishLoading')
            }
        },

        async searchPoste_stevilke_id({commit, dispatch}, val) {
        try {
            if (val) {
                const result = await axios(`/postne_stevilke/autocomplete?query=${val}&limit=100`)
                commit('setPoste_stevilke_id', result.data)
            } else {
                const result = await axios(`/postne_stevilke/autocomplete?limit=100`)
                commit('setPoste_stevilke_id', result.data)
            }
        } catch (e) {
            dispatch('snackbar/showSnackbar', e, {root: true})
            commit('setPoste_stevilke_id', [])
            }
        },

    },
}

