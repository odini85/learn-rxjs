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
