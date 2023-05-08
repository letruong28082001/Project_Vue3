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
              @click="total = true"
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
              :value="members"
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
                      v-model="value1"
                      :placeholder="$t('searchJob.search')"
                    />
                  </span>
                </template>
                <template #body="">
                  <div class="action card flex justify-content-center">
                    <Button
                      @click="toggleBtn()"
                      type="button"
                      class="list-members"
                      icon="pi pi-users"
                      rounded
                    />
                    <Button
                      type="button"
                      class="update-members"
                      icon="pi pi-file-edit"
                      rounded
                    />
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    header="Danh sách nhân viên theo vị trí"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
  >
    <DataTable :value="total" :row="1">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
    <p>Không có nhân viên nào.</p>
  </Dialog>
  <Dialog
    v-model:visible="total"
    modal
    :header="`${$t('addJobContent.title')}`"
    class="dialog"
    :style="{ width: '40vw' }"
    :breakpoints="{ '960px': '70vw', '641px': '100vw' }"
  >
    <div class="input flex flex-column gap-2">
      <div>
        <label for="username">{{ $t("addJobContent.codeJob") }}</label>
        <span> *</span>
      </div>
      <InputText
        v-model="valueInputAdd.job_position_code"
        aria-describedby="username-help"
      />

      <span
        class="error"
        v-for="error in v$.job_position_code.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>
    </div>

    <div class="input flex flex-column gap-2">
      <div>
        <label for="username">{{ $t("addJobContent.nameJob") }}</label
        ><span> *</span>
      </div>
      <InputText
        v-model="valueInputAdd.job_position_name"
        aria-describedby="username-help"
      />
      <span
        class="error"
        v-for="error in v$.job_position_name.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="input flex flex-column gap-2">
      <div>
        <label for="username">{{ $t("addJobContent.nameOther") }}</label
        ><span> *</span>
      </div>
      <InputText
        v-model="valueInputAdd.job_position_category"
        aria-describedby="username-help"
      />
      <span
        class="error"
        v-for="error in v$.job_position_category.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="input flex flex-column gap-2">
      <div>
        <label for="username">{{ $t("addJobContent.typeJob") }}</label
        ><span> *</span>
      </div>
      <InputText
        v-model="valueInputAdd.job_position_other_name"
        aria-describedby="username-help"
      />
      <span
        class="error"
        v-for="error in v$.job_position_other_name.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="input flex flex-column gap-2">
      <div>
        <label for="username">{{ $t("addJobContent.belongUnit") }}</label
        ><span> *</span>
      </div>
      <tree-select
        v-model="valueInputAdd.organization_unit_id"
        :options="unitID"
        placeholder="Select Item"
        class="md:w-20rem w-full"
      />
      <span
        class="error"
        v-for="error in v$.organization_unit_id.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="input flex flex-column gap-2">
      <div>
        <label for="username">{{ $t("addJobContent.description") }}</label>
        <span> *</span>
      </div>
      <InputText
        id="username"
        v-model="valueInputAdd.description"
        aria-describedby="username-help"
      />
      <span
        class="error"
        v-for="error in v$.description.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="btn">
      <Button @click="addJob()" label="Lưu" rounded />
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import { computed, createApp, reactive, ref } from "vue";
import HeaderPage from "@/components/header/HeaderPage.vue";
import SidebarPage from "@/components/nav/SideBar.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { axiosService } from "@/services/axios/axios";
import { apiPath } from "@/constants/api-path";
import WorkUnit from "@/models/work-unit";
import TreeSelect from "primevue/treeselect";
import { maxLength, required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const app = createApp({});
app.component("HeaderPage", HeaderPage);
app.component("SidebarPage", SidebarPage);

const members = ref([]);
const page = ref();
const total = ref(false);
const visible = ref(false);
const value1 = ref("");
const unitID = ref(null);
const valueInputAdd = reactive({
  job_position_code: "",
  job_position_name: "",
  job_position_category: "",
  job_position_other_name: "",
  organization_unit_id: "",
  description: "",
});

const regexpUnicodeModified =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
const validateNoEmoji = (value: any) => !regexpUnicodeModified.test(value);

const validateForm = computed(() => {
  return {
    job_position_code: {
      required,
      maxLength: maxLength(100),
      emoji: helpers.withMessage("This field cannot be emoji", validateNoEmoji),
    },
    job_position_name: {
      required,
      maxLength: maxLength(100),
      emoji: helpers.withMessage("This field cannot be emoji", validateNoEmoji),
    },
    job_position_category: {
      required,
      maxLength: maxLength(100),
      emoji: helpers.withMessage("This field cannot be emoji", validateNoEmoji),
    },
    job_position_other_name: {
      required,
      maxLength: maxLength(100),
      emoji: helpers.withMessage("This field cannot be emoji", validateNoEmoji),
    },
    organization_unit_id: { required },
    description: {
      required,
      maxLength: maxLength(100),
      emoji: helpers.withMessage("This field cannot be emoji", validateNoEmoji),
    },
  };
});
const v$ = useVuelidate(validateForm, valueInputAdd);

function handleWorkUnit(units: WorkUnit[]): WorkUnit[] {
  return units.map((unit: WorkUnit): WorkUnit => {
    if (unit.children) {
      return {
        key: unit.organization_unit_id,
        label: unit.organization.organization_unit_name,
        data: {
          ...unit,
        },
        children: handleWorkUnit(unit.children),
      };
    }
    return {
      key: unit.organization_unit_id,
      label: unit.organization.organization_unit_name,
      data: {
        ...unit,
      },
    };
  });
}

axiosService.get(apiPath.apiJobPosition + "?page=1&limit=100").then((res) => {
  members.value = res.data.response.data;
  unitID.value = handleWorkUnit(res.data.response.data);
});

function toggleBtn() {
  visible.value = !visible.value;
}
const result = v$.value.$validate();
function addJob() {
  axiosService
    .post(apiPath.apiJobPosition, {
      ...valueInputAdd,
      organization_unit_id: Object.keys(valueInputAdd.organization_unit_id)[0],
    })
    .then((res) => {
      window.location.reload();
    });
}
// if (!result) {
//   console.log(1);
// } else {
//   addJob();
// }
</script>
<style lang="scss" scoped>
.job-position {
  width: 100%;
  padding: 100px 0;
  text-align: center;
  background-color: #d2d8de54;
  .btn-container-add-job {
    display: flex;
    justify-content: end;
    padding-right: 10%;
    margin-bottom: -30px;
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
    width: 80%;
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
  padding: 10px 0 0 0;
  input {
    height: 35px;
    margin-top: 5px;
  }
}
.btn {
  padding: 15px 0 0 0;
  display: flex;
  justify-content: center;
  Button {
    width: 25%;
    padding: 10px 0;
    margin: 0;
  }
}
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
</style>
