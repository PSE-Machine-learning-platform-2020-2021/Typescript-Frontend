import React, { Component } from 'react'

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
            <div className="view-section">
                <button onClick={() => this.props.pageChangeToCreation()} className="finish-btn" >Zur Modellerstellungsseite</button>
            </div>
        )
    }
}
