import { range, interval, fromEvent } from "rxjs";
import { skip, map } from "rxjs/operators";

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

range(1, 7).pipe(skip(5)).subscribe(observer("skip"));

/**
skip next :  6
skip next :  7
skip complete : 
 */

interval(100).pipe(skip(5)).subscribe(observer("interval + skip"));

/**
// 종료되지 않는다
interval + skip next :  5
interval + skip next :  6
interval + skip next :  7
interval + skip next :  8
*/

fromEvent(document, "click")
  .pipe(
    skip(5),
    map((e: MouseEvent) => e.x)
  )
  .subscribe(observer("fromEvent + skip"));

/**
// 6번째 부터 방출
interval + skip next :  5
interval + skip next :  6
interval + skip next :  7
interval + skip next :  8
*/
