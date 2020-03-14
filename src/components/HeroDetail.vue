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
        <input v-model="hero.name" placeholder="name" ref="heroInput" />
      </label>
    </div>
    <button @click="goBack">返回</button>
    <button @click="save">保存</button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Hero } from "@/model/hero";
import { Component } from "vue-property-decorator";
import { NAMESPACE_HERO, NAMESPACE_MESSAGE, ADD_MESSAGE } from "@/store/const";

import { namespace } from "vuex-class";
import { AxiosResponse } from "axios";

const heroesModule = namespace(NAMESPACE_HERO);
const messagesModule = namespace(NAMESPACE_MESSAGE);

@Component
export default class HeroDetail extends Vue {
  @heroesModule.Action("getHero") getHero!: (
    id: number
  ) => Promise<AxiosResponse<Hero>>;
  @heroesModule.Action("updateHero") updateHero!: (
    hero: Hero
  ) => Promise<AxiosResponse<string>>;
  @messagesModule.Mutation(ADD_MESSAGE)
  addMessage!: (message: string) => void;

  hero: Hero | null = null;

  created() {
    this.getHero(+this.$route.params.id).then(res => {
      if (res.status === 200) {
        this.hero = res.data;
        this.addMessage(`获取英雄 id:${res.data.id}`);
      }
    });
  }

  goBack(): void {
    this.$router.back();
  }

  save(): void {
    if (this.hero) {
      this.updateHero(this.hero).then(res => {
        if (res.status === 200) {
          this.addMessage(`更新英雄 id:${this.hero?.id}`);
          this.$router.back();
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
/* HeroDetailComponent's private CSS styles */
label {
  display: inline-block;
  width: 3em;
  margin: 0.5em 0;
  color: #607d8b;
  font-weight: bold;
}
input {
  height: 2em;
  font-size: 1em;
  padding-left: 0.4em;
}
button {
  margin-top: 20px;
  margin-right: 10px;
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
  color: #ccc;
  cursor: auto;
}
</style>