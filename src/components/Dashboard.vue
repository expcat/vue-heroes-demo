<template>
  <div>
    <h3>顶级英雄</h3>
    <div class="grid grid-pad">
      <router-link v-for="hero in heroes" :key="hero.id" class="col-1-4" :to="'/detail/' + hero.id">
        <div class="module hero">
          <h4>{{ hero.name }}</h4>
        </div>
      </router-link>
    </div>
    <HeroSearch />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Hero } from "@/model/hero";
import { NAMESPACE_HERO, SET_HEROES } from "@/store/const";
import HeroSearch from "./HeroSearch.vue";
import { namespace } from "vuex-class";
import { AxiosResponse } from "axios";
const heroesModule = namespace(NAMESPACE_HERO);

@Component({ components: { HeroSearch } })
export default class Dashboard extends Vue {
  @heroesModule.Getter("topHeroes") heroes!: Hero[];
  @heroesModule.Action("getHeroes") getHeroes!: () => Promise<
    AxiosResponse<Hero[]>
  >;
  @heroesModule.Mutation(SET_HEROES)
  setHeroes!: (heroes: Hero[]) => void;

  created() {
    this.getHeroes().then(res => {
      if (res.status === 200) {
        this.setHeroes(res.data);
      }
    });
  }
}
</script>
<style lang="scss" scoped>
/* DashboardComponent's private CSS styles */
[class*="col-"] {
  float: left;
  padding-right: 20px;
  padding-bottom: 20px;
}
[class*="col-"]:last-of-type {
  padding-right: 0;
}
a {
  text-decoration: none;
}
*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
h3 {
  text-align: center;
  margin-bottom: 0;
}
h4 {
  position: relative;
}
.grid {
  margin: 0;
}
.col-1-4 {
  width: 25%;
}
.module {
  padding: 20px;
  text-align: center;
  color: #eee;
  max-height: 120px;
  min-width: 120px;
  background-color: #3f525c;
  border-radius: 2px;
}
.module:hover {
  background-color: #eee;
  cursor: pointer;
  color: #607d8b;
}
.grid-pad {
  padding: 10px 0;
}
.grid-pad > [class*="col-"]:last-of-type {
  padding-right: 20px;
}
@media (max-width: 600px) {
  .module {
    font-size: 10px;
    max-height: 75px;
  }
}
@media (max-width: 1024px) {
  .grid {
    margin: 0;
  }
  .module {
    min-width: 60px;
  }
}
</style>
