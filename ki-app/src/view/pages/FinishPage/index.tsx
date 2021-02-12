import React, { Component } from "react";
import Title from "../../components/FinishComponents/Title";
import Body from "../../components/FinishComponents/Body";
import Input from "../../components/FinishComponents/Input";
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import { MainController } from '../../../controller/MainController';
import ReactDOM from 'react-dom';
import AddLabelButton from '../../components/FinishComponents/Input/AddLabelButton';
import LabelList from '../../components/FinishComponents/Input/LabelList';

type Props = {
};

export class FinishPage extends React.Component<Props, State> implements Page {

  observers: PageController[] = [];
  state = new State;
  constructor(props: Props) {
    super(props);
    const VDOM = (
      <div>
        <Title />
        <Body />
        <div className="labelList-wrap">
          <LabelList labels={this.state.labels} deleteLabel={this.deleteLabel} />
          <AddLabelButton addLabel={this.addLabel} deleteLabel={this.deleteLabel} />
        </div>
        <Input />
      </div>
    );
    ReactDOM.render(VDOM, document.getElementById('root'));
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

  updateState(state: State) {
    this.setState(state);
    this.notify();
  }

  addLabel = (labelObj: { id: number, name: string, chosen: false, start: number, end: number; }) => {

    const labels = this.state.labels;

    const newLabels = [labelObj, ...labels];

    this.setState({ labels: newLabels });
  };


  deleteLabel = (id: number) => {

    const labels = this.state.labels;

    const newLabels = labels.filter((labelObj) => {
      return labelObj.id !== id;
    });
    this.setState({ labels: newLabels });
  };



  render() {
    const labels = this.state.labels;
    return (
      <div>
        <Title />
        <Body />
        <div className="labelList-wrap">
          <LabelList labels={labels} deleteLabel={this.deleteLabel} />
          <AddLabelButton addLabel={this.addLabel} deleteLabel={this.deleteLabel} />
        </div>
        <Input />
      </div>
    );
  }
}
