import { from } from "rxjs";
import { last } from "rxjs/operators";

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

const observable$ = from([666, 2, 3, 4, 5, 1]);
observable$.pipe(last()).subscribe(observer);

observable$
  .pipe(
    last((v) => {
      return 4 < v;
    })
  )
  .subscribe(observer);

/**

next :  1
complete
next :  5
complete
*/
