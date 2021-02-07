import React, { Component } from "react";
import input from "./index.module.css";

export default class Input extends Component {
    render() {
        return (
            <div className="input">
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
