<template>
  <div id="header">
    <div class="sub-header">
      <Dropdown
        v-model="selectedLanguage"
        :options="languages"
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
// import i18n from "@/configs/i18nLanguages";
import { useI18n } from "vue-i18n";
// const t = i18n.global;
const t = useI18n();
const selectedLanguage = ref({
  name: "Vietnamese",
  code: "VN",
  img: "https://product.hstatic.net/200000122283/product/c-e1-bb-9d-vi-e1-bb-87t-nam_2c0683597d2d419fac401f51ccbae779_grande.jpg",
});
watch(selectedLanguage, () => {
  t.locale.value = selectedLanguage.value.code.toLocaleLowerCase();
});
const languages = ref([
  {
    name: "Vietnamese",
    code: "VN",
    img: "https://product.hstatic.net/200000122283/product/c-e1-bb-9d-vi-e1-bb-87t-nam_2c0683597d2d419fac401f51ccbae779_grande.jpg",
  },
  {
    name: "English",
    code: "EN",
    img: "https://vuongquocanh.com/wp-content/uploads/2018/04/la-co-vuong-quoc-anh.jpg",
  },
  {
    name: "Japan",
    code: "JA",
    img: "https://cdn.pixabay.com/photo/2013/07/13/14/15/japan-162328_1280.png",
  },
]);
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
