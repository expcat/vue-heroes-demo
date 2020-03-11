import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { environment } from '@/environment/environment';
// environment.mock && require('./mock/mock');
// Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: (h) => h(App)
// }).$mount('#app');

function init() {
  Vue.config.productionTip = false;

  new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount('#app');
}
if (environment.mock) {
  require(['./mock/mock'], init);
} else {
  init();
}
