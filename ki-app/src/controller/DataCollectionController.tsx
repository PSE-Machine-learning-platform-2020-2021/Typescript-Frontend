
import { DataCollectionPage } from "../view/pages/DataCollectionPage/index";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";

import { PageController } from "./PageController";
import { SensorManager } from "./SensorManager";
import { MainController } from "./MainController";
import { FinishController } from "./FinishController";
export class DataCollectionController implements PageController {

    private sensorManager: SensorManager;
    private page: Page = new DataCollectionPage();
    private waitTime = 10;
    private readTime = 10;
    private readonly SECOND = 1000;
    private state: IState;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status.
     * Dieser Seitenverwalter benötigt einen SensorManager, welcher schon initilisiert wurde. 
     */
    constructor(sensorManager: SensorManager) {
        this.sensorManager = sensorManager;
        this.page.attach(this);
        this.state = this.page.getState();
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update() {
        let state = this.page.getState();
        switch (state.currentState) {
            case States.StartDataRead:
                this.sensorManager.readData(this.page);
                break;
            case States.ChangeToFinish:
                MainController.getInstance().changeTo(new FinishController());
                break;
            case States.NeedMessage:
                this.page.setState(MainController.getInstance().getMessage(this.state.messages));
                break;
            default:
                break;
        }
    }

    /**
     * Startet die Datenaufnahme. zuerst werden die Wart- und Aufnahmezeit aus dem Sensormanager bezogen. Darauf wird
     * für die Wartezeit gewartet. Danach erfolgt die Aufnahme bis die Aufnahmezeit erreicht wurde.
     */
    private startDataRead() {
        this.waitTime = this.sensorManager.getWaitTime() * this.SECOND;
        this.readTime = this.sensorManager.getReadTime() * this.SECOND;
        this.page.setState(States.wait);
        this.page.setWaitTime(this.waitTime);

        let intervalId1 = setInterval(() => {
            this.page.setState(state);
            this.waitTime = this.waitTime - 1;
            this.page.setWaitTime(this.waitTime);
            if (this.waitTime === 0) clearInterval(intervalId1);
        }, 1);

        this.page.setState(States.read);
        this.page.setReadTime(this.readTime);
        let intervalId2 = setInterval(() => {
            this.page.setState(state);
            this.readTime = this.readTime - 1;
            let data = this.sensorManager.readData();
            this.page.addDataPoint(data);
            this.page.setReadTime(this.readTime);
            if (this.readTime === 0) clearInterval(intervalId2);
        }, 1);

        this.page.setState(States.finishDataRead);
    }
}