export interface MainControllerInterface {
    getInstance(): typeof self;
    checkConnection(): boolean;
    checkLoginStatus(): boolean;
    getSession(): boolean;
    changeTo(destinationPage: view.Page): void;
    getFacade(): model.Facade
}