import { BehaviorSubject } from "rxjs";

const subject = new BehaviorSubject(0); // 초기값이 있음

console.log("behavior A 구독 시작");
subject.subscribe((x) => {
  console.log("behavior A: " + x);
});

console.log("behavior next 1...3");
subject.next(1);
subject.next(2);
subject.next(3);

console.log("behavior B 구독 시작");
subject.subscribe((x) => {
  console.log("behavior B: " + x);
});

console.log("behavior next 4...5");
subject.next(4);
subject.next(5);

console.log("---------");
console.log("behavior 마지막 구독값 :", subject.getValue());
