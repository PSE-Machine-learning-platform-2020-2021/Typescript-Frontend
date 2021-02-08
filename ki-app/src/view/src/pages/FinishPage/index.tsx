import React, { Component } from "react";
import Title from "../../components/FinishComponents/Title";
import Body from "../../components/FinishComponents/Body";
import Input from "../../components/FinishComponents/Input";
import { Status } from "../FinishPage/Status";
import { Page } from "../PageInterface";
import Observer from '../Observer';
import AddLabelButton from '../../components/FinishComponents/Input/AddLabelButton';
import LabelList from '../../components/FinishComponents/Input/LabelList';



export default class FinishPage extends Component implements Page {
  state = {
    Observer: new Observer(), Status: Status.NeedDiagram, Diagram: Document, labels: [
      { id: '0', name: 'example-label', chosen: false, start: '0', end: '0' },
    ]
  };

  addLabel = (labelObj) => {

    const labels = this.state.labels;

    const newLabels = [labelObj, ...labels];

    this.setState({ labels: newLabels });
  };


  deleteLabel = (id) => {

    const labels = this.state.labels;

    const newLabels = labels.filter((labelObj) => {
      return labelObj.id !== id;
    });

    this.setState({ labels: newLabels });
  };

  attach(observer: Observer) {
    this.setState(state => ({
      Observer: observer
    }));
  }

  detach() {
    this.setState(state => ({
      Observer: null
    }));
  }

  notify() {
    this.state.Observer.notify();
  }

  getStatus() {
    return this.state.Status;
  }

  setStatus(status: Status) {
    this.setState(state => ({
      Status: status
    }));
  }

  getDiagram() {
    return this.state.Diagram;
  }

  setDiagram(diagram: Document) {
    this.setState(state => ({
      Diagram: diagram
    }));
  }


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
