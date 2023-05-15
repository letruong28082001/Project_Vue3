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
              <Column headerStyle="width: 10rem">
                <template #body="slotProps">
                  <div class="action card flex justify-content-center">
                    <Button
                      @click="() => getListMember(slotProps)"
                      type="button"
                      icon="pi pi-users"
                      rounded
                    />
                  </div>
                </template>
              </Column>
            </TreeTable>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    header="Danh sách nhân viên"
    :style="{ width: '70vw' }"
    ><list-member :id="organization_unit_id" />
  </Dialog>
</template>

<script setup lang="ts">
import HeaderPage from "@/components/header/HeaderPage.vue";
import SidebarPage from "@/components/nav/SideBar.vue";
import { createApp, onMounted, ref } from "vue";
import { axiosService } from "@/services/axios/axios";
import TreeTable from "primevue/treetable";
import WorkUnit from "@/models/work-unit";
import { apiPath } from "@/constants/api-path";
import Button from "primevue/button";
import ListMember from "@/views/work-unit/member-list.vue";
import Dialog from "primevue/dialog";
import Column from "primevue/column";
const app = createApp({});
const organization_unit_id = ref("");
const is_expandeds = ref(false);
const dataUnit = ref([]);
const visible = ref(false);

function ToggleMenu(is_expanded: boolean) {
  is_expandeds.value = is_expanded;
}

app.component("HeaderPage", HeaderPage);
app.component("SidebarPage", SidebarPage);

function handleWorkUnit(units: WorkUnit[]): WorkUnit[] {
  return units.map((unit: WorkUnit): WorkUnit => {
    if (unit.children) {
      return {
        key: unit.organization_unit_id,
        data: {
          ...unit,
        },
        children: handleWorkUnit(unit.children),
      };
    }
    return {
      key: unit.organization_unit_id,
      data: {
        ...unit,
      },
    };
  });
}
const fetchUnit = () => {
  axiosService.get(apiPath.apiWorkUnit).then((res) => {
    dataUnit.value = handleWorkUnit(res.data.response.data);
  });
};
function getListMember(listMember: []) {
  visible.value = true;
  organization_unit_id.value = listMember.node.data.organization_unit_id;
}
onMounted(() => {
  fetchUnit();
});
</script>

<style lang="scss" scoped>
.work-unit {
  width: 100%;
  padding: 100px 0;
  text-align: center;
  background-color: #d2d8de54;
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
  .p-component,
  .p-component {
    box-sizing: border-box;
  }
  .pi-users::before {
    font-size: 2.5rem;
    content: "\e941";
  }
  .action {
    display: flex;
    justify-content: center;
    Button {
      border: none;
    }
  }
}
</style>
