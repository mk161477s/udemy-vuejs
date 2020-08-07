<template>
  <div>
    <h2>{{ title | lowerCase | upperCase }}</h2>
    <p>{{ subTitle | lowerCase | upperCase }}</p>
    <!-- <p v-border:solid.round.shadow="{width: '5px', color: 'brown'}">Home</p> -->
    <p>{{number}}</p>
    <button @click="number++">+1</button>
  </div>
</template>

<script>
  import { tokyoNumber } from '@/tokyoNumber';
  export default {
    mixins: [tokyoNumber],
    created() {
      console.log("created in component");
    }
  };
</script>
