import Vue from 'vue';
import App from './App.vue';
import router from './router.js';

Vue.config.productionTip = false;

// 全てのページ遷移前に特定の処理を実行する
router.beforeEach((to, from, next) => {
  // next(false); // ページの遷移をしない
  // next('/'); // 無限に実行される
  if (to.path === '/users/1') {
    next({path: '/'});
  }
  next();
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');