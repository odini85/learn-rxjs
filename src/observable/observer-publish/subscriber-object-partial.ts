import { from } from "rxjs";
const observable$ = from([1, 2, 3, 4, 5]);

const observer_partial1 = {
  next: (...args) => {
    console.log("partial1 next : ", ...args);
  },
  error: (err) => {
    console.error("partial1 error : ", err);
  },
};

const observer_partial2 = {
  next: (...args) => {
    console.log("partial2 next : ", ...args);
  },
};

observable$.subscribe(observer_partial1);
observable$.subscribe(observer_partial2);
