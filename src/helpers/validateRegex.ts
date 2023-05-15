import { regexpUnicodeModified } from "@/constants/validate";
export const validateNoEmoji = (value: string) =>
  !regexpUnicodeModified.test(value);
