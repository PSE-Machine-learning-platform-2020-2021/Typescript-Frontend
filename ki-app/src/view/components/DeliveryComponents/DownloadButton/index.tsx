import React, { Component } from 'react'
import './DownloadButton.css'

/**
 * Herunterladen-Knopf
 */
export default class DownloadButton extends Component {
    private static readonly T_BUTTON_DOWNLOAD: string = "Herunterladen!";

    /**
     * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
     */
    props = {
        download: function () { }
    }

    /**
     * Klicken-Methode
     */
    clicked = () => {
        this.props.download()
    }

    /**
     * Render Methode des Komponenten
     * @returns Aufbau des Komponenten
     */
    render() {
        return (
            <div>
                <button onClick={() => this.clicked()} className="download-btn" >{DownloadButton.T_BUTTON_DOWNLOAD}</button>
            </div>
        )
    }
}
