# Operator 연산자 종류 - take, skip 관련

- take, takeLast, takeWhile, takeUntil, skip, skipLast,skipWhile, skipUntil

### [take](https://rxjs-dev.firebaseapp.com/api/operators/take)

앞에서부터 N개 선택

```ts
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
```

### [takeLast](https://rxjs-dev.firebaseapp.com/api/operators/takeLast)

뒤에서부터 N개 선택

```ts
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
```

### [takeWhile](https://rxjs-dev.firebaseapp.com/api/operators/takeWhile)

~하는동안 선택

```ts
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
// event.x 가 200 보다 큰 경우만 방출
interval + takeWhile next :  0
interval + takeWhile next :  1
interval + takeWhile next :  2
*/
```

### [takeUntil](https://rxjs-dev.firebaseapp.com/api/operators/takeUntil)

기준이 되는 스트림이 발행하기까지

```ts
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

/**m
// 응답을 받을때까지
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
```

### [skip]()

앞에서부터 N개 건너뛰기

```ts
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
```

### [skipLast]()

뒤에서부터 N개 건너뛰기

```ts
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
```

### [skipWhile]()

~하는동안 건너뛰기

```ts
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
```

### [skipUntil]()

기준이 되는 스트림이 발행하고부터

```ts
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
```
