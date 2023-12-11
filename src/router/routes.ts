import type { RouterOptions } from 'vue-router';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    redirect: '/bugpage'
  },
  {
    path: '/homepage',
    component: () => import('~/views/homepage/index.vue'),
  },
  {
    path: '/bugpage',
    component: () => import('~/views/bug-page/index2.vue'),
  },
]

export default routes