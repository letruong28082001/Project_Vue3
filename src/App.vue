<template lang="">
  <div class="container">
    <router-view></router-view>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>
<script setup lang="ts">
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
</script>

<style lang="scss" scoped></style>
