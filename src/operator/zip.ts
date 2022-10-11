import { from, interval, fromEvent, zip } from "rxjs";
import { pluck } from "rxjs/operators";

const observable1$ = from([1, 2, 3, 4, 5]);
const observable2$ = from(["a", "b", "c", "d", "e"]);
const observable3$ = from([true, false, "F", [6, 7, 8], { name: "zip" }]);

zip(observable1$, observable2$).subscribe((value) => {
  console.log("zip(ob1$, ob2$) next :", value);
});

/**
zip(ob1$, ob2$) next : (2) [1, 'a']
zip(ob1$, ob2$) next : (2) [2, 'b']
zip(ob1$, ob2$) next : (2) [3, 'c']
zip(ob1$, ob2$) next : (2) [4, 'd']
zip(ob1$, ob2$) next : (2) [5, 'e']
*/

const observable4$ = interval(1000);
const observable5$ = fromEvent(document, "click").pipe(pluck("x"));

zip(observable4$, observable5$).subscribe((value) => {
  console.log("zip(ob4$, ob5$) next :", value);
});

/**
// 클릭시 즉시 발행되지 않으며 인터벌 간격으로 발행됨(큐에 쌓임)

zip(ob4$, ob5$) next : (2) [0, 193]
zip(ob4$, ob5$) next : (2) [1, 131]
zip(ob4$, ob5$) next : (2) [2, 67]
zip(ob4$, ob5$) next : (2) [3, 65]
zip(ob4$, ob5$) next : (2) [4, 207]
*/
