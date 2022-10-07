import { range } from "rxjs";
import { filter } from "rxjs/operators";

const observable$ = range(1, 10);

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
    filter((v) => {
      return v % 2 === 0;
    })
  )
  .subscribe(observer);
