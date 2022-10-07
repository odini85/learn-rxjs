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
