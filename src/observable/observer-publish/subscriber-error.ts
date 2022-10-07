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
