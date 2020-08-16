<template>
  <div>
    <h3>Home</h3>
    <button @click="toUsers">Usersのページに行く</button>
  </div>
</template>

<script>
  export default {
    methods: {
      toUsers() {
        // pushの際、文字列ではなくオブジェクトで渡す
        this.$router.push({
          name: 'users-id-profile',
          params: {id: 1},
        });
      }
    }
  }
</script>