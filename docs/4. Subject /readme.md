# Subject

```ts
import { Subject } from "rxjs";
const subject = new Subject();

subject.subscribe(console.log);

subject.next(1);
subject.next(3);
subject.next(5);
```

## Observable과의 차이점

### Observable

- 누군가 구독을 해야 발행을 시작
- 각 구독자에게 따로 발행
  - `각 구독자별 개별적인 값 전달`
- unicast
  - 고유 주소로 식별된 하나의 네트워크 목적지에 1:1로 트래픽 또는 메시지를 전송하는 방식을 말한다
- 🧊 cold 발행
- Netflix
  - 원하는 영상을 구독자가 선택하면 선택된 영상을 해당 구독자에게 송출

### Subject

- 개발자가 원하는 때에 발행
- 모든 구독자에게 똑같이 발행
  - `모든 구독자에게 동일한 값 전달`
- multicast
  - 한 번의 송신으로 메시지나 정보를 목표한 여러 컴퓨터에 동시에 전송하는 것을 말한다.
- 🔥 hot 발행
- TV채널
  - 모든 구독자에게 영상을 한번에 송출

## Subject 기본 예시

```ts
import { Subject } from "rxjs";
const subject = new Subject();

console.log("5초 후 부터 시작");
setTimeout((_) => {
  let x = 0;
  console.log("발행은 2초 후 부터 인터벌 시작");
  setInterval((_) => {
    subject.next(x++);
  }, 2000);
}, 5000);

subject.subscribe((x) => {
  console.log("바로구독: " + x);
});

setTimeout((_) => {
  subject.subscribe((x) => {
    console.log("3초 후 구독: " + x);
  });
}, 3000);

setTimeout((_) => {
  subject.subscribe((x) => {
    console.log("10초 후 구독: " + x);
  });
}, 10000);

setTimeout((_) => {
  subject.subscribe((x) => {
    console.log("14초 후 구독: " + x);
  });
}, 14000);
```

## interval을 이용한 구독 예시(아래 결합과 비교를 위함)

```ts
import { interval } from "rxjs";

const obs$ = interval(1000);

obs$.subscribe((x) => {
  console.log("interval 바로구독: " + x);
});

setTimeout((_) => {
  obs$.subscribe((x) => {
    console.log("interval 3초 후 구독: " + x);
  });
}, 3000);

setTimeout((_) => {
  obs$.subscribe((x) => {
    console.log("interval 5초 후 구독: " + x);
  });
}, 5000);

setTimeout((_) => {
  obs$.subscribe((x) => {
    console.log("interval 10초 후 구독: " + x);
  });
}, 10000);
```

## 일반 Observable 과 결합하기

Subject를 Observable에 subscriber로 넘겨줄 수 있다.

```ts
const { interval, Subject } = rxjs;

const subject = new Subject();
const obs$ = interval(1000);

obs$.subscribe(subject);

subject.subscribe((x) => console.log("바로구독: " + x));
setTimeout((_) => {
  subject.subscribe((x) => console.log("3초 후 구독: " + x));
}, 3000);
setTimeout((_) => {
  subject.subscribe((x) => console.log("5초 후 구독: " + x));
}, 5000);
setTimeout((_) => {
  subject.subscribe((x) => console.log("10초 후 구독: " + x));
}, 10000);
```

## BehaviorSubject

마지막 값을 저장 후 추가 구독자에게 발행

```ts
import { BehaviorSubject } from "rxjs";

const subject = new BehaviorSubject(0); // 초기값이 있음

console.log("A 구독 시작");
subject.subscribe((x) => {
  console.log("A: " + x);
});

console.log("next 1...3");
subject.next(1);
subject.next(2);
subject.next(3);

console.log("B 구독 시작");
subject.subscribe((x) => {
  console.log("B: " + x);
});

console.log("next 4...5");
subject.next(4);
subject.next(5);

/**

behavior A 구독 시작
behavior A: 0
behavior next 1...3
behavior A: 1
behavior A: 2
behavior A: 3
behavior B 구독 시작
behavior B: 3
behavior next 4...5
behavior A: 4
behavior B: 4
behavior A: 5
behavior B: 5

*/
```

### 마지막 발행 값 가져오기

```ts
console.log("마지막 구독값 출력", subject.getValue());
```

## ReplaySubject

마지막 N개 값을 저장하고 있다가 추가 구독자 발생하면 저장되어 있던 N개를 발행 하고,

이후에는 1개씩 발행

```ts
import { ReplaySubject } from "rxjs";

const subject = new ReplaySubject(3); // 마지막 3개 값 저장

console.log("replay A 구독 시작");
subject.subscribe((x) => {
  console.log("replay A: " + x);
});

console.log("replay next 1...5");
subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);
subject.next(5);

console.log("replay B 구독 시작");
subject.subscribe((x) => {
  console.log("replay B: " + x);
});

console.log("replay next 6...7");
subject.next(6);
subject.next(7);

/**
 
  behavior 마지막 구독값 : 5
  replay A 구독 시작
  replay next 1...5
  replay A: 1
  replay A: 2
  replay A: 3
  replay A: 4
  replay A: 5
  replay B 구독 시작
  replay B: 3
  replay B: 4
  replay B: 5
  replay next 6...7
  replay A: 6
  replay B: 6
  replay A: 7
  replay B: 7

*/
```
