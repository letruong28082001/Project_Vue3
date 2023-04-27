<template>
  <div class="container-page">
    <div class="common-content">
      <header-page></header-page>
      <div class="sub-common-content">
        <sidebar-page></sidebar-page>
        <div class="job-position">
          <h1>{{ $t("titleJobPosition.jobManagement") }}</h1>
          <div class="card">
            <DataTable
              :value="members"
              paginator
              :rows="5"
              :rowsPerPageOptions="[5, 10, 20, 50]"
              tableStyle="min-width: 50rem"
            >
              <Column
                field="name"
                :header="`${$t('titleJobPosition.titleTable.jobCode')}`"
                style="width: 25%"
              ></Column>
              <Column
                field="country.name"
                :header="`${$t('titleJobPosition.titleTable.jobName')}`"
                style="width: 25%"
              ></Column>
              <Column
                field="company"
                :header="`${$t('titleJobPosition.titleTable.jobPosition')}`"
                style="width: 25%"
              ></Column>
              <Column
                field="representative.name"
                :header="`${$t('titleJobPosition.titleTable.jobType')}`"
                style="width: 25%"
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { createApp, onMounted, ref } from "vue";
import HeaderPage from "@/components/header/HeaderPage.vue";
import SidebarPage from "@/components/nav/SideBar.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
const app = createApp({});
app.component("HeaderPage", HeaderPage);
app.component("SidebarPage", SidebarPage);

const members = ref([]);
</script>
<style lang="scss" scoped>
.job-position {
  width: 100%;
  margin: 100px auto;
  text-align: center;
  .card {
    width: 80%;
    background-color: #fff;
    font-family: "Arial";
    margin: 25px auto;
    border-collapse: collapse;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    tr {
      &:hover {
        background: #f4f4f4;
        td {
          color: #555;
        }
      }
    }
    th,
    td {
      color: #999;
      border: 1px solid #eee;
      padding: 12px 35px;
      border-collapse: collapse;
    }
    th {
      background: #00cccc;
      color: #fff;
      text-transform: uppercase;
      font-size: 12px;
      &.last {
        border-right: none;
      }
    }
    .p-component,
    .p-component {
      box-sizing: border-box;
    }
  }
}
</style>
