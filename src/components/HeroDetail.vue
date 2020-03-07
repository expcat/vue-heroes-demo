<template>
  <div v-if="hero">
    <h2>{{hero.name | uppercase}} 详情</h2>
    <div>
      <span>id:</span>
      {{hero.id}}
    </div>
    <div>
      <span>name:</span>
      {{hero.name}}
    </div>
    <div>
      <label>
        name:
        <input v-model="hero.name" placeholder="name" />
      </label>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Hero } from "@/model/hero";
import { Prop, Component } from "vue-property-decorator";
@Component
export default class HeroDetail extends Vue {
  @Prop()
  hero?: Hero;
}
</script>