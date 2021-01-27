import { MainControllerInterface } from "./MainControllerInterface";
class MainController implements MainControllerInterface{
    getInstance() {
        return self
    }

    checkConnection() {
        return false
    }

    checkLoginStatus() {
        return false
    }
    getSession() {
        return false
    }
    changeTo(destinationPage: view.Page){
        
    }
    getFacade() {
        return facade
    }
}