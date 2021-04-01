import { PageController } from "./PageController";
import { VisualizationPage } from "../view/pages/VisualizationPage/index";
import { MainController } from "./MainController";
import { ModelCreationController } from "./ModelCreationController";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";

export class VisualizationController implements PageController {
    private page: Page;
    private state: IState;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status.
     * Dieser Seitenverwalter benötigt einen SensorManager, welcher schon initilisiert wurde. 
     */
    constructor ( currentProjekt: { projectID: number, projectName: string, choosenAIModelID: number; } ) {
        this.page = new VisualizationPage();
        this.page.attach( this );
        this.state = this.page.getState();
        this.state.currentProject = currentProjekt;
        this.page.setState( this.state );
        //Beispiel
        //this.getDatarows()
        this.SetDataRows();
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update () {
        this.state = this.page.getState();
        switch ( this.state.currentState ) {
            case States.NeedMessage:
                this.page.setState( MainController.getInstance().getMessage( this.state.messages ) );
                break;
            case States.ChangeToCreation:
                MainController.getInstance().changeTo( new ModelCreationController() );
                break;
            default:
                break;
        }
    }

    /**
    * Übergibt der Seite alle Datenreihen die verfügbar sind. Dies wird Alle drei Sekunden wiederholt bis der Seitenzustand auf
    * ChangeToCreation wechselt.
    */
    private SetDataRows () {
        //Nur COPY damit es sofort da ist und nicht erst nach dem die intervall Zeit abgelaufen ist
        MainController.getInstance().getFacade().loadProject( this.state.currentProject!.projectID );
        var dataSets = MainController.getInstance().getFacade().getDataSetMetas();
        this.state.currentDataSets! = [];
        for ( let index = 0; index < dataSets.length; index++ ) {
            let data = MainController.getInstance().getFacade().getDataRows( dataSets[ index ].dataSetID ).dataRows!;
            this.state.currentDataSets!.push( { dataSetID: dataSets[ index ].dataSetID, rows: data } );
            //PubSub.publish('visualizationDiagram', { dataSetID: dataSets[index].dataSetID, dataRows: data });
        }
        this.state.currentState = States.SetDataRows;
        this.page.setState( this.state );
        this.state = this.page.getState();
        //bis hier nur copy

        let intervalId = setInterval( () => {
            if ( this.state.currentState === States.ChangeToCreation ) {
                clearInterval( intervalId );
                return;
            }
            MainController.getInstance().getFacade().loadProject( this.state.currentProject?.projectID );
            var dataSets = MainController.getInstance().getFacade().getDataSetMetas();
            this.state.currentDataSets! = [];
            for ( let index = 0; index < dataSets.length; index++ ) {
                let data = MainController.getInstance().getFacade().getDataRows( dataSets[ index ].dataSetID ).dataRows!;
                this.state.currentDataSets!.push( { dataSetID: dataSets[ index ].dataSetID, rows: data } );
                // PubSub.publish('visualizationDiagram', { dataSetID: dataSets[index].dataSetID, dataRows: data });
            }
            this.state.currentState = States.SetDataRows;
            this.page.setState( this.state );
            this.state = this.page.getState();
        }, 1000 );
    }
    /** 
        getDatarows() {
            //Beispiel
            this.state.testDataSet = []
            var flag = false
            let intervalId = setInterval(() => {
                if (flag) clearInterval(intervalId)
                if (this.state.testDataSet!.length < 1) {
                    var exrows1 = []
                    var expoints1 = []
                    expoints1.push({ value: [55, 66, 12], relativeTime: 0 })
                    expoints1.push({ value: [26, 21, 2], relativeTime: 1 })
                    expoints1.push({ value: [91, 83, 50], relativeTime: 2 })
                    expoints1.push({ value: [22, 71, 23], relativeTime: 3 })
                    expoints1.push({ value: [14, 8, 77], relativeTime: 4 })
    
                    exrows1.push({ sensorType: 2, datapoint: expoints1 })
    
                    var expoints2 = []
                    expoints2.push({ value: [83, 44, 1], relativeTime: 0 })
                    expoints2.push({ value: [78, 55, 2], relativeTime: 1 })
                    expoints2.push({ value: [51, 66, 3], relativeTime: 2 })
                    expoints2.push({ value: [23, 81, 50], relativeTime: 3 })
                    expoints2.push({ value: [13, 20, 5], relativeTime: 4 })
    
                    exrows1.push({ sensorType: 3, datapoint: expoints2 })
                    const exdataset1 = {
                        dataSetID: 1,
                        rows: exrows1
                    }
                    this.state.testDataSet!.push(exdataset1)
                    this.page.setState(this.state)
                }
                else {
                    var exrows2 = []
                    var expoints3 = []
                    expoints3.push({ value: [55, 66, 12], relativeTime: 0 })
                    expoints3.push({ value: [26, 21, 2], relativeTime: 1 })
                    expoints3.push({ value: [91, 83, 50], relativeTime: 2 })
                    expoints3.push({ value: [22, 71, 23], relativeTime: 3 })
                    expoints3.push({ value: [14, 8, 77], relativeTime: 4 })
    
                    exrows2.push({ sensorType: 3, datapoint: expoints3 })
    
                    var expoints4 = []
                    expoints4.push({ value: [83, 44, 1], relativeTime: 0 })
                    expoints4.push({ value: [78, 55, 2], relativeTime: 1 })
                    expoints4.push({ value: [51, 66, 3], relativeTime: 2 })
                    expoints4.push({ value: [23, 81, 50], relativeTime: 3 })
                    expoints4.push({ value: [13, 20, 5], relativeTime: 4 })
    
                    exrows2.push({ sensorType: 2, datapoint: expoints4 })
                    const exdataset2 = {
                        dataSetID: 2,
                        rows: exrows2
                    }
                    this.state.testDataSet!.push(exdataset2)
                    this.page.setState(this.state)
                    flag = true
                }
    
            }, 5000);
        }*/

}