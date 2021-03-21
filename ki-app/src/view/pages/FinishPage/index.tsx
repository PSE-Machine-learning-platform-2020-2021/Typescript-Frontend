import React, { Component } from "react";
import PubSub from 'pubsub-js';
import Title from "../../components/FinishComponents/Title";
import Body from "../../components/FinishComponents/Diagram";
import Labelling from "../../components/FinishComponents/Input/Labelling";
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from "react-dom";
import { States } from "../State";

export class FinishPage implements Page {
  state = new State;
  observers: PageController[] = [];

  constructor() {
    this.state = new State()
  }

  update() {
    this.notify()
    const VDOM = (
      <div>
        <Title />
        <Body />
        <div className="label-container">
          <Labelling />
        </div>
      </div>
    );
    ReactDOM.render(VDOM, document.getElementById('root'));
  }


  giveDiagram() {
    //Beispiel
    /*var exrows = []
    exrows.push([{ sensorType: 85124, value: [55, 66, 12], relativeTime: 0 },
    { sensorType: 85124, value: [26, 21, 2], relativeTime: 1 },
    { sensorType: 85124, value: [91, 83, 50], relativeTime: 2 },
    { sensorType: 85124, value: [22, 71, 23], relativeTime: 3 },
    { sensorType: 85124, value: [14, 8, 77], relativeTime: 4 },
    ])
    exrows.push([{ sensorType: 45157, value: [83, 44, 1], relativeTime: 0 },
    { sensorType: 45157, value: [78, 55, 2], relativeTime: 1 },
    { sensorType: 45157, value: [51, 66, 3], relativeTime: 2 },
    { sensorType: 45157, value: [23, 81, 50], relativeTime: 3 },
    { sensorType: 45157, value: [13, 20, 5], relativeTime: 4 },
    ])

    PubSub.publish('finishDiagram', exrows)*/

    //PubSub.publish('finishDiagram', this.state.dataRows);
  }

  newLabel() {
    PubSub.unsubscribe('newLabel');
    PubSub.subscribe('newLabel', (_msg: any, label: { labelID: number, start: number, end: number, name: string; }) => {
      this.state.currentLabel = label;
      this.state.currentState = States.NewLabel;
      this.notify();
    });
  }

  changeLabel() {
    PubSub.unsubscribe('changeLabel');
    PubSub.subscribe('changeLabel', (_msg: any, label: { labelID: number, start: number, end: number, name: string; }) => {
      this.state.currentLabel = label;
      this.state.currentState = States.ChangeLabel;
      this.notify();

    });
  }

  deleteLabel() {
    PubSub.unsubscribe('deleteLabel');
    PubSub.subscribe('deleteLabel', (_msg: any, label: { start: number, end: number, name: string, labelID: number; }) => {
      var deleteLabel = { labelID: label.labelID, start: label.start, end: label.end, name: label.name };
      this.state.currentLabel = deleteLabel;
      this.state.currentState = States.DeleteLabel;
      this.notify();
    });
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
  setState(state: any) {
    this.state = state
    this.update()
  }
}