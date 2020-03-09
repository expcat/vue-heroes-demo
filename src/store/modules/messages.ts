import { ADD_MESSAGE, CLEAR_MESSAGES } from '@/store/const';

export interface MessageStoreState {
  messages: string[];
}

const state: MessageStoreState = {
  messages: []
};

const mutations = {
  [ADD_MESSAGE](state: MessageStoreState, message: string): void {
    state.messages.push(message);
  },
  [CLEAR_MESSAGES](state: MessageStoreState): void {
    state.messages = [];
  }
};

const getters = {
  messages: (state: MessageStoreState): string[] => state.messages,
  messageLength: (state: MessageStoreState): number => state.messages.length
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
