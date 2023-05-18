<template lang="">
  <div class="supplier-container">
    <div class="common-content">
      <header-page></header-page>
      <div class="sub-common-content">
        <sidebar-page></sidebar-page>
        <div class="supplier-content">
          <h1>{{ $t("listSupplier.title") }}</h1>
          <div class="btn-add-supplier">
            <Button
              @click="handleAddUpdateSupplier"
              class="btn_add-supplier"
              :label="`${$t('listSupplier.addBtn')}`"
              icon="pi pi-plus"
              iconPos="right"
              rounded
            />
          </div>
          <div class="show-supplier">
            <DataTable
              :value="suppliers"
              paginator
              :rows="5"
              :rowsPerPageOptions="[5, 10, 15]"
              tableStyle="min-width: 50rem"
            >
              <Column
                field="name"
                :header="`${$t('listSupplier.name')}`"
                style="width: 20%"
              ></Column>
              <Column
                field="items"
                :header="`${$t('listSupplier.items')}`"
                style="width: 20%"
              ></Column>
              <Column
                field="address"
                :header="`${$t('listSupplier.address')}`"
                style="width: 20%"
              ></Column>
              <Column
                field="contact"
                :header="`${$t('listSupplier.contact')}`"
                style="width: 20%"
              ></Column>
              <Column headerStyle="width: 50rem">
                <template #header>
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText
                      class="inputSearch"
                      v-model="valueSearch"
                      @input="debouncedFn"
                      :placeholder="$t('searchJob.search')"
                    />
                  </span>
                </template>

                <template #body="slotProps">
                  <div class="action card flex justify-content-center">
                    <Button
                      @click="openUpdateForm(slotProps)"
                      type="button"
                      class="update-supplier"
                      icon="pi pi-file-edit"
                      rounded
                    />
                    <Button
                      @click="() => confirmDelete(slotProps)"
                      type="button"
                      class="delete-supplier"
                      icon="pi pi-trash"
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
    v-model:visible="valOpenClose"
    modal
    :header="$t('listSupplier.info')"
    class="dialog"
    :style="{ width: '40vw' }"
    :breakpoints="{ '960px': '70vw', '641px': '100vw' }"
  >
    <handle-common-supplier
      @valAddUpdate="toggleDialogAddUpdate"
      :addUpdateForm="valueInputAddUpdate"
      :type="type"
      :idSupplier="idSupplier"
    ></handle-common-supplier>
  </Dialog>
</template>
<script setup lang="ts">
import { createApp, reactive, ref, onMounted } from "vue";
import HeaderPage from "@/components/header/HeaderPage.vue";
import SidebarPage from "@/components/nav/SideBar.vue";
import HandleCommonSupplier from "@/views/supplier/HandleCommonSupplier.vue";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ConfirmDialog from "primevue/confirmdialog";
import { axiosService } from "@/services/axios/axios";
import { apiPath } from "@/constants/api-path";
import { useConfirm } from "primevue/useconfirm";
import LoadTable from "@/components/Loading/LoadTable.vue";
import store from "@/store/index";
import { useDebounceFn } from "@vueuse/core";
import { Supplier } from "@/models/supplier";

const confirm = useConfirm();
const app = createApp({});
app.component("HeaderPage", HeaderPage);
app.component("SidebarPage", SidebarPage);
const visible = ref(false);

const valOpenClose = ref(false);
const suppliers = ref([]);
const valueSearch = ref("");
const type = ref("add");
const data = ref({});
const valueInputAddUpdate: Supplier = reactive({
  name: "",
  items: "",
  address: "",
  contact: "",
  priority: 0,
  description: "",
});

const confirmDelete = (id: any) => {
  confirm.require({
    message: "Do you want to delete this record?",
    header: "Delete Confirmation",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: () => {
      deleteSupplier(id);
    },
  });
};

const debouncedFn = useDebounceFn(() => {
  getDataSupplier({
    page: 1,
    limit: 100,
    keyword: valueSearch.value,
  });
}, 1000);

function handleAddUpdateSupplier() {
  valOpenClose.value = !valOpenClose.value;
  valueInputAddUpdate.name = "";
  valueInputAddUpdate.items = "";
  valueInputAddUpdate.address = "";
  valueInputAddUpdate.contact = "";
  valueInputAddUpdate.priority = 0;
  valueInputAddUpdate.description = "";
  type.value = "add";
}
function getDataSupplier(params: {
  page: number;
  limit: number;
  keyword?: string;
}) {
  store.dispatch("setLoading", true);
  axiosService
    .get(apiPath.apiSupplier, {
      params,
    })
    .then((res) => {
      suppliers.value = res.data.response.data;
      store.dispatch("setLoading", false);
    })

    .catch((error) => {
      suppliers.value = [];
    });
}

onMounted(() => {
  getDataSupplier({ page: 1, limit: 100 });
});

function deleteSupplier(id: object) {
  axiosService
    .post(apiPath.apiDeleteSupplier, {
      ids: [id.data.distributor_id],
    })
    .then((res) => {
      getDataSupplier({ page: 1, limit: 100 });
    });
}

function toggleBtn() {
  visible.value = !visible.value;
}

function toggleDialogAddUpdate(check: boolean) {
  valOpenClose.value = check;
  getDataSupplier({ page: 1, limit: 100 });
}

const idSupplier = ref("");
function openUpdateForm(slotProps: any) {
  idSupplier.value = slotProps.data.distributor_id;
  valOpenClose.value = true;
  type.value = "update";
  data.value = {
    ...slotProps.data,
  };
  valueInputAddUpdate.name = data.value.name;
  valueInputAddUpdate.items = data.value.items;
  valueInputAddUpdate.address = data.value.address;
  valueInputAddUpdate.contact = data.value.contact;
  valueInputAddUpdate.priority = data.value.priority;
  valueInputAddUpdate.description = data.value.description;
}

function openAddForm() {
  valOpenClose.value = true;
  type.value = "add";
  resetForm();
}

function resetForm() {
  valueInputAddUpdate.name = "";
  valueInputAddUpdate.items = "";
  valueInputAddUpdate.address = "";
  valueInputAddUpdate.contact = "";
  valueInputAddUpdate.priority = 0;
  valueInputAddUpdate.description = "";
}
</script>
<style lang="scss">
.supplier-content {
  width: 100%;
  padding: 100px 0;
  text-align: center;
  background-color: #d2d8de54;
  .inputSearch {
    border-radius: 25px;
  }
  .btn-add-supplier {
    display: flex;
    justify-content: end;
    padding-right: 5%;
    margin-bottom: -30px;
    padding-bottom: 50px;
    .btn_add-supplier {
      background-color: #1cc243;
      border: none;
    }
    .btn_add-supplier:hover {
      background-color: #1cc243;
      outline: none;
      border: none;
      overflow: hidden;
    }
  }
  .show-supplier {
    margin-top: 100px;
    width: 90%;
    background-color: #fff;
    font-family: "Arial";
    margin: 0px auto;
    border-collapse: collapse;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
  .card {
    text-align: center;
    .delete-supplier {
      background-color: rgb(232 20 20);
      margin: 0 10px;
    }
    .delete-supplier:hover {
      background-color: rgb(232 20 20);
      border: none;
      outline: none;
    }
    button {
      padding: 0 10px;
    }
  }
}
.btn {
  padding: 15px 0 0 0;
  display: flex;
  justify-content: center;
}
.loadingWaitApi {
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
