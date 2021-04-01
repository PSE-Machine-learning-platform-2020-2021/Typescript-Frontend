import { PageController } from "./PageController";
import { Facade } from "../model/Facade";
export interface MainControllerInterface {
    checkLoginStatus (): boolean;
    changeTo ( destinationPage: PageController ): void;
    getFacade (): Facade;
}