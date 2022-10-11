import { range, interval, fromEvent } from "rxjs";
import { takeWhile, takeLast, filter, map } from "rxjs/operators";

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

range(1, 20)
  .pipe(takeWhile((x) => x <= 10))
  .subscribe(observer("takeWhile"));

/**
takeWhile next :  1
takeWhile next :  2
takeWhile next :  3
takeWhile next :  4
takeWhile next :  5
takeWhile next :  6
takeWhile next :  7
takeWhile next :  8
takeWhile next :  9
takeWhile next :  10
takeWhile complete : 
*/

interval(1000)
  .pipe(takeWhile((x) => x < 5))
  .subscribe(observer("interval + takeWhile"));

/**
interval + takeWhile next :  0
interval + takeWhile next :  1
interval + takeWhile next :  2
interval + takeWhile next :  3
interval + takeWhile next :  4
interval + takeWhile complete : 
*/

fromEvent(document, "click")
  .pipe(
    map((event: MouseEvent) => {
      return event.x;
    }),
    takeWhile((x) => x < 200)
  )
  .subscribe(observer("fromEvent + takeWhile + map"));

/**
// event.x 가 200 보다 큰 경우 
interval + takeWhile next :  0
interval + takeWhile next :  1
interval + takeWhile next :  2
 */
