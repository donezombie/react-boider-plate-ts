import { toString } from "lodash";
import moment from "moment";
import { PERMISSION_ENUM } from "@/consts/common";

export const momentInstance = moment;

export const sleepTime = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
};

export const isDefine = (value: any) => !!toString(value);

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const convertToFormSelect = (
  list: any[],
  fieldForLabel: string | number | undefined = undefined,
  fieldForValue: string | number | undefined = undefined,
  noneOption: boolean | undefined = false
) => {
  if (!fieldForLabel || !fieldForValue) {
    return [
      ...list.reduce((arr: any, el: any) => {
        return [...arr, { label: el, value: el }];
      }, []),
    ];
  }
  if (typeof list === "object" && list) {
    const listReturn = [
      ...list.reduce((arr: any, el: any) => {
        return [
          ...arr,
          {
            ...el,
            label: el[fieldForLabel] ?? "None",
            value: el[fieldForValue] ?? "",
          },
        ];
      }, []),
    ];

    if (noneOption) {
      return [{ label: "None", value: "" }, ...listReturn];
    }
    return listReturn;
  }
  return [{ label: "None", value: "" }, ...list];
};

export const getNameRole = (role: string) => {
  let result = "";

  Object.entries(PERMISSION_ENUM).forEach((el) => {
    const [key, value] = el;
    if (role === value) {
      result = key;
    }
  });

  return result;
};

export const isPromise = (value: any) => {
  return Boolean(value && typeof value.then === "function");
};
