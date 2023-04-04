<template lang="">
  <div class="container">
    <NavPage />
    <router-view />
  </div>
</template>
<script>
import NavPage from "../src/views/nav/NavPage.vue";
export default {
  name: "App",
  components: {
    NavPage,
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  min-height: 100vh;
  h1 {
    font-size: 28px;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>
