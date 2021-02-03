export interface MainControllerInterface {
    //getInstance(): typeof self;

    private facade = "A"

    checkConnection(): boolean;
    checkLoginStatus(): boolean;
    getSession(): boolean;
    changeTo(destinationPage: view.Page): void;
    getFacade(): model.Facade
}