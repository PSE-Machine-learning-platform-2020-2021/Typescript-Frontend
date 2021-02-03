import { read } from "fs";
import { start } from "repl";
import { MainController } from "./MainController";
import { PageController } from "./PageController";
import { SensorManager } from "./SensorManager";
import { DataCollectionController } from "./DataCollectionController"
export class StartController implements PageController{
    
    private page = new view.StartPage() 
    private sensorManager = new SensorManager();

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status. 
     */
    constructor() {
        this.page.attach(this)
        this.page.setState("needMessage")
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update(){
        let state = this.page.getState()
        switch (state.action) {
            case "start":
                this.start();
                break;
            case "setLanguage":
                let languageCode = this.page.getLanguageCode();
                this.page.languageChanged(MainController.getInstance().setLanguage(languageCode));
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
     * Holt sich alle wichtigen Daten für die Datenaufnahme aus der momentanen Seite. Darauf wird mit dem Sensormanager
     * die Datenaufnahme initialisiert. Zum Schluss wird der Seitenwechsel zur Erfassungseite durchgeführt. 
     */
    private start() {
        let sensorTypes = this.page.getSensorTypes()
        let dataSetName = this.page.getDataSetName()
        let waitTime = this.page.getWaitTime()
        let readTime = this.page.getReadTime()

        this.sensorManager.setUpDataRead(sensorTypes, dataSetName, waitTime, readTime);

        let dataCollectionController = new DataCollectionController(this.sensorManager);
        MainController.getInstance().changeTo(dataCollectionController);
    }
}