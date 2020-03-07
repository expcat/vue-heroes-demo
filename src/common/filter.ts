import Vue from 'vue';

Vue.filter('uppercase', function(value: string) {
  return value.toUpperCase();
});
