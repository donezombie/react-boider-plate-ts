import flatten from "flat";
import shared from "./shared.json";

const locale = {
  shared: flatten(shared, {
    delimiter: "_",
  }),
};

export default locale;
