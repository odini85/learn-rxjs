import { range, interval, fromEvent } from "rxjs";
import { skipWhile, map } from "rxjs/operators";

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

range(1, 7)
  .pipe(
    skipWhile((x) => {
      return x < 5;
    })
  )
  .subscribe(observer("skipWhile"));

/**
 skipWhile next :  5
 skipWhile next :  6
 skipWhile next :  7
 skipWhile complete : 
 */

interval(100)
  .pipe(
    skipWhile((x) => {
      return x < 5;
    })
  )
  .subscribe(observer("interval + skipWhile"));

/**
interval + skipWhile next :  5
interval + skipWhile next :  6
interval + skipWhile next :  7
interval + skipWhile next :  8
*/

fromEvent(document, "click")
  .pipe(
    map((e: MouseEvent) => e.x),
    skipWhile((x) => x < 200)
  )
  .subscribe(observer("fromEvent + map + skipWhile"));

/**
// skipWhile 조건과 다른 시점 부터 방출
// 건너뛰기 조건은 1회성
interval + skipWhile next :  5
interval + skipWhile next :  6
interval + skipWhile next :  7
interval + skipWhile next :  8
*/
