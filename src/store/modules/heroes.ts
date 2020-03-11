import { Hero } from '@/model/hero';
import {
  SET_HEROES,
  ADD_HEROES,
  DELETE_HEROES,
  CHANGE_SELECTED_HERO,
  UPDATE_SELECTED_HERO
} from '@/store/const';
import { Commit } from 'vuex';
import axios, { AxiosResponse } from 'axios';

export interface HeroStoreState {
  heroes: Hero[];
  selected: Hero | null;
}

const state: HeroStoreState = {
  heroes: [],
  selected: null
};

const mutations = {
  [SET_HEROES](state: HeroStoreState, heroes: Hero[]): void {
    state.heroes = heroes;
  },
  [CHANGE_SELECTED_HERO](state: HeroStoreState, id: number): void {
    const index = state.heroes.findIndex((hero: Hero) => hero.id === id);
    if (index > -1) state.selected = state.heroes[index];
    else state.selected = null;
  },
  [UPDATE_SELECTED_HERO](state: HeroStoreState, newName: string): void {
    if (state.selected) {
      state.selected.name = newName;
    }
  },
  [ADD_HEROES](state: HeroStoreState, hero: Hero): void {
    state.heroes.push(hero);
  },
  [DELETE_HEROES](state: HeroStoreState, id: number): void {
    const index = state.heroes.findIndex((hero) => hero.id === id);
    if (index > -1) {
      state.heroes.splice(index, 1);
    }
  }
};

const getters = {
  heroes: (state: HeroStoreState): Hero[] => state.heroes,
  selected: (state: HeroStoreState): Hero | null => state.selected,
  topHeroes: (state: HeroStoreState): Hero[] => state.heroes.slice(0, 4),
  getHero: (state: HeroStoreState) => (id: number): Hero | null => {
    const index = state.heroes.findIndex((hero: Hero) => hero.id === id);
    if (index > -1) return state.heroes[index];
    return null;
  }
};

const actions = {
  setHeroes(context: { commit: Commit }, heroes: Hero[]) {
    context.commit(SET_HEROES, heroes);
  },
  changeSelectedHero(context: { commit: Commit }, hero: Hero) {
    context.commit(CHANGE_SELECTED_HERO, hero);
  },
  getHeroes(context: {}): Promise<AxiosResponse<Hero[]>> {
    return axios.get<Hero[]>('/api/heroes');
  },
  addHero(context: {}, hero: Hero): Promise<AxiosResponse<Hero>> {
    return axios.post<Hero>('/api/heroes', hero);
  },
  delHero(context: {}, id: number): Promise<AxiosResponse<string>> {
    return axios.delete<string>('/api/heroes/' + id);
  },
  searchHeroes(context: {}, name: string): Promise<AxiosResponse<Hero[]>> {
    return axios.get<Hero[]>('/api/heroes/?name=' + name);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
