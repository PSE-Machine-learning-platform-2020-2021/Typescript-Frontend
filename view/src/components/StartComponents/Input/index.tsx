import React, { Component } from "react";
import input from "./index.module.css";

export default class Input extends Component {
  state = {
    leadTime: "",
    collectionTime: "",
  };

  changeLeadtime = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({
      leadTime: e.target.value,
    }));
  };
  changeCollectionTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({
      collectionTime: e.target.value,
    }));
  };

  submit = () => {
    if (
      parseInt(this.state.leadTime) <= 5 &&
      parseInt(this.state.leadTime) >= 3 &&
      parseInt(this.state.collectionTime) <= 10 &&
      parseInt(this.state.collectionTime) >= 5
    ) {
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
          Sensoren...
          <label>
            <select>
              <option value="bs">Beschleunigungssensor</option>
              <option value="rs">Rotationssensor</option>
              <option value="mk">Mikrofon</option>
              <option value="ns">Neigungssensor</option>
            </select>
          </label>
          <br />
          <button type="button" onClick={this.submit}>
            Start
          </button>
        </form>
      </div>
    );
  }
}
