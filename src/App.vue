<template lang="">
  <div class="container">
    <!-- <header-page></header-page> -->
    <sidebar-page></sidebar-page>
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import HeaderPage from "./components/header/HeaderPage.vue";
import SidebarPage from "./components/nav/SideBar.vue";
import { createApp } from "vue";

const app = createApp({});

app.component("HeaderPage", HeaderPage);
app.component("SidebarPage", SidebarPage);
</script>
<style lang="scss">
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

body {
  background-color: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.container {
  display: flex;
  main {
    padding: 2rem;
    flex: 1 1 0;
    @media (max-width: 768px) {
      padding-left: 6rem;
    }
  }
}
</style>
