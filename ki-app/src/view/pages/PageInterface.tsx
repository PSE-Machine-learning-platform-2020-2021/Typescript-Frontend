import { PageController } from "../../controller/PageController";

export interface Page {

  attach(observer: PageController): void;

  detach(): void;

  notify(): void;

  getState(): any;

  setState(newState: any): void;
}
