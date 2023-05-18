<template>
  <div class="container-page">
    <div class="common-content">
      <header-page></header-page>
      <div class="sub-common-content">
        <sidebar-page></sidebar-page>
        <main class="employee-list-page">
          <h1>{{ $t("titleHedear") }}</h1>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="searchValue"
              @input="debouncedFn"
              :placeholder="$t('searchEmployee.search')"
            />
          </span>
          <div class="employee-list">
            <!-- <div class="employee">
              <img src="../../assets/imgs/user.jpg" alt="" />
              <div class="employee-info">
                <h2>Lê Trường</h2>
                <p>02-07-2001</p>
                <p>UIT DEPT</p>
              </div>
            </div>
            <div class="employee">
              <img src="../../assets/imgs/user.jpg" alt="" />
              <div class="employee-info">
                <h2>Lê Trường</h2>
                <p>02-07-2001</p>
                <p>UIT DEPT</p>
              </div>
            </div>
            <div class="employee">
              <img src="../../assets/imgs/user.jpg" alt="" />
              <div class="employee-info">
                <h2>Lê Trường</h2>
                <p>02-07-2001</p>
                <p>UIT DEPT</p>
              </div>
            </div>
            <div class="employee">
              <img src="../../assets/imgs/user.jpg" alt="" />
              <div class="employee-info">
                <h2>Lê Trường</h2>
                <p>02-07-2001</p>
                <p>UIT DEPT</p>
              </div>
            </div>
            <div class="employee">
              <img src="../../assets/imgs/user.jpg" alt="" />
              <div class="employee-info">
                <h2>Lê Trường</h2>
                <p>02-07-2001</p>
                <p>UIT DEPT</p>
              </div>
            </div>
            <div class="employee">
              <img src="../../assets/imgs/user.jpg" alt="" />
              <div class="employee-info">
                <h2>Lê Trường</h2>
                <p>02-07-2001</p>
                <p>UIT DEPT</p>
              </div>
            </div>
            <div class="employee">
              <img src="../../assets/imgs/user.jpg" alt="" />
              <div class="employee-info">
                <h2>Lê Trường</h2>
                <p>02-07-2001</p>
                <p>UIT DEPT</p>
              </div>
            </div>
            <div class="employee">
              <img src="../../assets/imgs/user.jpg" alt="" />
              <div class="employee-info">
                <h2>Lê Trường</h2>
                <p>02-07-2001</p>
                <p>UIT DEPT</p>
              </div>
            </div> -->
            <div
              class="team_item"
              v-for="employee in employees"
              :key="employee"
            >
              <div class="avt">
                <img :src="employee.image_url" :alt="employee.image_url" />
              </div>
              <div class="info">
                <p class="name">{{ employee.full_name }}</p>
                <div>
                  <p class="code">{{ employee.employee_code }}</p>
                  <p class="birthday">
                    {{ employee.birth_date }}
                  </p>
                  <p class="phone">{{ employee.mobile }}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import HeaderPage from "@/components/header/HeaderPage.vue";
import SidebarPage from "@/components/nav/SideBar.vue";
import { createApp } from "vue";
import { axiosService } from "@/services/axios/axios";
import { apiPath } from "@/constants/api-path";
import { useDebounceFn } from "@vueuse/core";
const searchValue = ref();
const app = createApp({});
app.component("HeaderPage", HeaderPage);
app.component("SidebarPage", SidebarPage);

const employees = ref({});

const debouncedFn = useDebounceFn(() => {
  AllEmployee({
    page: 1,
    limit: 100,
    keyword: searchValue.value,
  });
}, 1000);

function AllEmployee(params: { page: number; limit: number }) {
  axiosService
    .get(apiPath.apiGetEmployee, { params })
    .then((res) => {
      employees.value = res.data.response.data;
    })
    .catch((error) => {
      employees.value = [];
    });
}

onMounted(() => {
  AllEmployee({
    page: 1,
    limit: 100,
  });
});
</script>
<style lang="scss">
.sub-common-content {
  display: flex !important;
}
.employee-list-page {
  padding-top: 100px;
  background-color: #9e9e9e24;
  width: 100% !important;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 100px 0;
  padding-bottom: 30px;
  padding-left: 30px;
  text-align: center;
  background-color: #d2d8de54;
  .p-input-icon-left {
    width: 60%;
    display: flex;
    justify-content: center;
    margin: 20px auto;
  }
  .p-component {
    width: 100%;
    display: flex;
    justify-content: center;
    border-radius: 25px;
  }
  .employee-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .employee {
      width: 23%;
      background-color: aliceblue;
      box-shadow: 2px 1px 8px 5px rgba(0, 150, 136, 0.1098039216);
      margin: 7px;
      img {
        width: 100%;
      }
      .employee-info {
        margin-top: 20px;
        padding-bottom: 20px;
        p {
          margin: 10px 0;
        }
      }
    }
    @media (max-width: 1001px) {
      .employee {
        width: 31%;
      }
    }
    @media (max-width: 895px) {
      .employee {
        width: 47%;
      }
    }
    @media (max-width: 769px) {
      .employee {
        width: 100%;
      }
    }
  }
}
@media (max-width: 769px) {
  .employee-list-page {
    padding-right: 60px;
  }
}
.team_item {
  &:hover {
    .info {
      min-height: 100%;
      justify-content: center;
    }
    .action {
      opacity: 1;
    }
    .name {
      display: unset;
      overflow: unset;
    }
  }
  margin-top: 15px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  width: 22%;
  flex-wrap: wrap;
  margin-right: 2%;
  height: auto;
  margin-bottom: 30px;
  .avt {
    flex: 1;
    img {
      width: 100%;
      height: 320px;
      object-fit: cover;
      display: block;
    }
    i {
      font-size: 12rem;
      color: var(--primary-color-main);
    }
  }
  .info {
    position: absolute;
    border-radius: 10px;
    bottom: 0;
    min-height: 150px;
    transition: all 0.5s ease;
    left: 0;
    width: 100%;
    padding: 10px 20px 10px;
    flex: 1;
    display: flex;
    background-color: rgba(0, 0, 0, 0.65);
    flex-direction: column;
    color: #fff;
  }
  .name {
    margin-bottom: 10px;
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .action {
    transition: all 0.5s ease;
    position: absolute;
    // display: none;
    // visibility: hidden;
    opacity: 0;
    top: 10px;
    right: 10px;
    text-align: end;
  }
  .code,
  .birthday {
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
// *,
// *::after,
// *::before {
//   box-sizing: border-box;
//   list-style: none;
//   padding: 0;
//   margin: 0;
// }

// img {
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// }

// body {
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-family: sans-serif;
// }

// .container {
//   position: relative;
//   max-width: 1170px;
//   width: 100%;
//   margin: 0 auto;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .container .card {
//   position: relative;
//   width: 300px;
//   height: 400px;
//   box-shadow: 0 15px 15px rgba(0, 0, 0, 0.2);
//   border-radius: 15px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow: hidden;
// }
// .container .card .content {
//   position: absolute;
//   bottom: -100%;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   backdrop-filter: blur(10px);
//   box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   z-index: 10;
//   transition: bottom 0.5s;
//   transition-delay: 0.8s;
// }

// .container .card:hover .content {
//   bottom: 0;
//   transition-delay: 0s;
// }

// .container .card .content .title {
//   text-align: center;
// }

// .container .card .content .title h3 {
//   color: #fff;
//   text-transform: uppercase;
//   font-weight: 500;
//   letter-spacing: 2px;
//   font-size: 18px;
//   margin: 20px 0 15px;
//   transition: 0.5s;
//   opacity: 0;
//   transform: translateY(-20px);
//   transition-delay: 0.6s;
// }

// .container .card:hover .content .title h3 {
//   opacity: 1;
//   transform: translateY(0);
// }

// .container .card .content .title h3 span {
//   display: block;
//   font-size: 12px;
//   font-weight: 300;
//   text-transform: initial;
// }

// .container .card .content .social {
//   position: relative;
//   display: flex;
//   bottom: 10px;
// }

// .container .card .content .social li {
//   margin: 0 10px;
//   transform: translateY(40px);
//   transition: 0.5s;
//   opacity: 0;
//   transition-delay: calc(0.2s * var(--i));
// }

// .container .card:hover .content .social li {
//   transform: translateY(20px);
//   opacity: 1;
// }

// .container .card .content .social li a {
//   color: #fff;
//   font-size: 24px;
// }
</style>
