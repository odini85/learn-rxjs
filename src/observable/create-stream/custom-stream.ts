import { Observable } from "rxjs";

const obs$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next("a");
  subscriber.next(3);

  // 값을 다 발행한 뒤에는 compelte를 실행하여 메모리 해제
  subscriber.complete();
});

obs$.subscribe((item) => {
  console.log("custom subscribe :", item);
});
