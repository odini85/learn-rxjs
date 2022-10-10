import { from } from "rxjs";
import { map } from "rxjs/operators";

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
    map((v) => {
      return {
        ...v,
        value: v.value * 2,
      };
    })
  )
  .subscribe(observer);

/**

next :  {value: 2, id: 0}
next :  {value: 4, id: 1}
next :  {value: 2, id: 3}
next :  {value: 0, id: 4}
complete
*/
