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
```

```ts

```

### [toArray]()

ㅇ

```ts

```

### [scan]()

ㅇ

```ts

```

### [zip]()

ㅇ

```ts

```
