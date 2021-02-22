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

type IProps = {
};

export class FinishPage extends React.Component<IProps, State> implements Page {
  state = new State();
  observers: PageController[] = [];

  constructor(props: IProps) {
    super(props);
    this.setState({
      dataRows: [
        [{ sensorType: 1, value: [10, 20, 55], relativeTime: 0 }, { sensorType: 1, value: [55, 46, 22], relativeTime: 1, }],
        [{ sensorType: 2, value: [16, 2, 72], relativeTime: 0 }, { sensorType: 1, value: [66, 61, 63], relativeTime: 1, }],
      ]
    });
    const VDOM = (
      <div>
        <Title />
        <Body />
        <div className="label-container">
          <Labelling />
        </div>
      </div>
    );
    ReactDOM.render(VDOM, document.getElementById("root"));
    this.giveDiagram();
  }

  giveDiagram() {
    PubSub.publish('startDiagram', this.state.dataRows);
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