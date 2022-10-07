import { interval, Subject } from "rxjs";

const subject = new Subject();
const obs$ = interval(1000);

obs$.subscribe(subject);

subject.subscribe((x) => {
  console.log("ob+sub 바로구독: " + x);
});

setTimeout((_) => {
  subject.subscribe((x) => {
    console.log("ob+sub 3초 후 구독: " + x);
  });
}, 3000);

setTimeout((_) => {
  subject.subscribe((x) => {
    console.log("ob+sub 5초 후 구독: " + x);
  });
}, 5000);

setTimeout((_) => {
  subject.subscribe((x) => {
    console.log("ob+sub 10초 후 구독: " + x);
  });
}, 10000);
