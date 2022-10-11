# Operator 연산자 종류 - Transformation

- map, pluck, toArray, scan, zip

### [map](https://rxjs-dev.firebaseapp.com/api/operators/operator)

소스 Observable에서 내보낸 각 값을 인잘 전달한 함수에서 리턴하는 결과값의 Observable로 내보낸다.

```ts
import { from } from "rxjs";
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

const observable$ = from([
  { value: 1, id: 0 },
  { value: 2, id: 1 },
  { value: 1, id: 3 },
  { value: 0, id: 4 },
]);
observable$
  .pipe(
    map((v) => {
      return {
        ...v,
        value: v.value * 2,
      };
    })
  )
  .subscribe(observer);

/**

next :  {value: 2, id: 0}
next :  {value: 4, id: 1}
next :  {value: 2, id: 3}
next :  {value: 0, id: 4}
complete
*/
```

### [pluck](https://rxjs-dev.firebaseapp.com/api/operators/pluck)

```ts
// @deprecated — map 및 optional chain 사용, v8에서 제거예정
// 아래 코드는
pluck("foo", "bar");

// 아래 코드처럼 처리가능
map((x) => x?.foo?.bar);

import { from } from "rxjs";
import { pluck } from "rxjs/operators";

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
  { name: "apple", price: 1200, info: { category: "fruit" } },
  { name: "carrot", price: 800, info: { category: "vegetable" } },
  { name: "pork", price: 5000, info: { category: "meet" } },
  { name: "milk", price: 2400, info: { category: "drink" } },
]);
observable$.pipe(pluck("price")).subscribe(observer);

/**

next :  1200
next :  800
next :  5000
next :  2400
complete
*/
```

```ts

```

### [toArray](https://rxjs-dev.firebaseapp.com/api/operators/toArray)

모든 소스 방출을 수집하고 소스가 완료되면 어레이로 방출한다.

```ts
import { range } from "rxjs";
import { toArray, filter } from "rxjs/operators";

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

range(1, 50)
  .pipe(
    filter((x) => x % 3 === 0),
    filter((x) => x % 2 === 1),
    toArray()
  )
  .subscribe(observer);

/**
next : [3, 9, 15, 21, 27, 33, 39, 45]
complete
*/
```

### [scan](https://rxjs-dev.firebaseapp.com/api/operators/scan)

상태를 캡슐화하고 관리하는 데 유용하다<br />

시드 값(두 번째 인수) 또는 소스의 첫 번째 값을 통해 초기 값 설정 후,<br />
소스의 각 값에 누산기(또는 "리듀서 함수")를 적용한다.

- reduce
  - 결과만 발행
- scan
  - 과정을 모두 발행

```ts
import { of } from "rxjs";
import { reduce, scan } from "rxjs/operators";

const observable$ = of(1, 2, 3, 4, 5);

observable$
  .pipe(
    reduce((acc, x) => {
      return acc + x;
    }, 0)
  )
  .subscribe((value) => {
    console.log("reduce next : ", value);
  });

/**
reduce next :  15
*/

observable$
  .pipe(
    scan((acc, x) => {
      return acc + x;
    }, 0)
  )
  .subscribe((value) => {
    console.log("scan next : ", value);
  });

/**
scan next :  1
scan next :  3
scan next :  6
scan next :  10
scan next :  15
*/
```

### [zip](https://rxjs-dev.firebaseapp.com/api/index/function/zip)

여러 Observable을 결합하여 각 입력 Observable의 값에서 순서대로 값이 계산되는 Observable을 만든다.

```ts
import { from, interval, fromEvent, zip } from "rxjs";
import { pluck } from "rxjs/operators";

const observable1$ = from([1, 2, 3, 4, 5]);
const observable2$ = from(["a", "b", "c", "d", "e"]);
const observable3$ = from([true, false, "F", [6, 7, 8], { name: "zip" }]);

zip(observable1$, observable2$).subscribe((value) => {
  console.log("zip(ob1$, ob2$) next :", value);
});

/**
zip(ob1$, ob2$) next : (2) [1, 'a']
zip(ob1$, ob2$) next : (2) [2, 'b']
zip(ob1$, ob2$) next : (2) [3, 'c']
zip(ob1$, ob2$) next : (2) [4, 'd']
zip(ob1$, ob2$) next : (2) [5, 'e']
*/

const observable4$ = interval(1000);
const observable5$ = fromEvent(document, "click").pipe(pluck("x"));

zip(observable4$, observable5$).subscribe((value) => {
  console.log("zip(ob4$, ob5$) next :", value);
});

/**
// 클릭시 즉시 발행되지 않으며 인터벌 간격으로 발행됨(큐에 쌓임)

zip(ob4$, ob5$) next : (2) [0, 193]
zip(ob4$, ob5$) next : (2) [1, 131]
zip(ob4$, ob5$) next : (2) [2, 67]
zip(ob4$, ob5$) next : (2) [3, 65]
zip(ob4$, ob5$) next : (2) [4, 207]
*/
```
