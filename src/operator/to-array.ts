import { range } from "rxjs";
import { toArray, filter } from "rxjs/operators";

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

range(1, 50)
  .pipe(
    filter((x) => x % 3 === 0),
    filter((x) => x % 2 === 1),
    toArray()
  )
  .subscribe(observer);

/**
next : [3, 9, 15, 21, 27, 33, 39, 45]
complete
*/
