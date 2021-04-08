import { Component } from 'react';
import './ChangeToVisuBtn.css';

/**
 * Stellt die funktion eines Knopfes zum wechsel auf die Visualisierungsseite dar
 */
export default class ChangeToVisuBtn extends Component {

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
                <button onClick={() => this.props.pageChangeToVisu()} className="ctv-btn" type="button" >Wechseln auf die Visualisierungsseite</button>
            </div>
        );
    }
}
