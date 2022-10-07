import { of } from "rxjs";
import { count } from "rxjs/operators";

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

const observable$ = of(1, 2, 3, 4, 5);
observable$.pipe(count()).subscribe(observer);
