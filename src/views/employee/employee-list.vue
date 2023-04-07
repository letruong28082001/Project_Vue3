<template>
  <main class="employee-list-page">
    <h1>DA NANG-OUTSOURCES (UIT DEPT)</h1>
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText v-model="searchValue" placeholder="Tìm kiếm..." />
    </span>
    <div class="employee-list">
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
      </div>
      <div class="employee">
        <img src="../../assets/imgs/user.jpg" alt="" />
        <div class="employee-info">
          <h2>Lê Trường</h2>
          <p>02-07-2001</p>
          <p>UIT DEPT</p>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";

const searchValue = ref();
</script>
<style lang="scss" scoped>
.employee-list-page {
  margin-top: 60px;
  background-color: #9e9e9e24;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
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
  // .employee {
  //   width: 200px;
  //   height: 300px;
  //   background-color: aliceblue;
  //   box-shadow: 2px 1px 8px 5px #0096881c;
  //   img {
  //     width: 200px;
  //   }
  // }
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
        height: 200px;
      }
      .employee-info {
        margin-top: 30px;
        padding-bottom: 30px;
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
</style>
