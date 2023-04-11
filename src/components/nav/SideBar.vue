<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logo">
      <img src="../../assets/imgs/user.jpg" alt="Vue" />
      <h1>HRM</h1>
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-symbols-outlined"
          >keyboard_double_arrow_right</span
        >
      </button>
    </div>

    <div class="menu">
      <router-link class="button btn1" to="/Employees">
        <span class="material-symbols-outlined">Person</span>
        <span class="text">Employees</span>
      </router-link>
      <router-link class="button" to="/">
        <span class="material-symbols-outlined"> apartment </span>
        <span class="text">Work unit</span>
      </router-link>
      <router-link class="button" to="/">
        <span class="material-symbols-outlined"> picture_in_picture_alt </span>
        <span class="text">Job position</span>
      </router-link>
      <router-link class="button" to="/">
        <span class="material-symbols-outlined"> group </span>
        <span class="text">Employees list</span>
      </router-link>
      <router-link class="button" to="/">
        <span class="material-symbols-outlined"> upload_file </span>
        <span class="text">Upload employee</span>
      </router-link>
      <router-link class="button" to="/">
        <span class="material-symbols-outlined">Home</span>
        <span class="text">Supplier</span>
      </router-link>
      <router-link class="button" to="/">
        <span class="material-symbols-outlined"> logout </span>
        <span class="text">Logout</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
const is_expanded: Ref = ref(localStorage.getItem("is_expanded") === "true");
const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value);
};
</script>

<style lang="scss" scoped>
aside {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  transition: 0.2s ease-in-out;

  .logo {
    display: flex;
    margin-bottom: 1rem;
    img {
      width: 2rem;
      margin-right: 20px;
    }
    h1 {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }
  }
  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;
    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-symbols-outlined {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-symbols-outlined {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  .menu {
    margin: 0 -1rem;
    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;
      .material-symbols-outlined {
        font-size: 1.5rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      &:hover {
        background-color: var(--dark-alt);
        .material-symbols-outlined,
        .text {
          color: var(--primary);
        }
      }
      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);
        .material-symbols-outlined,
        .text {
          color: var(--primary);
        }
      }
    }
  }
  &.is-expanded {
    width: var(--sidebar-width);
    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }
    .button .text {
      opacity: 1;
    }
    .button {
      .material-symbols-outlined {
        margin-right: 1rem;
      }
    }
  }
}
</style>
