# Observable 만들기

## Observable은 lazy하다.

- 누군가 subscribe해야 publish 시작한다.
- 각 subscriber에게 따로 발행한다.

```ts
import { of, interval, fromEvent } from "rxjs";

const obs1$ = of("a", "b", "c");
const obs2$ = interval(1000);
const obs3$ = fromEvent(document, "click");

setTimeout((_) => {
  console.log("of 구독 시작");
  obs1$.subscribe((item) => console.log(item));
}, 5000);

setTimeout((_) => {
  console.log("interval 구독 시작");
  obs2$.subscribe((item) => console.log(item));
}, 10000);

setTimeout((_) => {
  console.log("fromEvent 구독 시작");
  obs3$.subscribe((_) => console.log("click!"));
}, 15000);

setTimeout((_) => {
  console.log("interval 구독 시작 2");
  obs2$.subscribe((item) => console.log(item));
}, 20000);
```

## 배열에 의한 스트림

```ts
import { of, from, range, generate } from "rxjs";

const obs1$ = of(1, 2, 3, 4, 5);
const obs2$ = from([6, 7, 8, 9, 10]);
const obs3$ = range(11, 5);
const obs4$ = generate(
  15,
  (x) => x < 30,
  (x) => x + 2
);

obs1$.subscribe((item) => console.log(`of: ${item}`));
obs2$.subscribe((item) => console.log(`from: ${item}`));
obs3$.subscribe((item) => console.log(`range: ${item}`));
obs4$.subscribe((item) => console.log(`generate: ${item}`));
```

## 시간에 의한 스트림

```ts
import { interval, timer } from "rxjs";

const obs1$ = interval(1000);
const obs2$ = timer(3000);

obs1$.subscribe((item) => console.log(`interval: ${item}`));
obs2$.subscribe((item) => console.log(`timer: ${item}`));
```

## 이벤트에 의한 스트림

```ts
import { fromEvent } from "rxjs";

function main() {
  const input = document.createElement("input");
  input.id = "myInput";
  document.body.append(input);

  const obs1$ = fromEvent(document, "click");
  const obs2$ = fromEvent(document.getElementById("myInput"), "keypress");

  obs1$.subscribe((item) => {
    console.log("document click! :", item);
  });
  obs2$.subscribe((item) => {
    console.log("input keypress", item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});
```

## ajax를 통한 스트림

```ts
import { ajax } from "rxjs/ajax";

const obs$ = ajax("https://jsonplaceholder.typicode.com/todos/1");

obs$.subscribe((result) => console.log(result.response));
```

## 사용자 정의 스트림

```ts
import { Observable } from "rxjs";

const obs$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next("a");
  subscriber.next(3);

  // 값을 다 발행한 뒤에는 compelte를 실행하여 메모리 해제
  subscriber.complete();
});

obs$.subscribe((item) => {
  console.log("custom subscribe :", item);
});
```
