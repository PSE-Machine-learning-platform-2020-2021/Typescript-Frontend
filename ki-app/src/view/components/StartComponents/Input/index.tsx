import React, { Component } from "react";
import input from "./index.module.css";

export default class Input extends Component {
  state = {
    name: "",
    usedSensorTypes: [] as number[],
    leadTime: "",
    collectionTime: "",
    availableSensorTypes: [{ sensorTypID: 0, sensorType: "a", chosen: false },] as { sensorTypID: number, sensorType: string, chosen: boolean; }[]
  };

  componentDidMount() {
    console.log("123215");
    PubSub.subscribe("setAvailableSensors", (
      data: { sensorTypID: number, sensorType: string, chosen: boolean; }[]
    ) => {
      console.log("aaa");
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
      if (newAvailableSensorTypes[i].sensorTypID === +e.target.value) {
        newAvailableSensorTypes[i].chosen = !newAvailableSensorTypes[i].chosen;
        this.setState({ availableSensorTypes: newAvailableSensorTypes, });
        return;
      }
    }
  };


  submit = () => {
    if (
      parseInt(this.state.leadTime) <= 5 &&
      parseInt(this.state.leadTime) >= 3 &&
      parseInt(this.state.collectionTime) <= 10 &&
      parseInt(this.state.collectionTime) >= 5
    ) {
      let availableSensorTypes = this.state.availableSensorTypes;
      var usedSensorTypes: number[] = [];
      for (var i = 0; i < availableSensorTypes.length; i++) {
        if (availableSensorTypes[i].chosen === true) {
          usedSensorTypes.push(availableSensorTypes[i].sensorTypID);
        }
      }
      this.setState({ usedSensorTypes: usedSensorTypes });
      PubSub.publish('settingsFinish', this.state);
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
          Sensoren...

            {
            this.state.availableSensorTypes.map((type: { sensorTypID: number, sensorType: string, chosen: boolean; }) => {
              return (<li key={type.sensorTypID}>
                <input
                  type="checkbox" value={type.sensorTypID} checked={type.chosen} onChange={(e) => this.handleCheckBoxChange(e)} />
                {type.sensorType}
              </li>);
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
