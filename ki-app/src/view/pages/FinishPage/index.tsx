import React, { Component } from "react";
import Title from "../../components/FinishComponents/Title";
import Body from "../../components/FinishComponents/Body";
import LabelList from "../../components/FinishComponents/Input/Label/LabelList/LabelList";
import AddLabelForm from "../../components/FinishComponents/Input/Label/AddLabel/AddLabelForm";
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from "react-dom";
import { States } from "../State";

type IProps {
};

export class FinishPage extends React.Component<IProps, State> {
  state = new State();
  observers: PageController[] = [];

  constructor(props: IProps) {
    super(props);
    const VDOM = (
      <div>
        <Title />
        <Body />
        <div className="label-container">
          <div className="label-wrap">
            <LabelList>
              <AddLabelForm />
          </div>
          </div>
        </div>
    );
    ReactDOM.render(VDOM, document.getElementById("root"));
  }

  addLabel = (label: { id: string, start: number, end: number, name: string; }) => {

          let labels = this.state.labels;

    let newLabels = [label, ...labels];

    this.setState({ labels: newLabels });
  };

  deleteLabel = (id: string) => {

          let labels = this.state.labels;

    let newLabels = labels.filter((label) => {
      return label.id !== id;
    });

    this.setState({ labels: newLabels });
  };


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
    for (let index = 0; index < this.observers.length; {
      const element = this.observers[index];
      element.update();
    }
  }

  getState() {
    return this.state;
  }
}