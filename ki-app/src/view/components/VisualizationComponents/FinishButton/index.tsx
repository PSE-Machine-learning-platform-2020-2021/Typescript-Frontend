import React, { Component } from 'react'
import "./FinishButton.css"

/**
 * Wechsel zu Modellerstellungsseite
 */
export default class FinishButton extends Component {

    /**
     * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
     */
    props = {
        pageChangeToCreation: function () { }
    }

    /**
     * Render Methode des Komponenten
     * @returns Aufbau des Komponenten
     */
    render() {
        return (
            <div>
                <button onClick={() => this.props.pageChangeToCreation()} className="finish-btn" >Train Anfang!</button>
            </div>
        )
    }
}
