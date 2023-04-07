<template lang="">
  <div class="container">
    <login-page></login-page>
  </div>
</template>
<script setup lang="ts">
import LoginPage from "./views/auth/LoginPage.vue";
import { createApp } from "vue";

const app = createApp({});

app.component("LoginPage", LoginPage);
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(to bottom, #c9a515, #c964e5);
  h1 {
    font-size: 28px;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>
