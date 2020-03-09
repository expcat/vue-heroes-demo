import Vue from 'vue';
import Vuex from 'vuex';
import heroes from './modules/heroes';
import messages from './modules/messages';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { heroes, messages },
  strict: process.env.NODE_ENV !== 'production'
});
