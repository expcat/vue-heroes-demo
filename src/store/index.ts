import Vue from 'vue';
import Vuex from 'vuex';
import { Hero } from '@/model/hero';
import * as Const from './const';

Vue.use(Vuex);

interface StoreState {
  heroes: Hero[];
  selected: Hero | null;
}

const storeState: StoreState = {
  heroes: [],
  selected: null
};

export default new Vuex.Store({
  state: storeState,
  mutations: {
    [Const.SET_HEROES](state: StoreState, heroes: Hero[]): void {
      state.heroes = heroes;
    },
    [Const.CHANGE_SELECTED_HERO](state: StoreState, hero: Hero | null): void {
      state.selected = hero;
    }
  },
  actions: {},
  modules: {}
});
