import { of } from "rxjs";
import { reduce, scan } from "rxjs/operators";

const observable$ = of(1, 2, 3, 4, 5);

observable$
  .pipe(
    reduce((acc, x) => {
      return acc + x;
    }, 0)
  )
  .subscribe((value) => {
    console.log("reduce next : ", value);
  });

/**
reduce next :  15
*/

observable$
  .pipe(
    scan((acc, x) => {
      return acc + x;
    }, 0)
  )
  .subscribe((value) => {
    console.log("scan next : ", value);
  });

/**
scan next :  1
scan next :  3
scan next :  6
scan next :  10
scan next :  15
*/
