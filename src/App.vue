<template>
  <div class="main">
    <button @click="myAnimation = 'slide'">Slide</button>
    <button @click="myAnimation = 'fade'">Fade</button>
    <p>{{myAnimation}}</p>
    <button @click="show = !show">切り替え</button>
    <br>
    <button @click="add">追加</button>
    <ul style="width: 200px; margin: 0 auto;">
      <transition-group name="fade" tag="div">
        <li
          style="cursor: pointer;"
          v-for="(number, index) in numbers"
          :key="number"
          @click="remove(index)"
        >{{number}}</li>
      </transition-group>
    </ul>
    <br>
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
    >
     <div class="circle" v-if="show"></div>
    </transition>
    <button @click="myComponent = 'ComponentA'">ComponentA</button>
    <button @click="myComponent = 'ComponentB'">ComponentB</button>
    <transition name="fade" mode="out-in">
      <component :is="myComponent"></component>
    </transition>
    <transition name="fade" mode="out-in">
      <p v-if="show" key="bye">さようなら</p>
      <p v-else key="hello">こんにちは</p>
    </transition>
    <transition
      enter-active-class="animate__animated animate__bounce"
      leave-active-class="animate__animated animate__flash"
      appear
    >
      <p v-if="show">hello</p>
    </transition>
    <transition
      :name="myAnimation"
      type="animation"
      appear
    >
      <p v-show="show">bye</p>
    </transition>
  </div>
</template>

<script>
import ComponentA from "./components/ComponentA.vue";
import ComponentB from "./components/ComponentB.vue";
export default {
  components: {
    ComponentA,
    ComponentB
  },
  data() {
    return {
      numbers: [0, 1, 2],
      nextNumber: 3,
      show: true,
      myAnimation: 'slide',
      myComponent: 'ComponentA'
    };
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.numbers.length);
    },
    add() {
      this.numbers.splice(this.randomIndex(), 0, this.nextNumber);
      this.nextNumber += 1;
    },
    remove(index) {
      this.numbers.splice(index, 1);
    },
    beforeEnter(el) {
      // 現れる前
      el.style.transform = 'scale(0)';
    },
    enter(el, done) {
      // 現れた時
      let scale = 0;
      const interval = setInterval(() => {
        el.style.transform = `scale(${scale})`;
        scale += 0.1;
        if (scale > 1) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterEnter() {

    },
    enterCancelled() {

    },
    beforeLeave() {

    },
    leave(el, done) {
      // 消える時
      let scale = 1;
      const interval = setInterval(() => {
        el.style.transform = `scale(${scale})`;
        scale -= 0.1;
        if (scale < 0) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterLeave() {
      // 消えた後
    },
    leaveCancelled() {
      // 消えるアニメーションがキャンセルされたとき
    },
  }
}
</script>

<style scoped>
.circle {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 100px;
  background-color: deeppink;
}
  .fade-move {
    transition: transform .5s;
  }
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: opacity .5s;
  }
  .fade-enter-to {
    /* 現れる時の最後の状態 */
    opacity: 1;
  }
  .fade-leave {
    /* 消える時の最初の状態 */
    opacity: 1;
  }
  .fade-leave-active {
    /* 消えるときのトランジションの状態 */
    transition: opacity .5s;
    position: absolute;
    width: 200px;
  }
  .fade-leave-to {
    opacity: 0;
  }

  .slide-enter,
  .slide-leave-to {
    opacity: 0;
  }
  .slide-enter-active {
    animation: slideIn .5s;
    transition: opacity 1s;
  }
  .slide-leave-active {
    animation: slideIn .5s reverse;
    transition: opacity 1s;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100px);
    }

    to {
      transform: translateX(0);
    }
  }

  .main {
    width: 70%;
    margin: 2rem auto 0;
    text-align: center;
  }
</style>