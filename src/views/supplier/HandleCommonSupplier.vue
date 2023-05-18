<template lang="">
  <form @submit.prevent="handleAddUpdateMethodSupplier" action="">
    <div class="input-first input flex flex-column gap-2">
      <div>
        <label class="lb-required" for="username">{{
          $t("listSupplier.name")
        }}</label>
      </div>
      <InputText v-model="valueInput.name" aria-describedby="username-help" />
      <span class="error">
        {{ v$.name.$errors[0]?.$message }}
      </span>
    </div>

    <div class="input flex flex-column gap-2">
      <div>
        <label class="lb-required" for="username">{{
          $t("listSupplier.items")
        }}</label>
      </div>
      <InputText v-model="valueInput.items" aria-describedby="username-help" />
      <span class="error">
        {{ v$.items.$errors[0]?.$message }}
      </span>
    </div>
    <div class="input flex flex-column gap-2">
      <div>
        <label class="lb-required" for="username">{{
          $t("listSupplier.address")
        }}</label>
      </div>
      <InputText
        v-model="valueInput.address"
        aria-describedby="username-help"
      />
      <span class="error">
        {{ v$.address.$errors[0]?.$message }}
      </span>
    </div>
    <div class="input flex flex-column gap-2">
      <div>
        <label class="lb-required" for="username">{{
          $t("listSupplier.contact")
        }}</label>
      </div>
      <InputText
        v-model="valueInput.contact"
        aria-describedby="username-help"
      />
      <span class="error">
        {{ v$.contact.$errors[0]?.$message }}
      </span>
    </div>
    <div class="input flex flex-column gap-2">
      <div>
        <label class="lb-required" for="username">{{
          $t("listSupplier.priority")
        }}</label>
      </div>
      <InputText
        v-model="valueInput.priority"
        id="username"
        aria-describedby="username-help"
      />
      <span class="error">
        {{ v$.priority.$errors[0]?.$message }}
      </span>
    </div>
    <div class="input flex flex-column gap-2">
      <div>
        <label class="lb-required" for="username">{{
          $t("listSupplier.description")
        }}</label>
      </div>
      <InputText
        v-model="valueInput.description"
        id="username"
        aria-describedby="username-help"
      />
      <span class="error">
        {{ v$.description.$errors[0]?.$message }}
      </span>
    </div>
    <div class="btn">
      <Button
        :loading="loadingWaitApi"
        type="submit"
        :label="$t('addJobContent.saveBtn')"
      />
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
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { axiosService } from "@/services/axios/axios";
import { apiPath } from "@/constants/api-path";
import { validateNoEmoji } from "@/helpers/validateRegex";
import { useI18n } from "vue-i18n";
import { Supplier } from "@/models/supplier";
import { maxLength, required, helpers, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const loadingWaitApi = ref(false);
const { t } = useI18n();
const emit = defineEmits(["valAddUpdate"]);
const props = defineProps(["addUpdateForm", "type", "idSupplier"]);
const validateForm = computed(() => {
  return {
    name: {
      required,
      maxLength: maxLength(255),
      emoji: helpers.withMessage(t("validateEmoji"), validateNoEmoji),
    },
    items: {
      required,
      maxLength: maxLength(500),
      emoji: helpers.withMessage(t("validateEmoji"), validateNoEmoji),
    },
    address: {
      required,
      maxLength: maxLength(500),
      emoji: helpers.withMessage(t("validateEmoji"), validateNoEmoji),
    },
    contact: {
      required,
      maxLength: maxLength(500),
      emoji: helpers.withMessage(t("validateEmoji"), validateNoEmoji),
    },
    priority: {
      required,
      numeric,
      maxLength: maxLength(100),
      emoji: helpers.withMessage(t("validateEmoji"), validateNoEmoji),
    },
    description: {
      required,
      maxLength: maxLength(255),
      emoji: helpers.withMessage(t("validateEmoji"), validateNoEmoji),
    },
  };
});

const valueInput: Supplier = reactive({
  name: "",
  items: "",
  address: "",
  contact: "",
  priority: 0,
  description: "",
  ...props.addUpdateForm,
});

const v$ = useVuelidate(validateForm, valueInput);

const handleAddUpdateMethodSupplier = async () => {
  const result = await v$.value.$validate();
  if (result) {
    const data = JSON.stringify({
      name: valueInput.name,
      items: valueInput.items,
      address: valueInput.address,
      contact: valueInput.contact,
      priority: valueInput.priority,
      description: valueInput.description,
    });
    if (props.type === "add") {
      loadingWaitApi.value = true;
      axiosService.post(apiPath.apiAddSupplier, data).then((res) => {
        emit("valAddUpdate", false);
        loadingWaitApi.value = false;
      });
    } else {
      loadingWaitApi.value = true;
      axiosService
        .patch(apiPath.apiAddSupplier + "/" + props.idSupplier, data)
        .then((res) => {
          emit("valAddUpdate", false);
          loadingWaitApi.value = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.p-component * {
  input {
    width: 100%;
  }
  button {
    width: 25%;
  }
}
.p-component * {
  width: 100%;
}

.p-inputtext {
  height: 30px;
  margin: 5px 0;
}
.input-first {
  margin-top: 15px;
}
.error {
  font-size: 14px;
  color: red;
  font-weight: 700;
}
.lb-required::after {
  content: " *";
  font-size: 14px;
  color: red;
  font-weight: 700;
}
</style>
