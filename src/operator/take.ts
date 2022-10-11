import { range, interval } from "rxjs";
import { take, filter } from "rxjs/operators";

const observer = (type = "") => {
  return {
    next: (...args) => {
      console.log(`${type} next : `, ...args);
    },
    error: (err) => {
      console.error(`${type} error : `, err);
    },
    complete: () => {
      console.log(`${type} complete : `);
    },
  };
};

range(1, 20).pipe(take(5)).subscribe(observer("take"));

/**
take next :  1
take next :  2
take next :  3
take next :  4
take next :  5
complete
*/

range(1, 20)
  .pipe(
    take(5),
    filter((x) => x % 2 === 0)
  )
  .subscribe(observer("take + filter"));

/**
take + filter next :  2
take + filter next :  4
take + filter complete : 
*/

interval(1000).pipe(take(5)).subscribe(observer("take + interval"));

/**
take + interval next :  0
take + interval next :  1
take + interval next :  2
take + interval next :  3
take + interval next :  4
take + interval complete
*/
