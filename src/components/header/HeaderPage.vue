<template>
  <div id="header">
    <div class="sub-header">
      <Dropdown
        v-model="selectedLanguage"
        :options="listLanguage"
        option-label="name"
        placeholder="Select a Language"
        class="w-full md:w-14rem"
        style="display: flex; width: 100%"
      >
        <template #value="languages">
          <div
            v-if="languages.value"
            class="flex align-items-center"
            style="display: flex"
          >
            <div>{{ languages.value.name }}</div>
            <img
              :alt="languages.value.optionLabel"
              :src="languages.value.img"
              :class="`mr-2 flag flag-${languages.value.code.toLowerCase()}`"
              style="width: 18px; height: 20px; border-radius: 0"
            />
          </div>
          <span v-else>
            {{ languages.placeholder }}
          </span>
        </template>
        <template #option="languages">
          <div
            class="flex align-items-center"
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <div>{{ languages.option.name }}</div>
            <img
              :alt="languages.option.optionLabel"
              :src="languages.option.img"
              :class="`mr-2 flag flag-${languages.option.code.toLowerCase()}`"
              style="width: 18px; display: flex"
            />
          </div>
        </template>
      </Dropdown>
      <img src="../../assets/imgs/user.jpg" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Dropdown from "primevue/dropdown";
import { ref, watch } from "vue";
import { listLanguage } from "@/constants/ListLanguage";
import { useI18n } from "vue-i18n";
const t = useI18n();
const selectedLanguage = ref({
  name: listLanguage[0].name,
  code: listLanguage[0].code,
  img: listLanguage[0].img,
});
watch(selectedLanguage, () => {
  t.locale.value = selectedLanguage.value.code.toLowerCase();
});
</script>
<style lang="scss" scoped>
#header {
  background-color: white;
  height: 60px;
  width: 100% !important;
  box-shadow: 1px 1px 9px #2cefdd6b;
  display: flex;
  text-align: end;
  justify-content: flex-end;
  align-items: center;
  padding-right: 50px;
  position: fixed;
  z-index: 99;
  top: 0;
  padding-right: 100px;
  right: 0;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  .sub-header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .p-inputswitch .p-inputswitch-slider {
    box-shadow: none;
  }
  .icon-notification {
    font-size: 30px;
  }
  i,
  .p-inputswitch,
  img {
    margin-left: 20px;
  }
}
</style>
