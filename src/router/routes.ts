import type { RouterOptions } from 'vue-router';

const routes: RouterOptions['routes'] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('@/components/HelloWorld.vue') },
]

export default routes