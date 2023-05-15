<template lang="">
  <form @submit.prevent="HandleAddUpadteJob" action="">
    <div class="input flex flex-column gap-2">
      <div>
        <label class="lb-required" for="username">{{
          $t("addJobContent.codeJob")
        }}</label>
      </div>
      <InputText
        v-model="valueInputAdd.job_position_code"
        aria-describedby="username-help"
      />

      <span class="error">
        {{ v$.job_position_code.$errors[0]?.$message }}
      </span>
    </div>

    <div class="input flex flex-column gap-2">
      <div>
        <label class="lb-required" for="username">{{
          $t("addJobContent.nameJob")
        }}</label>
      </div>
      <InputText
        v-model="valueInputAdd.job_position_name"
        aria-describedby="username-help"
      />
      <span class="error">
        {{ v$.job_position_code.$errors[0]?.$message }}
      </span>
    </div>
    <div class="input flex flex-column gap-2">
      <div>
        <label class="lb-required" for="username">{{
          $t("addJobContent.nameOther")
        }}</label>
      </div>
      <InputText
        v-model="valueInputAdd.job_position_category"
        aria-describedby="username-help"
      />
      <span class="error">
        {{ v$.job_position_code.$errors[0]?.$message }}
      </span>
    </div>
    <div class="input flex flex-column gap-2">
      <div>
        <label class="lb-required" for="username">{{
          $t("addJobContent.typeJob")
        }}</label>
      </div>
      <InputText
        v-model="valueInputAdd.job_position_other_name"
        aria-describedby="username-help"
      />
      <span class="error">
        {{ v$.job_position_code.$errors[0]?.$message }}
      </span>
    </div>
    <div class="input flex flex-column gap-2">
      <div>
        <label class="lb-required" for="username">{{
          $t("addJobContent.belongUnit")
        }}</label>
      </div>
      <tree-select
        v-model="valueInputAdd.organization_unit_id"
        :options="unit_id"
        placeholder="Select item"
      />
      <span class="error">
        {{ v$.job_position_code.$errors[0]?.$message }}
      </span>
    </div>
    <div class="input flex flex-column gap-2">
      <div>
        <label class="lb-required" for="username">{{
          $t("addJobContent.description")
        }}</label>
      </div>
      <InputText
        id="username"
        v-model="valueInputAdd.description"
        aria-describedby="username-help"
      />
      <span class="error">
        {{ v$.job_position_code.$errors[0]?.$message }}
      </span>
    </div>
    <div class="btn">
      <Button type="submit" :label="$t('addJobContent.saveBtn')" rounded />
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
  onMounted,
} from "vue";
import { maxLength, required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import TreeSelect from "primevue/treeselect";
import WorkUnit from "@/models/work-unit";
import { axiosService } from "@/services/axios/axios";
import { apiPath } from "@/constants/api-path";
import { regexpUnicodeModified } from "@/constants/validate";
import { validateNoEmoji } from "@/helpers/validateRegex";
import { useI18n } from "vue-i18n";
import { jobPosition } from "@/models/reactive";
const { t } = useI18n();
const emit = defineEmits(["valAddUpdate"]);

const props = defineProps(["addUpdateForm", "type"]);

const jobs = ref([]);
const unit_id = ref(null);
const valueInputAdd: jobPosition = reactive({
  job_position_code: "",
  job_position_name: "",
  job_position_category: "",
  job_position_other_name: "",
  description: "",
  ...props.addUpdateForm,
  organization_unit_id: props?.addUpdateForm?.organization_unit_id
    ? { [props.addUpdateForm.organization_unit_id]: true }
    : "",
});
onMounted(() => {
  valueInputAdd.value = {
    job_position_code: "",
    job_position_name: "",
    job_position_category: "",
    job_position_other_name: "",
    organization_unit_id: "",
    description: "",
  };
});

const validateForm = computed(() => {
  return {
    job_position_code: {
      required,
      maxLength: maxLength(100),
      emoji: helpers.withMessage(t("validateEmoji"), validateNoEmoji),
    },
    job_position_name: {
      required,
      maxLength: maxLength(100),
      emoji: helpers.withMessage(t("validateEmoji"), validateNoEmoji),
    },
    job_position_category: {
      required,
      maxLength: maxLength(100),
      emoji: helpers.withMessage(t("validateEmoji"), validateNoEmoji),
    },
    job_position_other_name: {
      required,
      maxLength: maxLength(100),
      emoji: helpers.withMessage(t("validateEmoji"), validateNoEmoji),
    },
    organization_unit_id: { required },
    description: {
      required,
      maxLength: maxLength(100),
      emoji: helpers.withMessage(t("validateEmoji"), validateNoEmoji),
    },
  };
});
const v$ = useVuelidate(validateForm, valueInputAdd);

function handleWorkUnit(units: WorkUnit[]) {
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
onMounted(() => {
  getJobData();
});
const HandleAddUpadteJob = async () => {
  const result = await v$.value.$validate();
  if (result) {
    const data = {
      ...valueInputAdd,
      organization_unit_id: Object.keys(valueInputAdd.organization_unit_id)[0],
    };
    if (props.type === "add") {
      axiosService.post(apiPath.apiJobPosition, { ...data }).then((res) => {
        emit("valAddUpdate", false);
      });
    } else {
      axiosService
        .patch(apiPath.apiJobPosition + "/" + valueInputAdd.job_position_id, {
          ...data,
        })
        .then((res) => {
          emit("valAddUpdate", false);
        });
    }
  }
};
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
.lb-required::after {
  content: " *";
  font-size: 14px;
  color: red;
  font-weight: 700;
}
</style>
