import { Timeout } from "react-number-format/types/types";

class Timer {
  timer: Timeout | number | null;

  constructor() {
    this.timer = null;
  }

  debounce(func: (arg: any) => void, time: number) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(func, time);
  }
}

export default Timer;
