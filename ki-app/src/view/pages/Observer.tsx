import { Observer } from '../pages/ObserverInterface';

export default class ConcreteObserver implements Observer {
    notify() {
        console.log('notify');
    }
}