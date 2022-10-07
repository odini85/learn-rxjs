import { from } from "rxjs";
import { first } from "rxjs/operators";

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

const observable$ = from([666, 2, 3, 4, 5]);
observable$.pipe(first()).subscribe(observer);
