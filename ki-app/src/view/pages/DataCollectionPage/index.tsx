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
        this.finishCountdown();
        const VDOM = (
            <div>
                <Title />
                <Countdown />
                <Diagram />
            </div>
        );
        ReactDOM.render(VDOM, document.getElementById('root'));
    }


    /**
     * Diese Methode braucht nur einmal aufzurufen, Countdown geht automatisch.
     * @param countdownNumber Die Countdownzahl zu zeigen.
     */
    showCountdownNumber(leadTime: number) {
        this.setState({ leadTime: leadTime });
        PubSub.publish('startCounting', this.state.leadTime);
    }

    /**
     * Prüft ob Countdown fertig ist und ändert den Zustand.
     */
    finishCountdown() {
        PubSub.subscribe('finishCountdwon', (_msg: any) => {
            this.setState({ currentState: States.NeedInstantDiagram });
            this.notify();
        }
        );
    }

    /**
     * Diese Methode sollte während Datenerfassung jede Sekunde von Controller aufgerufen werden, um Bild zu updaten.
     * @param countdownNumber Die Countdownzahl zu zeigen
     */
    showDiagram(dataRows: { value: number; relativeTime: number; }[][], usedSensorNames: string[]) {
        // this.setState({ dataRows: dataRows });
        this.setState({ usedSensorNames: usedSensorNames });
        //PubSub.publish('startDiagram', this.state.dataRows);
        PubSub.publish('giveLineLabels', this.state.usedSensorNames);
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