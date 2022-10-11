import { timer, interval, fromEvent } from "rxjs";
import { skipUntil, map } from "rxjs/operators";

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

const obs1$ = interval(1000);
const obs2$ = fromEvent(document, "click");

obs1$.pipe(skipUntil(obs2$)).subscribe(observer("skipUntil"));

/**
// 클릭 이벤트가 발생된 순간부터 방출
skipUntil next :  0
skipUntil next :  1
*/

const obs3$ = fromEvent(document, "click");
const obs4$ = timer(5000);

obs3$
  .pipe(
    map((e: MouseEvent) => e.x),
    skipUntil(obs4$)
  )
  .subscribe(observer("fromEvent + map + skipUntil"));

/**
// 클릭후 5초 이후 부터 클릭 스트림 방출
skipUntil next :  0
skipUntil next :  1
*/
