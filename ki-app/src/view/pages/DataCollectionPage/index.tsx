import React from 'react';
import PubSub from 'pubsub-js';
import Title from '../../components/DataCollectionComponents/Title';
import Countdown from '../../components/DataCollectionComponents/Countdown';
import Diagram from '../../components/DataCollectionComponents/Diagram';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { States } from '../State';

type Props = {
};

export class DataCollectionPage extends React.Component<Props, State> implements Page {
    state = new State;
    observers: PageController[] = [];

    constructor(props: Props) {
        super(props);
        const VDOM = (
            <div>
                <Title />
                <Countdown />
                <Diagram />
            </div>
        );
        ReactDOM.render(VDOM, document.getElementById('root'));
        this.finishCountdown();
        this.showDiagram();
        this.changeToFinish();
    }


    /**
     * Prüft ob Countdown fertig ist und ändert den Zustand.
     */
    finishCountdown() {
        PubSub.unsubscribe('finishCountdown');
        PubSub.subscribe('finishCountdown', () => {
            this.state.currentState = States.NeedInstantDiagram;
            this.notify();
        }
        );
    }

    /**
     * Diese Methode sollte während Datenerfassung jede Sekunde von Controller aufgerufen werden, um Bild zu updaten.
     * @param countdownNumber Die Countdownzahl zu zeigen
     */
    showDiagram() {
        // this.setState({ dataRows: dataRows });
        //this.state.usedSensorNames = usedSensorNames;
        // this.setState({ usedSensorNames: usedSensorNames });
        //PubSub.publish('startDiagram', this.state.dataRows);
        // PubSub.publish('giveLineLabels', this.state.usedSensorNames);

        //Beispiel
        var exdatarows = []
        var exdatapoints = []
        const allpoints = [{ rowId: 0, sensorType: 85124, value: [55, 66, 12], relativeTime: 0 },
        { rowId: 0, sensorType: 85124, value: [26, 21, 2], relativeTime: 1 },
        { rowId: 0, sensorType: 85124, value: [91, 83, 50], relativeTime: 2 },
        { rowId: 0, sensorType: 85124, value: [22, 71, 23], relativeTime: 3 },
        { rowId: 0, sensorType: 85124, value: [14, 8, 77], relativeTime: 4 },
        { rowId: 1, sensorType: 45157, value: [83, 44, 1], relativeTime: 0 },
        { rowId: 1, sensorType: 45157, value: [78, 55, 2], relativeTime: 1 },
        { rowId: 1, sensorType: 45157, value: [51, 66, 3], relativeTime: 2 },
        { rowId: 1, sensorType: 45157, value: [23, 81, 50], relativeTime: 3 },
        { rowId: 1, sensorType: 45157, value: [13, 20, 5], relativeTime: 4 }
        ]

        //jede ein datapoints addieren, kann publish in for-schleife sein,
        for (var i = 0; i < allpoints.length; i++) {
            if (i === 0) {
                exdatapoints.push({ sensorType: allpoints[i].sensorType, value: allpoints[i].value, relativeTime: allpoints[i].relativeTime })
                continue;
            }
            if (allpoints[i].rowId === allpoints[i - 1].rowId) {
                exdatapoints.push({ sensorType: allpoints[i].sensorType, value: allpoints[i].value, relativeTime: allpoints[i].relativeTime })
            } else {
                exdatarows.push(exdatapoints)
                exdatapoints = []
                exdatapoints.push({ sensorType: allpoints[i].sensorType, value: allpoints[i].value, relativeTime: allpoints[i].relativeTime })
            }
        }
        exdatarows.push(exdatapoints)


        PubSub.publish('startDiagram', exdatarows)
    }
    changeToFinish() {
        PubSub.unsubscribe('changeToFinish')
        PubSub.subscribe('changeToFinish', (_msg: any) => {
            // eslint-disable-next-line
            this.state.currentState = States.ChangeToFinish
            this.notify()

        })
    }
    /**
     * Die Methoden für Beobachtermuster
     * @param observer Beobachter,nähmlich Controller
     */
    attach(observer: PageController) {
        this.observers.push(observer);
    }

    detach(observer: PageController) {
        const index = this.observers.indexOf(observer, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notify() {
        for (let index = 0; index < this.observers.length; index++) {
            const element = this.observers[index];
            element.update();
        }
    }

    getState() {
        return this.state;
    }

}