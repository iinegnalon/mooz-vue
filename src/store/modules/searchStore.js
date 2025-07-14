const state = () => ({
  searchQuery: '',
  results: [],
  totalResults: 0,
  currentPage: 1,
  pageSize: 8,
  loading: false,
  error: null,
});

const getters = {
  searchQuery: (state) => state.searchQuery,
  results: (state) => state.results,
  totalResults: (state) => state.totalResults,
  currentPage: (state) => state.currentPage,
  pageSize: (state) => state.pageSize,
  loading: (state) => state.loading,
  error: (state) => state.error,
};

const mutations = {
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  updateSearchQuery({ commit }, query) {
    commit('SET_SEARCH_QUERY', query);
  },
  searchMovies({ commit, state }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
