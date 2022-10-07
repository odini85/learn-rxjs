import { from } from "rxjs";
import { elementAt } from "rxjs/operators";

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

const observable$ = from([666, 2, 3, 6, 5, 1]);
observable$.pipe(elementAt(3)).subscribe(observer);

/**

next :  6
complete
*/
