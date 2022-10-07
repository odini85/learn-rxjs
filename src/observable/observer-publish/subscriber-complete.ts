import { Observable } from "rxjs";

const obs$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
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
