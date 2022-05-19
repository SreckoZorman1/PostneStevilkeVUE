import axios from 'axios';

export default {
  namespaced: true,
  state: {
    data: {},
    loading: false,
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
  },
  actions: {
    async newHandler({ commit, dispatch }, payload) {
      commit('startLoading');
      try {
        const result = await axios.post('/drzave', { data: payload.data });
        dispatch('snackbar/showSnackbar', 'Drzave has been created', {
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
        const result = await axios.put(`/drzave/${payload.id}`, {
          id: payload.id,
          data: payload.data,
        });

        dispatch('snackbar/showSnackbar', 'Drzave has been updated', {
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
        const result = await axios.get(`/drzave/${payload}`);
        commit(`getData`, result.data);
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        commit('finishLoading');
      }
    },
  },
};
