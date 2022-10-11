import { fromEvent, interval, timer } from "rxjs";
import { ajax } from "rxjs/ajax";
import { takeUntil, map, tap } from "rxjs/operators";

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

obs1$.pipe(takeUntil(obs2$)).subscribe(observer("interval + takeUntil"));
/**
// document 클릭시 완료 됨
takeUntil next :  0
takeUntil next :  1
takeUntil next :  2
takeUntil complete : 
*/

const obs3$ = fromEvent(document, "click");
const obs4$ = timer(5000);

obs3$
  .pipe(
    map((event: MouseEvent) => {
      return event.x;
    }),
    takeUntil(obs4$)
  )
  .subscribe(observer("timer + takeUntil"));
/**
// 5초 이후 완료 됨
timer + takeUntil next :  183
timer + takeUntil next :  164
timer + takeUntil next :  394
takeUntil complete : 
*/

const obs5$ = interval(50);

obs5$
  .pipe(
    takeUntil(
      ajax("https://jsonplaceholder.typicode.com/todos/1").pipe(
        map((v) => v.response),
        tap((v) => console.log("tap : ", v))
      )
    )
  )
  .subscribe(observer("ajax + takeUntil + ajax + map + tap"));

/**
ajax + takeUntil + ajax + map + tap next :  0
ajax + takeUntil + ajax + map + tap next :  1
ajax + takeUntil + ajax + map + tap next :  2
ajax + takeUntil + ajax + map + tap next :  3
ajax + takeUntil + ajax + map + tap next :  4
ajax + takeUntil + ajax + map + tap next :  5
ajax + takeUntil + ajax + map + tap next :  6
ajax + takeUntil + ajax + map + tap next :  7
ajax + takeUntil + ajax + map + tap next :  8
ajax + takeUntil + ajax + map + tap next :  9
ajax + takeUntil + ajax + map + tap next :  10
ajax + takeUntil + ajax + map + tap next :  11
tap :  {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
ajax + takeUntil + ajax + map + tap complete : 
*/
