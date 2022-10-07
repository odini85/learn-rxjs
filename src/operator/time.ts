import { interval } from "rxjs";
import { tap, filter, map } from "rxjs/operators";

const observable$ = interval(1000);

const observer = {
  next: (...args) => {
    console.log("next : ", ...args);
  },
  error: (err) => {
    console.error("error : ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

observable$
  .pipe(
    tap((...args) => {
      console.log("tap : ", ...args);
    }),
    filter((x) => {
      return x % 2 === 0;
    }),
    map((x) => {
      return x * x;
    })
  )
  .subscribe(observer);
