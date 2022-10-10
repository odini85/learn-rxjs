import { from } from "rxjs";
import { pluck } from "rxjs/operators";

const observer = {
  next: (...args) => {
    console.log("next : ", ...args);
  },
  error: (err) => {
    console.error("error : ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

const observable$ = from([
  { name: "apple", price: 1200, info: { category: "fruit" } },
  { name: "carrot", price: 800, info: { category: "vegetable" } },
  { name: "pork", price: 5000, info: { category: "meet" } },
  { name: "milk", price: 2400, info: { category: "drink" } },
]);
observable$.pipe(pluck("price")).subscribe(observer);

/**

next :  1200
next :  800
next :  5000
next :  2400
complete
*/
