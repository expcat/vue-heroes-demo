<template>
  <div>
    <h1>{{ title }}</h1>
    <nav>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/heroes">Heroes</router-link>
    </nav>
    <router-view />
    <Messages />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Heroes from '@/components/Heroes.vue';
import Messages from '@/components/Messages.vue';
import '@/common/filter';
import {
  SET_HEROES,
  ADD_MESSAGE,
  NAMESPACE_HERO,
  NAMESPACE_MESSAGE
} from '@/store/const';
import { HEROES } from '@/model/mock-heroes';

@Component({
  components: { Heroes, Messages }
})
export default class App extends Vue {
  title = '英雄之旅';

  created() {
    this.$store.commit(NAMESPACE_HERO + SET_HEROES, HEROES);
    this.$store.commit(NAMESPACE_MESSAGE + ADD_MESSAGE, '获取英雄');
  }
}
</script>

<style lang="scss">
/* AppComponent's private CSS styles */
h1 {
  font-size: 1.2em;
  margin-bottom: 0;
}
h2 {
  font-size: 2em;
  margin-top: 0;
  padding-top: 0;
}
nav a {
  padding: 5px 10px;
  text-decoration: none;
  margin-top: 10px;
  margin-right: 10px;
  display: inline-block;
  background-color: #eee;
  border-radius: 4px;
}
nav a:visited,
a:link {
  color: #334953;
}
nav a:hover {
  color: #039be5;
  background-color: #cfd8dc;
}
nav a.active {
  color: #039be5;
}
</style>
