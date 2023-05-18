<template>
  <div class="card">
    <DataTable
      :value="listMember"
      :paginator="listMember.length > 0"
      :rows="5"
      tableStyle="min-width: 30rem"
    >
      <Column
        field="full_name"
        :header="$t('teamMember.name')"
        style="width: 20%"
      ></Column>
      <Column
        field="email"
        :header="$t('teamMember.Email')"
        style="width: 20%"
      ></Column>
      <Column
        field="mobile"
        :header="$t('teamMember.phoneNumber')"
        style="width: 20%"
      ></Column>
      <Column
        field="employee_code"
        :header="$t('teamMember.code')"
        style="width: 20%"
      ></Column>
      <template #empty v-if="listMember.length === 0">
        <div style="text-align: center">
          {{ $t("teamMember.notification") }}
        </div>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { apiPath } from "@/constants/api-path";
import { axiosService } from "@/services/axios/axios";
import { defineProps, ref } from "vue";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
const props = defineProps({
  id: String,
});
const listMember = ref([]);
axiosService
  .get(apiPath.apiWorkUnit + props.id + apiPath.apiMemberWorkUnit)
  .then((res) => {
    listMember.value = res.data.response.users;
  });
</script>

<style lang="scss" scoped>
.p-datatable .p-datatable-footer {
  background-color: #fff;
}
</style>
