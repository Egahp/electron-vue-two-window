import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: require('@/windows/main/components/Page').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
