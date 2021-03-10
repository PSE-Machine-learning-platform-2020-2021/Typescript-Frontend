import React, { Component } from "react";
import input from "./index.module.css";

export default class Input extends Component {
  state = {
    name: "",
    usedSensorTypes: [] as number[],
    leadTime: "",
    collectionTime: "",
    availableSensorTypes: [] as { sensorTypID: number, sensorType: string, chosen: boolean; }[]
    //wait: new Promise(resolve => setTimeout(resolve, 1000))
  };

  componentDidMount() {
    PubSub.subscribe("setAvailableSensors", (
      _msg: any, data: { sensorTypID: number, sensorType: string, chosen: boolean; }[]
    ) => {
      this.setState({ availableSensorTypes: data });
    });
  }


  changeLeadtime = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      leadTime: e.target.value,
    });
  };
  changeCollectionTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      collectionTime: e.target.value,
    });
  };
  changeSensors = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      chosenSensors: e.target.value,
    });
  };
  changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newAvailableSensorTypes = this.state.availableSensorTypes;
    for (var i = 0; i < newAvailableSensorTypes.length; i++) {
      // eslint-disable-next-line
      if (newAvailableSensorTypes[i].sensorTypID == +e.target.value) {
        newAvailableSensorTypes[i].chosen = !newAvailableSensorTypes[i].chosen;
        this.setState({ availableSensorTypes: newAvailableSensorTypes, });
        return;
      }
    }
  };

  ////////////////////////////////////////Error bei anderem außer zahlen?
  submit = () => {
    if (
      parseInt(this.state.leadTime) >= 0 &&
      parseInt(this.state.collectionTime) >= 0
    ) {
      let availableSensorTypes = this.state.availableSensorTypes;
      var usedSensorTypes: number[] = [];
      for (var i = 0; i < availableSensorTypes.length; i++) {
        // eslint-disable-next-line
        if (availableSensorTypes[i].chosen == true) {
          usedSensorTypes.push(availableSensorTypes[i].sensorTypID);
        }
      }
      this.setState({ usedSensorTypes: usedSensorTypes });

      const newDataSetName = this.state.name;
      const waitTime = this.state.leadTime;
      const readTime = this.state.collectionTime;
      PubSub.publish('settingsFinish', { newDataSetName, usedSensorTypes, waitTime, readTime, availableSensorTypes });
    } else {
      alert("Deine Eingabe ist ungültig.");
    }
  };

  render() {
    return (
      <div className="input">
        <form>
          Aufnahmeparameter einstellen
          <br />
          Vorlaufzeit:
          <input
            type="leadTime"
            value={this.state.leadTime}
            onChange={this.changeLeadtime.bind(this)}
          />
          s<br />
          Aufnahmedauer:
          <input
            type="collectionTime"
            value={this.state.collectionTime}
            onChange={this.changeCollectionTime.bind(this)}
          />
          s<br />
          Datenname:
          <input
            type="datenname"
            value={this.state.name}
            onChange={this.changeName.bind(this)}
          /><br />
          Sensoren:
          {
            this.state.availableSensorTypes.map((type: { sensorTypID: number, sensorType: string, chosen: boolean; }) => {
              return (<div>
                <input type="checkbox" value={type.sensorTypID} checked={type.chosen} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.handleCheckBoxChange(e)} />
                {type.sensorType}
              </div>);
            })
          }

          <br />
          <button type="button" onClick={this.submit}>
            Start
          </button>
        </form>
      </div>
    );
  }
};
