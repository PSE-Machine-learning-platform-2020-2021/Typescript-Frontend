import React from 'react'
import PubSub from 'pubsub-js';
import './VisualizationPage.css'
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { States } from '../State';
import FinishButton from '../../components/VisualizationComponents/FinishButton';
import DiagramList from '../../components/VisualizationComponents/DiagramList';

type Props = {
};

export class VisualizationPage extends React.Component<Props, State> implements Page {
    state = new State()
    observers: PageController[] = [];
    constructor(props: Props) {
        super(props);
        //<ShowDiagram />
        const VDOM = (
            <div className="visualizationpage">

                <DiagramList />
                <FinishButton />
            </div>
        );
        ReactDOM.render(VDOM, document.getElementById('root'));
        this.getDatarows()
        this.changetonextpage()
    }


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

    getDatarows() {
        /**   var emp = []
          emp.push([{ sensorType: 85124, value: [55, 66, 12], relativeTime: 0 },
          { sensorType: 85124, value: [26, 21, 2], relativeTime: 1 },
          { sensorType: 85124, value: [91, 83, 50], relativeTime: 2 },
          { sensorType: 85124, value: [22, 71, 23], relativeTime: 3 },
          { sensorType: 85124, value: [14, 8, 77], relativeTime: 4 },
          ])
          emp.push([{ sensorType: 45157, value: [83, 44, 1], relativeTime: 0 },
          { sensorType: 45157, value: [78, 55, 2], relativeTime: 1 },
          { sensorType: 45157, value: [51, 66, 3], relativeTime: 2 },
          { sensorType: 45157, value: [23, 81, 50], relativeTime: 3 },
          { sensorType: 45157, value: [13, 20, 5], relativeTime: 4 },
          ])
          
          const ex = {
              dataSetID: 1,
              rows: emp
          }
          PubSub.publish('getrows', ex)
          var ex2 = []
          ex2.push([{ sensorType: 123, value: [55, 66, 12], relativeTime: 0 },
          { sensorType: 123, value: [26, 21, 2], relativeTime: 1 },
          { sensorType: 123, value: [91, 83, 50], relativeTime: 2 },
          { sensorType: 123, value: [22, 71, 23], relativeTime: 3 },
          { sensorType: 123, value: [14, 8, 77], relativeTime: 4 },
          ])
          ex2.push([{ sensorType: 456, value: [83, 44, 1], relativeTime: 0 },
          { sensorType: 456, value: [78, 55, 2], relativeTime: 1 },
          { sensorType: 456, value: [51, 66, 3], relativeTime: 2 },
          { sensorType: 456, value: [23, 81, 50], relativeTime: 3 },
          { sensorType: 456, value: [13, 20, 5], relativeTime: 4 },
          ])
         
          const ex22 = {
              dataSetID: 2,
              rows: ex2
          }
          PubSub.publish('getrows', ex22)
          */
        this.state.currentDataSet?.map((dataset) => {
            PubSub.publish('getrows', dataset)
            return dataset
        })

    }

    changetonextpage() {
        PubSub.subscribe('changepage', (_msg: any) => {
            //this.state.currentState = States.ChangeToCreation
            this.setState({ currentState: States.ChangeToCreation })
            this.notify()

        })
    }
}
