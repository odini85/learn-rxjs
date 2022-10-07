import { of } from "rxjs";
import { min } from "rxjs/operators";

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

const observable$ = of(1, 2, 3, 4, 100, 5, 0, 9);
observable$.pipe(min()).subscribe(observer);
