import React, { Component } from "react";
import input from "./index.module.css";
import Labelling from "./Label/Labelling";

export default class Input extends Component {
    render() {
        return (
            <div className="input">
                <Labelling />
                <form>
                    Datensatz benennen:
          <input type="dataname" name="dataname" />
                    <br />
                    <button>Finish</button>
                </form>
            </div>
        );
    }
}
