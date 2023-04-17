<template>
  <div id="Header">
    <div class="sub-header">
      <i class="bi bi-bell-fill icon-notification"></i>
      <InputSwitch v-model="checked" />
      <img src="../../assets/imgs/user.jpg" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputSwitch from "primevue/inputswitch";
import { ref } from "vue";
const checked = ref();
</script>
<style lang="scss" scoped>
#Header {
  background-color: white;
  height: 60px;
  width: 100% !important;
  box-shadow: 1px 1px 9px #2cefdd6b;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 50px;
  position: fixed;
  z-index: 99;
  top: 0;
  padding-right: 100px;
  right: 0;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  .sub-header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .p-inputswitch .p-inputswitch-slider {
    box-shadow: none;
  }
  .icon-notification {
    font-size: 30px;
  }
  i,
  .p-inputswitch,
  img {
    margin-left: 20px;
  }
}
</style>
