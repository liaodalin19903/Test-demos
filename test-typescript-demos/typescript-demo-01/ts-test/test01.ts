// 0.用于定义发布者
import { Observable } from "rxjs";

// 4.触发后这个函数的参数是观察者的一个包装，
//   它与观察者并不等价
const onSubscribe = (observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
};

// 1.这里创建一个发布者，它存在一个onSubscribe函数与
//   观察者产生联系
const source$ = new Observable(onSubscribe);

// 2.创建一个观察者，有一个next属性用于接收传过来的值
const theObserver = {
  next: (item) => console.log(item),
};

// 3.通过subscribe函数将发布者和观察者联系起来，此时发
//   布者中的onSubscribe函数会被触发
source$.subscribe(theObserver);

// 继续执行


