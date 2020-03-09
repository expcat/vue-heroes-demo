<template>
  <div>
    <h1>{{ title }}</h1>
    <Heroes :heroes="this.$store.state.heroes" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Heroes from '@/components/Heroes.vue';
import '@/common/filter';
import { SET_HEROES } from '@/store/const';
import { HEROES } from '@/model/mock-heroes';
@Component({
  components: { Heroes }
})
export default class App extends Vue {
  title = '英雄之旅';

  created() {
    this.$store.commit(SET_HEROES, HEROES);
  }
}
</script>

<style lang="scss"></style>
