import React, { Component } from "react";
import { NotificationManager } from 'react-notifications';
import './Input.css';


/**
 * Stellt die Funktion für Input der Einstellungen
 */
export default class Input extends Component {

  props = {
    /**
     * Die Methode um die Einstellungen zu ändern
     * @param recordingSettings die eingegebene Einstellungen
     */
    pageChangeSettings: function (recordingSettings: {
      newDataSetName: string, usedSensorTypes: number[], waitTime: number, readTime: number,
      availableSensorTypes: { sensorTypID: number, sensorType: string, chosen: boolean; }[];
    }) { },

    /**
     * Die verfügbare Sensoren zu wählen
     */
    availableSensorTypes: [] as { sensorTypID: number, sensorType: string, chosen: boolean; }[]
  };

  state = {
    name: "", //Datenname
    usedSensorTypes: [] as number[], //gewählte Sensoren
    leadTime: "", //Vorlaufzeit
    collectionTime: "", //Erfassungsdauer
  };

  /**
   * Erneut den Inhalt des Eingabefelds der Vorlaufzeit
   * @param e Die Eingebenaktion
   */
  changeLeadtime = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      leadTime: e.target.value,
    });
  };

  /**
   * Erneut den Inhalt des Eingabefelds der Erfassungsdauer
   * @param e Die Eingebenaktion
   */
  changeCollectionTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      collectionTime: e.target.value,
    });
  };

  /**
   * Erneut den Inhalt des Eingabefelds des Datennamen
   * @param e Die Eingebenaktion
   */
  changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value,
    });
  };

  /**
   * Aktualisiert den gewählten Sensor
   * @param e Die Klickaktion
   */
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

  /**
   * Sende die festgestellte Einstellungen
   * @returns wenn die Eingabe ungültig ist
   */
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

      /**
       * Die eingegebene Zeit ist ungültig.
       */
      if (isNaN(+this.state.leadTime) || isNaN(+this.state.collectionTime)) {
        NotificationManager.error("Die Eingabe der Zeit ist ungültig. Es sind nur ganze Zahlen erlaubt");
        return;
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
                <input className='checkbox' type="checkbox" value={type.sensorTypID} checked={type.chosen} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.handleCheckBoxChange(e)} />
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
