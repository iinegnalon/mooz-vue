import { createStore } from 'vuex';
import search from './modules/searchStore.js';

export default createStore({
  modules: {
    search,
  },
});
