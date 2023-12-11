import type { RouterOptions } from 'vue-router';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    redirect: '/homepage'
  },
  {
    path: '/homepage',
    component: () => import('~/views/homepage/index.vue'),
  },
]

export default routes