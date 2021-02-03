export interface MainControllerInterface {
    checkConnection(): boolean;
    checkLoginStatus(): boolean;
    changeTo(destinationPage: view.Page): void;
    getFacade(): model.Facade
}