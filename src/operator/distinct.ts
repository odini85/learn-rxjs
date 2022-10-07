import { from } from "rxjs";
import { distinct } from "rxjs/operators";

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

const observable$ = from([1, 1, "a", true, 6, "a", {}, [], [1], [1]]);
observable$.pipe(distinct()).subscribe(observer);

/**

next :  1
next :  a
next :  true
next :  6
next :  {}
next :  []
next :  [1]
next :  [1]
complete
*/
