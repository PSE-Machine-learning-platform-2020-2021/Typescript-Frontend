import React, { Component } from 'react'

/**
 * QR-Code
 */
export default class QRImage extends Component {
    /**
     * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
     */
    props = {
        qr: ''
    }

    /**
     * Render Methode des Komponenten
     * @returns Aufbau des Komponenten
     */
    render() {
        return (
            <div className="qr-code">
                <img src={this.props.qr} alt="qrcode" style={{ width: 'auto' }} />
            </div>
        )
    }
}
