<template>
  <div v-if="messageLength > 0">
    <h2>消息</h2>
    <button class="clear" v-on:click="clear">clear</button>
    <div v-for="(message, index) in messages" :key="index">{{ message }}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { NAMESPACE_MESSAGE, CLEAR_MESSAGES } from '@/store/const';
import { namespace } from 'vuex-class';
const messagesModule = namespace(NAMESPACE_MESSAGE);

@Component
export default class Messages extends Vue {
  @messagesModule.Getter('messageLength') messageLength!: number;
  @messagesModule.Getter('messages') messages!: string[];
  @messagesModule.Mutation(CLEAR_MESSAGES)
  addMessage!: () => void;

  clear() {
    this.addMessage();
  }
}
</script>
<style lang="scss" scoped>
/* MessagesComponent's private CSS styles */
h2 {
  color: red;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
}
body {
  margin: 2em;
}
body,
input[text],
button {
  color: crimson;
  font-family: Cambria, Georgia;
}

button.clear {
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
}
button:hover {
  background-color: #cfd8dc;
}
button:disabled {
  background-color: #eee;
  color: #aaa;
  cursor: auto;
}
button.clear {
  color: #333;
  margin-bottom: 12px;
}
</style>
