<template>
  <div style="width: 700px; margin: 0 auto; padding-top: 50px;">
    <router-view name="header"></router-view>
    <transition
      name="fade"
      mode="out-in"
      @before-enter="beforeEnter"
    >
      <router-view></router-view>
    </transition>
    <Home style="display: none;"></Home>
  </div>
</template>

<script>
import Home from "./views/Home.vue";
export default {
  components: {
    Home
  },
  methods: {
    beforeEnter() { // transitonが適用されているときのスクロールの振る舞いを、非同期で実行することで適切な動きにする
      this.$root.$emit('triggerScroll'); // thisはApp.vue
      // $root => 一番上のインスタンス（main.jsに書いてあるVueインスタンス）
      // $rootが$emitした時、 emitの内容を書くことができる
    }
  }
}
</script>

<style scoped>
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }
</style>