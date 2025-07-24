const state = () => ({
  searchQuery: '',
  results: [],
  totalResults: 0,
  currentPage: 1,
  pageSize: 10,
  loading: false,
  error: null,
});

const getters = {
  searchQuery: (state) => state.searchQuery,
  results: (state) => state.results,
  totalResults: (state) => state.totalResults,
  pageSize: (state) => state.pageSize,
  currentPage: (state) => state.currentPage,
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
  SET_RESULTS(state, results) {
    state.results = results.results;
    state.totalResults = results.total;
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page;
  },
};

const actions = {
  updateSearchQuery({ commit }, query) {
    let searchQuery = query.trim();
    commit('SET_SEARCH_QUERY', searchQuery);
  },
  searchMovies: async ({ commit, state }) => {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);

    let searchQuery = state.searchQuery.trim();

    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const page = state.currentPage || 1;

    if (!searchQuery) {
      commit('SET_RESULTS', { results: [], total: 0 });
      commit('SET_LOADING', false);
      return;
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchQuery)}&page=${page}`,
      );
      const data = await response.json();

      if (data.Response === 'True') {
        commit('SET_RESULTS', {
          results: data.Search,
          total: parseInt(data.totalResults) || 0,
        });
      } else {
        commit('SET_RESULTS', {
          results: [],
          total: 0,
        });
        commit('SET_ERROR', data.Error || 'No results found');
      }
    } catch (err) {
      commit('SET_ERROR', 'Error fetching results');
      console.log(err);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  updateCurrentPage({ commit }, page) {
    commit('SET_CURRENT_PAGE', page);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
