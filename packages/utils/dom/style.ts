import { debugWarn } from "../error";
import { isNumber, isString, isStringNumber } from "../is";

export function addUnit(value?: string | number, defaultUnit = "px") {
  if (!value) return "";
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
  debugWarn("utils/dom/style", "binding value must be a string or number");
}
