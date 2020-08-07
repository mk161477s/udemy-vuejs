<template>
  <div>
    <h2>{{ title | lowerCase | upperCase }}</h2>
    <p>{{ subTitle | lowerCase | upperCase }}</p>
    <p v-border:solid.round.shadow="{width: '5px', color: 'brown'}">Home</p>
    <p>{{number}}</p>
    <button @click="number++">+1</button>
    <CountNumber></CountNumber>
  </div>
</template>

<script>
  import CountNumber from "./CountNumber.vue";
  import { tokyoNumber } from '@/tokyoNumber';

  export default {
    mixins: [tokyoNumber],
    data() {
      return {
        tmpData: "hello",
      };
    },
    components: {
      CountNumber
    },
    directives: {
      border(el, binding) {
        el.style.border = "2px solid #000";
        el.style.borderWidth = binding.value.width;
        el.style.borderColor = binding.value.color;
        el.style.borderStyle = binding.arg;
        if (binding.modifiers.round) {
          el.style.borderRadius = ".5rem";
        }
        if (binding.modifiers.shadow) {
          el.style.boxShadow = "0 2px 5px rgba(0, 0, 0, .26)";
        }
      }
    }
  };
</script>
