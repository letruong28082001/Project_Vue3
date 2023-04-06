<template>
  <div id="Header">
    <Breadcrumb :home="home" :model="items" class="nav-bar" />
  </div>
</template>
<script lang="ts" setup>
import Breadcrumb from "primevue/breadcrumb";
import { MenuItem } from "primevue/menuitem";
import { ref } from "vue";
const home = ref();
const items: MenuItem[] = [
  {
    label: "Category A",
  },
  {
    label: "Category B",
  },
  {
    label: "Category C",
  },
];
</script>
<style lang="scss" scoped></style>
