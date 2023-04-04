<template lang="">
  <div class="container">
    <app-login></app-login>
  </div>
</template>
<script>
import Login from "../src/views/auth/LoginPage.vue";
export default {
  name: "App",
  components: {
    appLogin: Login,
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  h1 {
    font-size: 28px;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>
