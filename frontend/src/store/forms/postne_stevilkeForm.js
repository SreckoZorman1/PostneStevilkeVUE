import axios from 'axios';

export default {
  namespaced: true,
  state: {
    data: {},
    loading: false,

    searchResultId_drzave: [],
  },
  mutations: {
    getData(state, payload) {
      state.data = payload;
    },

    startLoading(state) {
      state.loading = true;
    },

    finishLoading(state) {
      state.loading = false;
    },

    setId_drzave(state, payload) {
      state.searchResultId_drzave = payload;
    },
  },
  actions: {
    async newHandler({ commit, dispatch }, payload) {
      commit('startLoading');
      try {
        const result = await axios.post('/postne_stevilke', {
          data: payload.data,
        });
        dispatch('snackbar/showSnackbar', 'Postne_stevilke has been created', {
          root: true,
        });
        commit(`getData`, result.data);
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        commit('finishLoading');
      }
    },
    async edit({ commit, dispatch }, payload) {
      commit('startLoading');
      try {
        const result = await axios.put(`/postne_stevilke/${payload.id}`, {
          id: payload.id,
          data: payload.data,
        });

        dispatch('snackbar/showSnackbar', 'Postne_stevilke has been updated', {
          root: true,
        });
        commit(`getData`, result.data);
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        commit('finishLoading');
      }
    },
    async getData({ commit, dispatch }, payload) {
      commit('startLoading');
      try {
        const result = await axios.get(`/postne_stevilke/${payload}`);
        commit(`getData`, result.data);
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        commit('finishLoading');
      }
    },

    async searchId_drzave({ commit, dispatch }, val) {
      try {
        if (val) {
          const result = await axios(
            `/drzave/autocomplete?query=${val}&limit=100`,
          );
          commit('setId_drzave', result.data);
        } else {
          const result = await axios(`/drzave/autocomplete?limit=100`);
          commit('setId_drzave', result.data);
        }
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
        commit('setId_drzave', []);
      }
    },
  },
};
