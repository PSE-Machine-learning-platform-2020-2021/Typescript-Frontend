import React, { Component } from "react";
import Title from "../../components/FinishComponents/Title";
import Body from "../../components/FinishComponents/Body";
import Input from "../../components/FinishComponents/Input";
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from "react-dom";
import { States } from "../State";

type Props = {};

export class FinishPage extends React.Component<Props, State> implements Page {
  state = new State();
  observers: PageController[] = [];

  constructor(props: Props) {
    super(props);
    const VDOM = (
      <div>
        <Title />
        <Body />
        <Input />
      </div>
    );
    ReactDOM.render(VDOM, document.getElementById("root"));
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