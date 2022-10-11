import { range, interval } from "rxjs";
import { takeLast, filter } from "rxjs/operators";

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

range(1, 20).pipe(takeLast(5)).subscribe(observer("takeLast"));

/**

takeLast next :  16
takeLast next :  17
takeLast next :  18
takeLast next :  19
takeLast next :  20
takeLast complete : 
*/

range(1, 20)
  .pipe(
    takeLast(5),
    filter((x) => x % 2 === 0)
  )
  .subscribe(observer("takeLast + filter"));

/**
takeLast + filter next :  16
takeLast + filter next :  18
takeLast + filter next :  20
takeLast + filter complete : 
*/

interval(1000).pipe(takeLast(5)).subscribe(observer("takeLast + interval"));

/**
끝나지 않음
*/
