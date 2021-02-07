import React, { Component } from "react";
import Title from "../../components/FinishComponents/Title";
import Body from "../../components/FinishComponents/Body";
import Input from "../../components/FinishComponents/Input";
import { Status } from "../FinishPage/Status";
import { Page } from "../Page";

export default class FinishPage extends Component implements Page {
  state = { Status: Status.NeedDiagram, Diagram: Image };

  attach() { }

  detach() { }

  notify() { }

  getStatus() {
    return this.state.Status;
  }

  render() {
    return (
      <div>
        <Title />
        <Body />
        <Input />
      </div>
    );
  }
}
