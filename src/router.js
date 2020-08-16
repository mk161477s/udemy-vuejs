import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Users from './views/Users.vue';
import UsersPosts from './views/UsersPosts.vue';
import UsersProfile from './views/UsersProfile.vue';

// プラグイン（Vue.js全体に影響を与えるもの）を適用する
Vue.use(Router);

export default new Router({
  // historyモード => 「#」を削除する
  mode: 'history',
  // URLとコンポーネントをマッピング
  routes: [
    {path: '/', component: Home},
    {
      path: '/users/:id',
      // 「users」の手前にスラッシュを付ける
      component: Users,
      props: true,
      children: [
        {path: 'posts', component: UsersPosts},
        {path: 'profile', component: UsersProfile, name: "users-id-profile"},
        // childrenプロパティ内のpathは、「posts」「profile」の手前にはスラッシュを付けない（後ろだとOK）
        // => ネスト元のパスと繋がっているイメージ
      ]
    },
  ]
});