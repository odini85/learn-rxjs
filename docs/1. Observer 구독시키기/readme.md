# Observer 구독자 시키기

## Observer - 구독자 만들기

```ts
import { from } from "rxjs";
const observable$ = from([1, 2, 3, 4, 5]);

const observer = {
  next: (...args) => {
    console.log("next : ", ...args);
  },
  error: (err) => {
    console.error("error : ", err);
  },
  complete: () => {
    console.log("completed : ");
  },
};

observable$.subscribe(observer);
```

## 부분적으로 지정 가능

```ts
import { from } from "rxjs";
const observable$ = from([1, 2, 3, 4, 5]);

const observer_partial1 = {
  next: (...args) => {
    console.log("partial1 next : ", ...args);
  },
  error: (err) => {
    console.error("partial1 error : ", err);
  },
};

const observer_partial2 = {
  next: (...args) => {
    console.log("partial2 next : ", ...args);
  },
};

observable$.subscribe(observer_partial1);
observable$.subscribe(observer_partial2);
```

## subscribe에 개별 인자(함수) 전달 가능

```ts
import { from } from "rxjs";
const observable$ = from([1, 2, 3, 4, 5]);

observable$.subscribe(
  // next
  (...args) => {
    console.log("next : ", ...args);
  },
  // error
  (err) => {
    console.log("error : ", err);
  },
  // complete
  () => {
    console.log("complete : ");
  }
);
```

## Error 처리

```ts
import { Observable } from "rxjs";

const obs$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  // @ts-ignore
  subscriber.next(3)(null)[0];
  subscriber.next(4);
});

obs$.subscribe(
  // next
  (...args) => {
    console.log("next : ", ...args);
  },
  // error
  (err) => {
    console.log("error : ", err);
  },
  // complete
  () => {
    console.log("complete : ");
  }
);
```

## Complete 처리

```ts
import { Observable } from "rxjs";

const obs$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  // @ts-ignore
  subscriber.next(3)(null)[0];
  subscriber.next(4);
});

obs$.subscribe(
  // next
  (...args) => {
    console.log("next : ", ...args);
  },
  // error
  (err) => {
    console.log("error : ", err);
  },
  // complete
  () => {
    console.log("complete : ");
  }
);
```

## 구독 해제

```ts
import { interval } from "rxjs";

const obs$ = interval(1000);
const subscription = obs$.subscribe((...args) => {
  console.log("next :", ...args);
});

setTimeout((_) => {
  console.log("execute unsubscribe");
  subscription.unsubscribe();
}, 3500);
```
