import { from } from "rxjs";
import { filter } from "rxjs/operators";

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

const observable$ = from([
  { value: 1, id: 0 },
  { value: 2, id: 1 },
  { value: 1, id: 3 },
  { value: 0, id: 4 },
]);
observable$
  .pipe(
    filter((v) => {
      return v.value <= 1;
    })
  )
  .subscribe(observer);

/**

next :  {value: 1, id: 0}
next :  {value: 1, id: 3}
next :  {value: 0, id: 4}
complete
*/
