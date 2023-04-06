<template>
  <div class="sidebar" :class="`${is_toggle && 'is-toggle'}`">
    <div class="logo">
      <img src="../../assets/imgs/logo.png" alt="" />
    </div>
    <div class="menu-toggle-wrap">
      <div class="menu-toggle" @click="toggleMenu">
        <span class="material-symbols-outlined"> arrow_forward_ios </span>
      </div>
    </div>
    <div class="menu">
      <router-link class="button" to="/">
        <span class="material-symbols-outlined">Person</span>
        <span class="text">Thành viên</span>
      </router-link>
      <router-link class="button" to="/">
        <span class="material-symbols-outlined"> apartment </span>
        <span class="text">Đơn vị công tác</span>
      </router-link>
      <router-link class="button" to="/">
        <span class="material-symbols-outlined"> picture_in_picture_alt </span>
        <span class="text">Vị trí công việc</span>
      </router-link>
      <router-link class="button" to="/">
        <span class="material-symbols-outlined"> group </span>
        <span class="text">Danh sách nhân viên</span>
      </router-link>
      <router-link class="button" to="/">
        <span class="material-symbols-outlined"> upload_file </span>
        <span class="text">Tải lên nhân viên</span>
      </router-link>
      <router-link class="button" to="/">
        <span class="material-symbols-outlined">Home</span>
        <span class="text">Nhà cung cấp</span>
      </router-link>
      <router-link class="button" to="/">
        <span class="material-symbols-outlined"> logout </span>
        <span class="text">Logout</span>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const is_toggle = ref(false);
const toggleMenu = () => {
  is_toggle.value = !is_toggle.value;
};
</script>
<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  background-color: #28303b;
  color: var(--light);
  transition: 0.2s ease-out;
  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;
    float: right;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-symbols-outlined {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }
      &:hover {
        .material-symbols-outlined {
          color: var(--primary);
          transform: translateX(0.5rem);
          cursor: pointer;
        }
      }
    }
  }

  &.is-toggle {
    width: var(--sidebar-width);
    .menu-toggle-wrap {
      top: -3rem;
      .menu-toggle {
        transform: rotate(-180deg);
      }
    }
    .menu {
      .button {
        color: var(--light);
        .text {
          display: block;
          margin-left: 30px;
          color: var(--light);
          align-items: center;
        }
      }
    }
  }
  .menu {
    .button {
      display: flex;
      padding: 20px 0;
      align-items: center;
      .text {
        display: none;
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}
</style>
