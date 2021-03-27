import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './Input.css'


/**
 * Komponent der Startseite. 
 */
export default class Input extends Component {

  props = {
    pageChangeSettings: function (recordingSettings: {
      newDataSetName: string, usedSensorTypes: number[], waitTime: number, readTime: number,
      availableSensorTypes: { sensorTypID: number, sensorType: string, chosen: boolean; }[]
    }) { },
    availableSensorTypes: [] as { sensorTypID: number, sensorType: string, chosen: boolean; }[]
  }

  state = {
    name: "",
    usedSensorTypes: [] as number[],
    leadTime: "",
    collectionTime: "",
    //wait: new Promise(resolve => setTimeout(resolve, 1000))
  };

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
    let newAvailableSensorTypes = this.props.availableSensorTypes;
    for (var i = 0; i < newAvailableSensorTypes.length; i++) {
      // eslint-disable-next-line
      if (newAvailableSensorTypes[i].sensorTypID == +e.target.value) {
        newAvailableSensorTypes[i].chosen = !newAvailableSensorTypes[i].chosen;
        this.setState({ availableSensorTypes: newAvailableSensorTypes, });
        return;
      }
    }
  };

  submit = () => {
    if (
      parseInt(this.state.leadTime) >= 0 &&
      parseInt(this.state.collectionTime) >= 0
    ) {
      let availableSensorTypes = this.props.availableSensorTypes;
      var usedSensorTypes: number[] = [];
      for (var i = 0; i < availableSensorTypes.length; i++) {
        // eslint-disable-next-line
        if (availableSensorTypes[i].chosen == true) {
          usedSensorTypes.push(availableSensorTypes[i].sensorTypID);
        }
      }
      this.setState({ usedSensorTypes: usedSensorTypes });

      if (isNaN(+this.state.leadTime) || isNaN(+this.state.collectionTime)) {
        NotificationManager.error("Die Eingabe der Zeit ist ungültig. Nur Ganze Zahlen sind Erlaubt");
        return
      }

      const newDataSetName = this.state.name;
      const waitTime = +this.state.leadTime;
      const readTime = +this.state.collectionTime;
      this.props.pageChangeSettings({
        newDataSetName: newDataSetName, usedSensorTypes: usedSensorTypes, waitTime: waitTime, readTime: readTime,
        availableSensorTypes: availableSensorTypes
      });
    } else {
      NotificationManager.error("Die Eingabe ist ungültig");
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
            this.props.availableSensorTypes.map((type: { sensorTypID: number, sensorType: string, chosen: boolean; }) => {
              return (<div>
                <input type="checkbox" value={type.sensorTypID} checked={type.chosen} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.handleCheckBoxChange(e)} />
                {type.sensorType}
              </div>);
            })
          }

          <br />
          <button type="button" onClick={this.submit} className="submit-btn">
            Start
          </button>
        </form>
      </div>
    );
  }
};
