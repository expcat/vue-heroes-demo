<template>
  <div v-if="hero">
    <h2>{{ hero.name | uppercase }} 详情</h2>
    <div>
      <span>id:</span>
      {{ hero.id }}
    </div>
    <div>
      <span>name:</span>
      {{ hero.name }}
    </div>
    <div>
      <label>
        name:
        <input :value="hero.name" @input="updateHero" placeholder="name" />
      </label>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Hero } from '@/model/hero';
import { Component } from 'vue-property-decorator';
import {
  UPDATE_SELECTED_HERO,
  NAMESPACE_HERO,
  CHANGE_SELECTED_HERO,
  NAMESPACE_MESSAGE,
  ADD_MESSAGE
} from '@/store/const';

import { namespace } from 'vuex-class';

const heroesModule = namespace(NAMESPACE_HERO);
const messagesModule = namespace(NAMESPACE_MESSAGE);

@Component
export default class HeroDetail extends Vue {
  @heroesModule.Getter('selected') hero!: Hero | null;
  @heroesModule.Mutation(CHANGE_SELECTED_HERO)
  changeSelectedHero!: (id: number) => void;
  @heroesModule.Mutation(UPDATE_SELECTED_HERO)
  updateSelectedHero!: (newName: string) => void;
  @messagesModule.Mutation(ADD_MESSAGE)
  addMessage!: (message: string) => void;

  created() {
    this.changeSelectedHero(+this.$route.params.id);
    this.addMessage(`获取英雄 id:${this.$route.params.id}`);
  }

  updateHero(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedHero(input.value);
  }
}
</script>
