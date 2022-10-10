# Operator 연산자 종류 - 배열 연산자

- count, max, min, reduce, first, last, elementAt, distinct, filter, tap

## 수학관련 연산자

- count, max, min, reduce

### [count](https://rxjs-dev.firebaseapp.com/api/operators/count)

소스의 방출 수를 계산하고 complete 되면 계산된 숫자를 발행한다.

```ts
import { of } from "rxjs";
import { count } from "rxjs/operators";

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

const observable$ = of(1, 2, 3, 4, 5);
observable$.pipe(count()).subscribe(observer);
```

### [max](https://rxjs-dev.firebaseapp.com/api/operators/max)

숫자(또는 제공된 함수와 비교할 수 있는 항목)를 내보내는 observable에서 작동한다.

complete되면 가장 큰 값을 발행한다.

```ts
import { of } from "rxjs";
import { max } from "rxjs/operators";

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

const observable$ = of(1, 2, 3, 4, 100, 5, 0, 9);
observable$.pipe(max()).subscribe(observer);
```

### [min](https://rxjs-dev.firebaseapp.com/api/operators/min)

숫자(또는 제공된 함수와 비교할 수 있는 항목)를 내보내는 observable에서 작동한다.

complete되면 가장 작은 값을 발행한다.

```ts
import { of } from "rxjs";
import { min } from "rxjs/operators";

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

const observable$ = of(1, 2, 3, 4, 100, 5, 0, 9);
observable$.pipe(min()).subscribe(observer);
```

### [reduce](https://rxjs-dev.firebaseapp.com/api/operators/reduce)

소스 Observable에 누산기 함수를 적용하고 소스가 완료되면 선택적 누적 결과를 반환한다.<br />
Array.prototype.reduce와 동일

```ts
import { of } from "rxjs";
import { reduce } from "rxjs/operators";

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

const observable$ = of(1, 2, 3, 4, 5);
observable$
  .pipe(
    reduce((acc, x) => {
      return acc + x;
    }, 0)
  )
  .subscribe(observer);
```

## 선택 관련 연산자

- first, last, elementAt, distinct, filter, tap

### [first](https://rxjs-dev.firebaseapp.com/api/operators/first)

선택 관련 연산자<br >
소스 Observable에서 내보낸 첫 번째 값(또는 일부 조건을 충족하는 첫 번째 값)만 내보낸다.

```ts
import { from } from "rxjs";
import { first } from "rxjs/operators";

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

const observable$ = from([666, 2, 3, 4, 5]);
observable$.pipe(first()).subscribe(observer);
```

### [last](https://rxjs-dev.firebaseapp.com/api/operators/last)

선택 관련 연산자<br />
소스 Observable에서 방출한 마지막 항목만 방출하는 Observable을 반환한다.<br />
조건자 함수를 옵서녈 매개변수로 전달할 수 있다.<br />
조건 함수가 전달된 경우 마지막 항목을 내보내지 않고 Observable이 조건자를 충족하는 Observable 소스에서 마지막 항목을 내보낸다.

```ts
import { from } from "rxjs";
import { last } from "rxjs/operators";

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

const observable$ = from([666, 2, 3, 4, 5, 1]);
observable$.pipe(last()).subscribe(observer);

observable$
  .pipe(
    last((v) => {
      return 4 < v;
    })
  )
  .subscribe(observer);

/**

next :  1
complete

next :  5
complete
*/
```

### [elementAt](https://rxjs-dev.firebaseapp.com/api/operators/elementAt)

선택 관련 연산자<br />
소스 Observable에서 방출 순서에 지정된 인덱스의 단일 값을 방출한다.(0 부터 시작)

```ts
import { from } from "rxjs";
import { elementAt } from "rxjs/operators";

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

const observable$ = from([666, 2, 3, 6, 5, 1]);
observable$.pipe(elementAt(3)).subscribe(observer);

/**

next :  6
complete
*/
```

### [distinct](https://rxjs-dev.firebaseapp.com/api/operators/distinct)

선택 관련 연산자<br />
소스 Observable에서 방출하는 **유니크한 모든 항목**을 방출하는 Observable을 반환한다.

```ts
import { from } from "rxjs";
import { distinct } from "rxjs/operators";

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

const observable$ = from([1, 1, "a", true, 6, "a", {}, [], [1], [1]]);
observable$.pipe(distinct()).subscribe(observer);

/**

next :  1
next :  a
next :  true
next :  6
next :  {}
next :  []
next :  [1]
next :  [1]
complete
*/
```

### [filter](https://rxjs-dev.firebaseapp.com/api/operators/filter)

선택 관련 연산자<br />
Observable 소스에서 전달된 함수에 만족하는 항목만 필터링 되어 방출된다.

```ts
import { from } from "rxjs";
import { filter } from "rxjs/operators";

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

const observable$ = from([
  { value: 1, id: 0 },
  { value: 2, id: 1 },
  { value: 1, id: 3 },
  { value: 0, id: 4 },
]);
observable$
  .pipe(
    filter((v) => {
      return v.value <= 1;
    })
  )
  .subscribe(observer);

/**

next :  {value: 1, id: 0}
next :  {value: 1, id: 3}
next :  {value: 0, id: 4}
complete
*/
```

## [tap](https://rxjs-dev.firebaseapp.com/api/operators/tap)

통과되는 모든 값마다 특정 작업을 수행한다.<br />
**발행 결과에 영향을 주지 않는다.**

```ts
import { from } from "rxjs";
import { tap, filter, distinct } from "rxjs/operators";

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

from([9, 3, 10, 5, 1, 10, 9, 9, 1, 4, 1, 8, 6, 2, 7, 2, 5, 5, 10, 2])
  .pipe(
    tap((x) => {
      console.log("-------------- 처음 탭: " + x);
    }),
    filter((x) => {
      return x % 2 === 0;
    }),
    tap((x) => {
      console.log("--------- 필터 후: " + x);
    }),
    distinct(),
    tap((x) => {
      console.log("중복 제거 후: " + x);
    })
  )
  .subscribe(observer);
/**

-------------- 처음 탭: 9
 -------------- 처음 탭: 3
 -------------- 처음 탭: 10
 --------- 필터 후: 10
 중복 제거 후: 10
 next :  10
 -------------- 처음 탭: 5
 -------------- 처음 탭: 1
 -------------- 처음 탭: 10
 --------- 필터 후: 10
 -------------- 처음 탭: 9
 -------------- 처음 탭: 9
 -------------- 처음 탭: 1
 -------------- 처음 탭: 4
 --------- 필터 후: 4
 중복 제거 후: 4
 next :  4
 -------------- 처음 탭: 1
 -------------- 처음 탭: 8
 --------- 필터 후: 8
 중복 제거 후: 8
 next :  8
 -------------- 처음 탭: 6
 --------- 필터 후: 6
 중복 제거 후: 6
 next :  6
 -------------- 처음 탭: 2
 --------- 필터 후: 2
 중복 제거 후: 2
 next :  2
 -------------- 처음 탭: 7
 -------------- 처음 탭: 2
 --------- 필터 후: 2
 -------------- 처음 탭: 5
 -------------- 처음 탭: 5
 -------------- 처음 탭: 10
 --------- 필터 후: 10
 -------------- 처음 탭: 2
 --------- 필터 후: 2
 complete
*/
```
