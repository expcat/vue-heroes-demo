<template>
  <div>
    <h1>{{title}}</h1>
    <Heroes :heroes="heroes" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Heroes from "@/components/Heroes.vue";
import { HEROES } from "@/model/mock-heroes";
import "@/common/filter";
import { Hero } from "./model/hero";
@Component({
  components: { Heroes }
})
export default class App extends Vue {
  title = "英雄之旅";
  heroes: Hero[] = HEROES;
}
</script>

<style lang="scss">
</style>
