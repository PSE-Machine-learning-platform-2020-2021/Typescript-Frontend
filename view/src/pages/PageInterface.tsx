import { Observer } from '../pages/ObserverInterface';

export interface Page {

  attach(observer: Observer): void;

  detach(): void;

  notify(): void;

  getStatus(): any;

  setStatus(newState: any): void;
}
