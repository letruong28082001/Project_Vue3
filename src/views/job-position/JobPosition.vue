<template>
  <div class="container-page">
    <div class="common-content">
      <header-page></header-page>
      <div class="sub-common-content">
        <sidebar-page></sidebar-page>
        <div class="job-position">
          <h1>{{ $t("titleJobPosition.jobManagement") }}</h1>
          <div class="btn-container-add-job">
            <Button
              @click="addJob"
              class="btn_add-Job"
              :label="`${$t('addJobContent.addJob')}`"
              icon="pi pi-plus"
              iconPos="right"
              rounded
            />
          </div>
          <div class="card">
            <DataTable
              class="table"
              :page="page"
              :value="jobs"
              :rows="10"
              :paginator="true"
              :rowsPerPageOptions="[5, 10, 15]"
            >
              <Column
                field="job_position_code"
                :header="`${$t('titleJobPosition.titleTable.jobCode')}`"
                style="width: 25%"
              ></Column>
              <Column
                field="job_position_name"
                :header="`${$t('titleJobPosition.titleTable.jobName')}`"
                style="width: 25%"
              ></Column>
              <Column
                field="organization.organization_unit_name"
                :header="`${$t('titleJobPosition.titleTable.jobPosition')}`"
                style="width: 25%"
              ></Column>
              <Column
                field="job_position_category"
                :header="`${$t('titleJobPosition.titleTable.jobType')}`"
                style="width: 25%"
              ></Column>
              <Column headerStyle="width: 50rem">
                <template #header>
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText
                      class="inputSearch"
                      v-model="valueSearch"
                      :placeholder="$t('searchJob.search')"
                    />
                  </span>
                </template>

                <template #body="slotProps">
                  <div class="action card flex justify-content-center">
                    <Button
                      @click="getMembersByJobPosition(slotProps)"
                      type="button"
                      class="list-members"
                      icon="pi pi-users"
                      rounded
                    />

                    <Button
                      @click="() => openUpdateForm(slotProps)"
                      type="button"
                      class="update-members"
                      icon="pi pi-file-edit"
                      rounded
                    />
                  </div>
                </template>
              </Column>
              <template #empty>
                <div class="loadingWaitApi">
                  <LoadTable v-if="store.getters.load"></LoadTable>
                  <div
                    style="text-align: center"
                    v-if="store.getters.load === false"
                  >
                    {{ $t("teamMember.notification") }}
                  </div>
                </div>
              </template>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    :header="`${$t('listMemberTittle')}`"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
  >
    <DataTable :value="member" :paginator="member.length > 0" :rows="5">
      <Column
        field="employee_code"
        :header="`${$t('listMemberByJobPosition.code')}`"
      ></Column>
      <Column
        field="full_name"
        :header="`${$t('listMemberByJobPosition.fullName')}`"
      ></Column>
      <Column
        field="email"
        :header="`${$t('listMemberByJobPosition.email')}`"
      ></Column>
      <Column
        field="mobile"
        :header="`${$t('listMemberByJobPosition.mobile')}`"
      ></Column>
      <template #empty v-if="member.length === 0">
        <div style="text-align: center">
          {{ $t("teamMember.notification") }}
        </div>
      </template>
    </DataTable>
  </Dialog>
  <Dialog
    v-model:visible="valAddForm"
    modal
    :header="$t('addJobContent.title')"
    class="dialog"
    :style="{ width: '40vw' }"
    :breakpoints="{ '960px': '70vw', '641px': '100vw' }"
  >
    <add-job-position
      @valAddUpdate="toggleDialogAddUpdate"
      :type="type"
      :addUpdateForm="valueInputUpdate"
    />
  </Dialog>
</template>
<script setup lang="ts">
import { createApp, reactive, ref, watch, onMounted } from "vue";
import HeaderPage from "@/components/header/HeaderPage.vue";
import SidebarPage from "@/components/nav/SideBar.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import LoadTable from "@/components/Loading/LoadTable.vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { axiosService } from "@/services/axios/axios";
import { apiPath } from "@/constants/api-path";
import AddJobPosition from "@/views/job-position/AddJobPosition.vue";
import store from "@/store/index";
const app = createApp({});
app.component("HeaderPage", HeaderPage);
app.component("SidebarPage", SidebarPage);
const jobs = ref([]);
const page = ref();
const valAddForm = ref(false);
const visible = ref(false);
const valueSearch = ref("");
const JobData = ref<object>({});
const organization_unit_name = ref("");
const type = ref("add");
const member = ref([]);

function getMembersByJobPosition(id: any) {
  toggleBtn();
  axiosService
    .get(apiPath.apiMemberbyJobPosition, {
      params: {
        page: 1,
        limit: 100,
        job_position_id: id.data.job_position_id,
      },
    })
    .then((res) => {
      member.value = res.data.response.data;
    });
}

const valueInputUpdate = reactive<object>({
  job_position_id: "",
  job_position_code: "",
  job_position_name: "",
  job_position_category: "",
  job_position_other_name: "",
  organization_unit_id: "",
  description: "",
});

function toggleDialogAddUpdate(check: boolean) {
  valAddForm.value = check;
  getDataJobPosition();
}
onMounted(() => {
  getDataJobPosition();
});
function getDataJobPosition() {
  store.dispatch("setLoading", true);
  axiosService
    .get(apiPath.apiJobPosition, {
      params: {
        page: 1,
        limit: 100,
      },
    })
    .then((res) => {
      jobs.value = res.data.response.data;
      store.dispatch("setLoading", false);
    })
    .catch((error) => {
      jobs.value = [];
    });
}
watch(valueSearch, () => {
  axiosService
    .get(apiPath.apiJobPosition, {
      params: {
        page: 1,
        limit: 10,
        keyword: valueSearch.value,
      },
    })
    .then((res) => {
      jobs.value = res.data.response.data;
    })
    .catch((error) => {
      jobs.value = [];
    });
});
function toggleBtn() {
  visible.value = !visible.value;
}

const data = ref({});
function openUpdateForm(slotProps: any) {
  valAddForm.value = true;
  type.value = "update";
  JobData.value = {
    ...slotProps.data,
  };
  data.value = {
    ...slotProps.data,
  };
  valueInputUpdate.job_position_id = JobData.value.job_position_id;
  valueInputUpdate.job_position_code = JobData.value.job_position_code;
  valueInputUpdate.job_position_name = JobData.value.job_position_name;
  valueInputUpdate.job_position_category = JobData.value.job_position_category;
  valueInputUpdate.job_position_other_name =
    JobData.value.job_position_other_name;
  valueInputUpdate.description = JobData.value.description;

  valueInputUpdate.organization_unit_id =
    JobData.value.organization.organization_unit_id;
  organization_unit_name.value =
    JobData.value.organization.organization_unit_name;
}

function addJob() {
  valAddForm.value = true;
  type.value = "add";
  valueInputUpdate.job_position_id = "";
  valueInputUpdate.job_position_code = "";
  valueInputUpdate.job_position_name = "";
  valueInputUpdate.job_position_category = "";
  valueInputUpdate.job_position_other_name = "";
  valueInputUpdate.organization_unit_id = "";
  valueInputUpdate.description = "";
}
</script>
<style lang="scss" scoped>
.job-position {
  width: 100%;
  padding: 100px 0;
  text-align: center;
  background-color: #d2d8de54;
  .inputSearch {
    border-radius: 25px;
  }
  .btn-container-add-job {
    display: flex;
    justify-content: end;
    padding-right: 5%;
    margin-bottom: -30px;
    padding: 15px 5% 5px 0;
    .btn_add-Job {
      background-color: #1cc243;
      border: none;
    }
    .btn_add-Job:hover {
      background-color: #1cc243;
      outline: none;
      border: none;
      overflow: hidden;
    }
  }
  .card {
    .table {
      margin-top: 50px;
    }
    width: 90%;
    background-color: #fff;
    font-family: "Arial";
    margin: 0px auto;
    border-collapse: collapse;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    .action {
      box-shadow: none !important;
      display: flex;
      width: 100px;
      justify-content: space-between;
      Button {
        width: 95%;
        height: 95%;
        margin-left: 5px;
      }
      .list-members {
        background-color: #1cc243;
        border: none;
      }
      .update-members {
        border: none;
      }
    }
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
      padding: 0 !important;
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
.p-dialog-content {
  overflow: hidden;
}
.input {
  display: flex;
  flex-direction: column;
  padding: 5px 0 0 0;
  input {
    height: 30px;
    margin-top: 3px;
  }
}
// .btn {
//   padding: 15px 0 0 0;
//   display: flex;
//   justify-content: center;
// }
.p-dialog .p-dialog-header {
  padding-bottom: 10px !important;
}
div span {
  color: red;
  font-weight: 800;
}
.error {
  font-size: 14px;
  color: red;
  font-weight: 700;
}

.p-treeselect {
  height: 30px;
  align-items: center;
  ~ :focus {
    outline: none;
    box-shadow: none;
    border: none;
  }
}
.loadingWaitApi {
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
