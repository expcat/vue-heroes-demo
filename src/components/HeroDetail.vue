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
  CHANGE_SELECTED_HERO
} from '@/store/const';

@Component
export default class HeroDetail extends Vue {
  get hero(): Hero | null {
    return this.$store.getters[NAMESPACE_HERO + 'selected'];
  }

  created() {
    this.$store.commit(
      NAMESPACE_HERO + CHANGE_SELECTED_HERO,
      +this.$route.params.id
    );
  }

  updateHero(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    this.$store.commit(NAMESPACE_HERO + UPDATE_SELECTED_HERO, input.value);
  }
}
</script>
