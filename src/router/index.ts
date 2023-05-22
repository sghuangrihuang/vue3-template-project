import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';
const router = createRouter({
  history:
    import.meta.env.VITE_APP_ROUTE_MODE === 'hash'
      ? createWebHashHistory()
      : createWebHistory(),
  routes,
});
export default router