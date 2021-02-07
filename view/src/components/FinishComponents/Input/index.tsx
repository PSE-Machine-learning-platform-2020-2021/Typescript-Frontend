import React, { Component } from "react";
import input from "./index.module.css";

export default class Input extends Component {
    render() {
        return (
            <div className="input">
                <form>
                    Anfang:
          <input type="start" name="start" />
          Ende:
          <input type="end" name="end" />
                    <br />
          Label benennen:
          <input type="label" name="label" />
                    <br />
          Datensatz benennen:
          <input type="dataname" name="dataname" />
                    <br />
                    <button>Finish</button>
                </form>
            </div>
        );
    }
}
