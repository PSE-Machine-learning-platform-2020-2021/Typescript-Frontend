import React, { Component } from 'react'
import "./linkText.css"

/**
 * Linktext für Verbindung
 */
export default class LinkText extends Component {
    private static readonly T_LINK_DESCRIPTION_DE: string = "Bitte scannen Sie den QR-Code oder folgen Sie dem Link, um Daten zu erfassen";

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
                <p className="text">
                    {LinkText.T_LINK_DESCRIPTION_DE}
                    <br />
                    <a className="text" href={this.props.link} type='link'>{this.props.link}</a>
                </p>
            </div>
        )
    }
}
