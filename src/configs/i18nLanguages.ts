import { createI18n } from "vue-i18n";
import en from "@/i18n/en.json";
import vn from "../i18n/vn.json";
import ja from "../i18n/ja.json";

const DEFAULT_LOCALE = "vn";

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  globalInjection: true,
  fallbackLocale: DEFAULT_LOCALE,
  silentTranslationWarn: true,
  messages: {
    en,
    vn,
    ja,
  },
});

export default i18n;
