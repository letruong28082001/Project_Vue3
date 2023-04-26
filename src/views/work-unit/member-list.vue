<template>
  <div class="card">
    <DataTable
      :value="listMember"
      paginator
      :rows="5"
      tableStyle="min-width: 30rem"
    >
      <Column field="full_name" header="Name" style="width: 20%"></Column>
      <Column field="email" header="Email" style="width: 20%"></Column>
      <Column field="mobile" header="Số điện thoại" style="width: 20%"></Column>
      <Column
        field="employee_code"
        header="Mã nhân viên"
        style="width: 20%"
      ></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { apiPath } from "@/constants/api-path";
import { axiosService } from "@/services/axios/axios";
import { defineProps, defineEmits, onMounted, ref } from "vue";
import ColumnGroup from "primevue/columngroup"; // optional
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

<style lang="scss" scoped></style>
