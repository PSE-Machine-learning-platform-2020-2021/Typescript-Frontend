import { MainControllerInterface } from "./MainControllerInterface";
export class MainController {
    static getInstance() {
        return self
    }

    static checkConnection() {
        return false
    }

    static checkLoginStatus() {
        return false
    }
    static getSession() {
        return false
    }
    static changeTo(destinationPage: view.Page){
        
    }
    static getFacade() {
        return facade
    }
}