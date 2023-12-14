import type { RouterOptions } from 'vue-router';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    redirect: '/bugpage'
  },
  {
    path: '/bugpage',
    component: () => import('~/views/bug-page/index.vue'),
  },
  {
    path: '/buglist',
    component: () => import('~/views/bug-list/index.vue'),
  },
]

export default routes