# Operator 사용해보기

## Creation Operators

- `rxjs` 패키지에서 가져와 사용
- of, from, range, fromEvent, timeout, interval 등

## Pipable Operators

- `rxjs/operators` 패키지에서 가져와 사용
- Observable 의 데이터를 pure function으로 가공한다.
- `pipe()` 함수에 하나 이상을 넣어 연결한다.

```ts
import { range } from "rxjs";
import { filter } from "rxjs/operators";

const observable$ = range(1, 10);

const observer = {
  next: (...args) => {
    console.log("next : ", ...args);
  },
  error: (err) => {
    console.error("error : ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

observable$
  .pipe(
    filter((v) => {
      return v % 2 === 0;
    })
  )
  .subscribe(observer);
```

`pipe()`에는 하나 이상의 `operator`들이 쉽표로 구분되어 들어갈 수 있다.

```ts
// map 추가해보기
map(x => x \* x)
```

### 시간에 의한 발행물에 적용해보기

```ts
import { interval } from "rxjs";
import { tap, filter, map } from "rxjs/operators";

const observable$ = interval(1000);

const observer = {
  next: (...args) => {
    console.log("next : ", ...args);
  },
  error: (err) => {
    console.error("error : ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

observable$
  .pipe(
    tap((...args) => {
      console.log("tap : ", ...args);
    }),
    filter((x) => {
      return x % 2 === 0;
    }),
    map((x) => {
      return x * x;
    })
  )
  .subscribe(observer);
```

### 이벤트에 의한 발행물에 적용해보기

```ts
import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

const observer = {
  next: (...args) => {
    console.log("next : ", ...args);
  },
  error: (err) => {
    console.error("error : ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

const observable$ = fromEvent(document, "click");

observable$
  .pipe(
    map((event: MouseEvent) => {
      return {
        x: event.x,
        y: event.y,
      };
    })
  )
  .subscribe(observer);
```

> [RxJS Operators 공식 문서](https://rxjs-dev.firebaseapp.com/guide/operators)
