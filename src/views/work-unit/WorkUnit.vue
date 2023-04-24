<template>
  <div class="container-page">
    <div class="common-content">
      <header-page></header-page>
      <div class="sub-common-content">
        <sidebar-page @toggle-menu="ToggleMenu"></sidebar-page>
        <div class="work-unit">
          <h1>{{ $t("titleWorkUnit.unitManagement") }}</h1>
          <div
            class="card"
            style="
              width: 85%;
              display: flex;
              justify-content: center;
              text-align: center;
              margin: 0 auto;
              margin-top: 30px;
            "
          >
            <TreeTable :value="dataUnit" class="table">
              <Column
                field="organization_unit_name"
                :header="`${$t('titleWorkUnit.titleTable.unitName')}`"
                expander
              ></Column>
              <Column
                field="organization_unit_code"
                :header="`${$t('titleWorkUnit.titleTable.unitcode')}`"
              ></Column>
              <Column
                field="address"
                :header="`${$t('titleWorkUnit.titleTable.unitAddress')}`"
              ></Column>
            </TreeTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderPage from "@/components/header/HeaderPage.vue";
import SidebarPage from "@/components/nav/SideBar.vue";
import { createApp, onMounted, ref } from "vue";
import { axiosService } from "@/services/axios/axios";
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import WorkUnit from "@/helpers/work-unit";
const app = createApp({});
const is_expandeds = ref(false);

function ToggleMenu(is_expanded: boolean) {
  is_expandeds.value = is_expanded;
}

app.component("HeaderPage", HeaderPage);
app.component("SidebarPage", SidebarPage);
const dataUnit = ref([]);
const token = localStorage.getItem("token");

function handleWorkUnit(units: WorkUnit[]): any {
  return units.map((unit: WorkUnit) => {
    if (unit.children) {
      return {
        data: {
          ...unit,
        },
        children: handleWorkUnit(unit.children),
      };
    }
    return {
      data: {
        ...unit,
      },
    };
  });
}
const fetchUnit = () => {
  axiosService
    .get("/organization-units", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dataUnit.value = handleWorkUnit(res.data.response.data);
    });
};

onMounted(() => {
  fetchUnit();
});
</script>

<style lang="scss" scoped>
.work-unit {
  width: 100%;
  margin: 100px auto;
  text-align: center;
}
.table {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  th {
    background-color: #4ade80;
    color: black;
  }
}
table {
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
}
</style>
