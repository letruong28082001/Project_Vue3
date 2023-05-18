<template>
  <aside
    :class="{ is_expanded: is_expanded }"
    @click="emit('ToggleMenu', is_expanded)"
  >
    <div class="logo">
      <img src="../../assets/images/user.jpg" alt="Vue" />
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
      <router-link class="button btn1" :to="{ name: 'Employees' }">
        <span class="material-symbols-outlined">Person</span>
        <span class="text">{{ $t("sidebar.Employee") }}</span>
      </router-link>
      <router-link class="button" :to="{ name: 'WorkUnit' }">
        <span class="material-symbols-outlined"> apartment </span>
        <span class="text">{{ $t("sidebar.WorkUnit") }}</span>
      </router-link>
      <router-link class="button" :to="{ name: 'JobPosition' }">
        <span class="material-symbols-outlined"> picture_in_picture_alt </span>
        <span class="text">{{ $t("sidebar.JobPosition") }}</span>
      </router-link>
      <router-link class="button" to="/group">
        <span class="material-symbols-outlined"> group </span>
        <span class="text">{{ $t("sidebar.EmployeesList") }}</span>
      </router-link>
      <router-link class="button" to="/upload_file">
        <span class="material-symbols-outlined"> upload_file </span>
        <span class="text">{{ $t("sidebar.UploadEmployee") }}</span>
      </router-link>
      <router-link class="button" :to="{ name: 'Supplier' }">
        <span class="material-symbols-outlined">Home</span>
        <span class="text">{{ $t("sidebar.Supplier") }}</span>
      </router-link>
      <router-link class="button" @click="logout" to="/">
        <span class="material-symbols-outlined"> logout </span>
        <span class="text">{{ $t("sidebar.Logout") }}</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Ref, ref, defineEmits, onMounted } from "vue";
const emit = defineEmits(["ToggleMenu"]);
const is_expanded: Ref = ref(localStorage.getItem("is_expanded") === "true");
const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", JSON.stringify(is_expanded.value));
};

const logout = () => {
  alert("Bạn chắc chắn muốn thoát ?");
  window.localStorage.clear();
};

onMounted(() => {
  emit("ToggleMenu", is_expanded.value);
});
</script>

<style lang="scss" scoped>
#root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}
aside {
  width: 300px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  background-color: #1e293b;
  color: #f1f5f9;
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
      border: none;
      background: none;
      .material-symbols-outlined {
        font-size: 2rem;
        color: #f1f5f9;
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-symbols-outlined {
          color: #4ade80;
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
        color: #f1f5f9;
        transition: 0.2s ease-in-out;
      }
      .text {
        color: #f1f5f9;
        transition: 0.2s ease-in-out;
      }
      &:hover {
        background-color: #334155;
        .material-symbols-outlined,
        .text {
          color: #4ade80;
        }
      }
      &.router-link-exact-active {
        background-color: #334155;
        border-right: 5px solid #4ade80;
        .material-symbols-outlined,
        .text {
          color: #4ade80;
        }
      }
    }
  }
  &.is_expanded {
    width: 300px;
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
