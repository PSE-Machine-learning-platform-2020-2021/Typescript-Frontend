import React, { Component } from 'react'
import "./index.css"

/**
 * Linktext für Verbindung
 */
export default class LinkText extends Component {

    /**
     * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
     */
    props = {
        link: ''
    }

    /**
     * Render Methode des Komponenten
     * @returns Aufbau des Komponenten
     */
    render() {
        return (
            <div className="linktext">
                <div className="linktext1">
                    <p className = "text">QR-Code scannen oder Link folgen, um Daten zu erfassen</p>
                </div>

                <a className = "text" href={this.props.link} type='link'>{this.props.link}</a>
            </div>
        )
    }
}
