import { PageController } from "./PageController";
import { SensorManager } from "./SensorManager";
import { MainController } from "./MainController";
import { FinishController } from "./FinishController"
export class DataCollectionController implements PageController{

    private sensorManager: SensorManager;
    private page = new view.DataCollection();
    private waitTime = 10;
    private readTime = 10;
    private readonly SECOND = 1000;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status.
     * Dieser Seitenverwalter benötigt einen SensorManager, welcher schon initilisiert wurde. 
     */
    constructor(sensorManager: SensorManager) {
        this.sensorManager = sensorManager;
        this.page.attach(this);
        this.page.setState("needMessage");
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update(){
        let state = this.page.getState()
        switch (state.action) {
            case "start":
                this.startDataRead();
                break;
            case "finishPage":
                this.changePageToFinishPage()
                break;
            case "needMessage":
                let ids = this.page.getIds();
                this.page.setMessages(MainController.getInstance().getMessage(ids));
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
        this.page.setState("wait");
        this.page.setWaitTime(this.waitTime);

        let intervalId1 = setInterval(() => {
            this.page.setState(state)
            this.waitTime = this.waitTime - 1;
            this.page.setWaitTime(this.waitTime);
            if(this.waitTime === 0) clearInterval(intervalId1)
        }, 1)

        this.page.setState("read");
        this.page.setReadTime(this.readTime);
        let intervalId2 = setInterval(() => {
            this.page.setState(state)
            this.readTime = this.readTime - 1;
            let data = this.sensorManager.readData();
            this.page.addDataPoint(data);
            this.page.setReadTime(this.readTime);
            if(this.readTime === 0) clearInterval(intervalId2)
        }, 1)

        this.page.setState("finishDataRead");
    }

    /**
     * Wechselt die Seite zur Fertigungsseite.
     */
    private changePageToFinishPage() {
        let finishController = new FinishController();
        MainController.getInstance().changeTo(finishController);
    }

}