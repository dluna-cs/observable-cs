export interface Observer {
  next(vale: any): void;
  error(err: any): void;
  complete(): void;
}

export interface Subscription {
  unsubscribe(): void;
}

export type ProducerFunction = (observer: Observer) => () => void | void;

export class Observable {
  producerFn: ProducerFunction;
  constructor (producerFn: ProducerFunction) {
    this.producerFn = producerFn;
  }

  subscribe(observer: Observer): Subscription {
    const noop = () => {};
    const outerObserver = observer;
    let completed = false;
    let errored = false;
    const sunsubscribeFunction = this.producerFn({
      next: (value) => {
        if (!completed && !errored) {
          outerObserver.next(value);
        }
      },
      error: (err) => {
        if (!completed && !errored) {
          outerObserver.error(err);
        }
      },
      complete: () => {
        if (!completed && !errored) {
          outerObserver.complete();
        }
      }
    });
    return { unsubscribe: sunsubscribeFunction || noop };
  }
}



