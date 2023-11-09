import { toString } from "lodash";
import moment from "moment";

export const momentInstance = moment;

export const sleepTime = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
};

export const isDefine = (value: any) => !!toString(value);
