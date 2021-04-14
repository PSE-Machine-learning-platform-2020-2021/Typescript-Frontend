import { Component } from 'react';

/**
 * Stellt die funktion eines Knopfes zum wechsel auf die Visualisierungsseite dar
 */
export default class ChangeToVisuBtn extends Component {
    private static readonly T_BUTTON_NEXT_DE: string = "Zur Visualisierungsseite"

    /**
     * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
     */
    props = {
        pageChangeToVisu: function () { }
    };

    /**
     * Render Methode des Komponenten
     * @returns Aufbau des Komponenten
     */
    render() {
        return (
            <div>
                <button onClick={() => this.props.pageChangeToVisu()} className="ctv-btn" type="button" >{ChangeToVisuBtn.T_BUTTON_NEXT_DE}</button>
            </div>
        );
    }
}
