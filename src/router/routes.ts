import type { RouterOptions } from 'vue-router';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    redirect: '/homepage'
  },
  {
    path: '/homepage',
    component: () => import('~/views/homepage/index.vue'),
    redirect: '/homepage/home',
    children: [
      {
        path: '/homepage/home',
        component: () => import('~/views/homepage/pages/home/index.vue'),
      },
      {
        path: '/homepage/other',
        component: () => import('~/views/homepage/pages/other/index.vue'),
      },
      {
        path: '/homepage/chatgpt',
        component: () => import('~/views/homepage/pages/chatgpt/index.vue'),
      }
    ]
  },
]

export default routes