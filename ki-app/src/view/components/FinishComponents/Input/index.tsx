import React, { Component } from "react";
import input from "./index.module.css";
import Labelling from "./Label/Labelling";

export default class Input extends Component {
    state = {
        labels: [{ start: 0, end: 0, name: "" }],
        dataName: ""
    };

    render() {
        return (
            <div className="input">
                <form>
                    Datensatz benennen:
          <input type="text" name="dataname" />
                    <br />
                    <button>Finish</button>
                </form>
            </div>
        );
    }
}
