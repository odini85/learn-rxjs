import { range, interval, fromEvent } from "rxjs";
import { skipLast, map } from "rxjs/operators";

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

range(1, 7).pipe(skipLast(5)).subscribe(observer("skipLast"));

/**
skipLast next :  1
skipLast next :  2
skipLast complete : 
*/

interval(100).pipe(skipLast(5)).subscribe(observer("interval + skipLast"));

/**
//  끝나지 않기 때무넹 끝에서 5개 스킵 불가
interval + skipLast next :  0
interval + skipLast next :  1
interval + skipLast next :  2
*/

fromEvent(document, "click")
  .pipe(
    skipLast(5),
    map((e: MouseEvent) => e.x)
  )
  .subscribe(observer("fromEvent + skipLast"));

/**
// 마지막 5개를 무시한다.
fromEvent + skipLast next :  3
fromEvent + skipLast next :  3
fromEvent + skipLast next :  3
fromEvent + skipLast next :  3
fromEvent + skipLast next :  266
*/
