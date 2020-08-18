import Vue from 'vue';
import Router from 'vue-router';

// import Home from './views/Home.vue';
// import Users from './views/Users.vue';
// import UsersPosts from './views/UsersPosts.vue';
// import UsersProfile from './views/UsersProfile.vue';
// import HeaderHome from './views/HeaderHome.vue';
// import HeaderUsers from './views/HeaderUsers.vue';

// 遅延ローディング
const Home = () => import(/* webpackChunkName: "Home" */ './views/Home.vue');
const Users = () => import(/* webpackChunkName: "Users" */ './views/Users.vue');
const UsersPosts = () => import(/* webpackChunkName: "UsersPosts" */ './views/UsersPosts.vue');
const UsersProfile = () => import(/* webpackChunkName: "UsersProfile" */ './views/UsersProfile.vue');
const HeaderHome = () => import(/* webpackChunkName: "HeaderHome" */ './views/HeaderHome.vue');
const HeaderUsers = () => import(/* webpackChunkName: "HeaderUsers" */ './views/HeaderUsers.vue');

/* prefetch => VueCLI3からの仕様
次に必要になりそうなものを、暇なときに取っておいておく仕組み
disc cacheにデータを置いておき、必要になったら取り出してくる

*/

// プラグイン（Vue.js全体に影響を与えるもの）を適用する
Vue.use(Router);

export default new Router({
  // historyモード => 「#」を削除する
  mode: 'history',
  // URLとコンポーネントをマッピング
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        header: HeaderHome
      },
      // 特定のページ遷移前に、特定の処理をするためのbeforeEnterガード
      // beforeEnter(to, from, next) {
      //   next(false);
      // }
    },
    {
      path: '/users/:id',
      // 「users」の手前にスラッシュを付ける
      // component: Users,
      components: { // 名前付きビューを使用する場合はプロパティ名を複数形にし、値はオブジェクトにする
        default: Users,
        header: HeaderUsers
      },
      // props: true,
      props: { // 名前付きビューごとにpropsを定義する
        default: true,
        header: false
      },
      children: [
        {path: 'posts', component: UsersPosts},
        {path: 'profile', component: UsersProfile, name: "users-id-profile"},
        // childrenプロパティ内のpathは、「posts」「profile」の手前にはスラッシュを付けない（後ろだとOK）
        // => ネスト元のパスと繋がっているイメージ
      ]
    },
    {
      // path: '/hello',
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      // new Vueのインスタンスに対して何かemitされた時、emitの内容を$onによって処理できる
      // $onceでも同じような処理ができるが、onceは一度実行されると消える
      this.app.$root.$once('triggerScroll', () => {
      // 上記のthisはnew Routerで生成したインスタンスにアクセスするもの
      // new Routerで生成したインスタンスはappを持つ
      // this.app => new Vueで挿入されたインスタンス
        let position = {x:0, y:0};
        if (savedPosition) {
          position = savedPosition;
        }
        if (to.hash) {
          position = {
            selector: to.hash
          };
        }
        resolve(position);
      });
    });
  }
});