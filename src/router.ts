import Vue from 'vue';
import Router from 'vue-router';
import { environment } from '@/environment/environment';

Vue.use(Router);

const Dashboard = () =>
  import(/* webpackChunkName: "heroes" */ '@/components/Dashboard.vue');
const Heroes = () =>
  import(/* webpackChunkName: "heroes" */ '@/components/Heroes.vue');
const HeroDetail = () =>
  import(/* webpackChunkName: "heroes" */ '@/components/HeroDetail.vue');

export default new Router({
  mode: 'history',
  base: environment.publicPath,
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/heroes',
      name: 'heroes',
      component: Heroes
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: HeroDetail
    },
    {
      path: '*',
      component: Heroes
    }
  ]
});
