<template lang="">
  <form @submit.prevent="addJob" action="">
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
        :options="unit_id"
        placeholder="Select item"
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
      <Button type="submit" label="Lưu" rounded />
    </div>
  </form>
</template>
<script setup lang="ts">
import {
  ref,
  computed,
  defineEmits,
  reactive,
  defineProps,
  onUnmounted,
} from "vue";
import { maxLength, required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import TreeSelect from "primevue/treeselect";
import WorkUnit from "@/models/work-unit";
import { axiosService } from "@/services/axios/axios";
import { apiPath } from "@/constants/api-path";
const emit = defineEmits(["valAdd"]);

const props = defineProps(["addForm", "type"]);

const jobs = ref([]);
const unit_id = ref(null);
const valueInputAdd: object = reactive({
  job_position_code: "",
  job_position_name: "",
  job_position_category: "",
  job_position_other_name: "",
  description: "",
  ...props.addForm,
  organization_unit_id: props?.addForm?.organization_unit_id
    ? { [props.addForm.organization_unit_id]: true }
    : "",
});
onUnmounted(() => {
  valueInputAdd.value = {
    job_position_code: "",
    job_position_name: "",
    job_position_category: "",
    job_position_other_name: "",
    organization_unit_id: "",
    description: "",
  };
});

const regexpUnicodeModified =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
const validateNoEmoji = (value: string) => !regexpUnicodeModified.test(value);

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
  return units.map((unit: WorkUnit) => {
    if (unit.children && unit.children.length > 0) {
      return {
        key: unit.organization_unit_id,
        label: unit.organization_unit_name,
        data: unit.organization_unit_id,
        children: handleWorkUnit(unit.children),
      };
    }
    return {
      key: unit.organization_unit_id,
      label: unit.organization_unit_name,
      data: unit.organization_unit_id,
    };
  });
}

function getJobData() {
  axiosService.get(apiPath.apiWorkUnit).then((res) => {
    jobs.value = res.data.response.data;
    unit_id.value = handleWorkUnit(res.data.response.data);
  });
}
getJobData();

function addJob() {
  const result = v$.value.$validate();
  if (result) {
    if (props.type === "add") {
      axiosService
        .post(apiPath.apiJobPosition, {
          ...valueInputAdd,
          organization_unit_id: Object.keys(
            valueInputAdd.organization_unit_id
          )[0],
        })
        .then((res) => {
          emit("valAdd", false);
        });
    } else {
      axiosService
        .patch(apiPath.apiJobPosition + "/" + valueInputAdd.job_position_id, {
          ...valueInputAdd,
          organization_unit_id: Object.keys(
            valueInputAdd?.organization_unit_id
          )[0],
        })
        .then((res) => {
          emit("valAdd", false);
        });
    }
  }
}
</script>
<style lang="scss" scoped>
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

.p-treeselect {
  height: 30px;
  align-items: center;
  ~ :focus {
    outline: none;
    box-shadow: none;
    border: none;
  }
}
</style>
