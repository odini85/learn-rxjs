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
