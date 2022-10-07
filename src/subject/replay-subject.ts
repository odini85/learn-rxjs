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
