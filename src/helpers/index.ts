import { List } from "interfaces";

export const convertToFormSelect = (
  list: List<any> | any = [],
  fieldForLabel: string | number | undefined = undefined,
  fieldForValue: string | number | undefined = undefined,
  noneOption: boolean | undefined = false,
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
