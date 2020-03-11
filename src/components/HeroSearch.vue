<template>
  <div id="search-component">
    <h4><label for="search-box">Hero Search</label></h4>

    <input id="search-box" @input="search" />

    <ul class="search-result">
      <li v-for="hero in heroes" :key="hero.id">
        <router-link :to="'/detail/' + hero.id">
          {{ hero.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { NAMESPACE_HERO } from '@/store/const';
import { Hero } from '@/model/hero';
import _ from 'lodash';
import { namespace } from 'vuex-class';
import { AxiosResponse } from 'axios';
const heroesModule = namespace(NAMESPACE_HERO);

@Component
export default class HeroSearch extends Vue {
  @heroesModule.Action('searchHeroes')
  searchHeroes!: (name: string) => Promise<AxiosResponse<Hero[]>>;
  heroes: Hero[] = [];

  search = _.debounce((event: InputEvent) => {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 0) {
      this.searchHeroes(input.value).then((res) => {
        if (res.status === 200) {
          this.heroes.splice(0);
          this.heroes.push(...res.data);
        }
      });
    } else {
      this.heroes.splice(0);
    }
  }, 300);
}
</script>
<style lang="scss" scoped>
/* HeroSearch private styles */
.search-result li {
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  width: 195px;
  height: 16px;
  padding: 5px;
  background-color: white;
  cursor: pointer;
  list-style-type: none;
}

.search-result li:hover {
  background-color: #607d8b;
}

.search-result li a {
  color: #888;
  display: block;
  text-decoration: none;
}

.search-result li a:hover {
  color: white;
}
.search-result li a:active {
  color: white;
}
#search-box {
  width: 200px;
  height: 20px;
}

ul.search-result {
  margin-top: 0;
  padding-left: 0;
}
</style>
