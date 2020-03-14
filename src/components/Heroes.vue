<template>
  <div>
    <h2>我的英雄</h2>
    <div>
      <label>
        英雄名称:
        <input ref="heroName" />
      </label>
      <button @click="add">添加</button>
    </div>
    <ul class="heroes">
      <li v-for="hero in heroes" :key="hero.id">
        <router-link :to="'/detail/' + hero.id">
          <span class="badge">{{ hero.id }}</span>
          {{ hero.name }}
        </router-link>
        <button class="delete" title="delete hero" @click="del(hero.id)">x</button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Hero } from "@/model/hero";
import { Component } from "vue-property-decorator";
import HeroDetail from "./HeroDetail.vue";
import {
  NAMESPACE_HERO,
  NAMESPACE_MESSAGE,
  ADD_MESSAGE,
  ADD_HERO,
  SET_HEROES,
  DELETE_HERO
} from "@/store/const";
import { namespace } from "vuex-class";
import { AxiosResponse } from "axios";
const heroesModule = namespace(NAMESPACE_HERO);
const messagesModule = namespace(NAMESPACE_MESSAGE);

@Component({ components: { HeroDetail } })
export default class Heroes extends Vue {
  @heroesModule.Getter("heroes") heroes!: Hero[];
  @heroesModule.Action("addHero") addHero!: (
    hero: Hero
  ) => Promise<AxiosResponse<Hero>>;
  @heroesModule.Action("delHero") delHero!: (
    id: number
  ) => Promise<AxiosResponse<string>>;
  @heroesModule.Mutation(ADD_HERO) add_hero!: (hero: Hero) => void;
  @heroesModule.Mutation(DELETE_HERO) del_hero!: (id: number) => void;
  @heroesModule.Mutation(SET_HEROES)
  setHeroes!: (heroes: Hero[]) => void;
  @heroesModule.Action("getHeroes") getHeroes!: () => Promise<
    AxiosResponse<Hero[]>
  >;
  @messagesModule.Mutation(ADD_MESSAGE)
  addMessage!: (message: string) => void;

  created() {
    this.getHeroes().then(res => {
      if (res.status === 200) {
        this.setHeroes(res.data);
      }
    });
  }
  add(): void {
    const heroName = this.$refs.heroName as HTMLInputElement;
    this.addHero({ name: heroName.value } as Hero).then(res => {
      if (res.status === 200) {
        this.add_hero(res.data);
        this.addMessage(`添加英雄 id=${res.data.id}`);
      }
      heroName.value = "";
    });
  }
  del(id: number): void {
    this.delHero(id).then(res => {
      if (res.status === 200) {
        this.del_hero(id);
        this.addMessage(`删除英雄 id=${id}`);
      }
    });
  }
}
</script>
<style lang="scss" scoped>
/* HeroesComponent's private CSS styles */
.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;
}
.heroes li {
  position: relative;
  cursor: pointer;
  background-color: #eee;
  margin: 0.5em;
  padding: 0.3em 0;
  height: 1.6em;
  border-radius: 4px;
}

.heroes li:hover {
  color: #607d8b;
  background-color: #ddd;
  left: 0.1em;
}

.heroes a {
  color: #333;
  text-decoration: none;
  position: relative;
  display: block;
  width: 250px;
}

.heroes a:hover {
  color: #607d8b;
}

.heroes .badge {
  display: inline-block;
  font-size: small;
  color: white;
  padding: 0.8em 0.7em 0 0.7em;
  background-color: #405061;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  min-width: 16px;
  text-align: right;
  margin-right: 0.8em;
  border-radius: 4px 0 0 4px;
}

button {
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
  font-family: Arial;
}

button:hover {
  background-color: #cfd8dc;
}

button.delete {
  position: relative;
  left: 194px;
  top: -32px;
  background-color: gray !important;
  color: white;
}
</style>
