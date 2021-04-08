import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';

/**
 * Modelliste von gewähltes Projekt
 */
export default class ModelList extends Component {

    /**
     * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
     */
    props = {
        currentProject: { projectID: -1, projectName: "null", AIModelID: [-1] },
        pageLoadModel: function (chosenmodelID: number) { }
    };

    /**
     * Status für diese Komponente
     */
    state = {
        chosenmodelID: -1
    };

    /**
     * Selektieren in Modelliste
     * @param e ChangeEvent
     */
    handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            chosenmodelID: e.target.value
        });
    };

    /**
     * Methode für Bestätigung Knopf
     */
    handleChoose() {
        /* wait to change load model*/
        if (this.state.chosenmodelID === -1) {
            NotificationManager.error('Sie haben noch kein Modell gewählt!', "", 3000);
        } else {
            this.props.pageLoadModel(this.state.chosenmodelID);
        }
    }

    /**
     * Render Methode des Komponenten
     * @returns Aufbau des Komponenten
     */
    render() {
        return (
            <section>
                <label>ModellList</label>
                <select onChange={this.handleChange}>
                    <option>Modell Wählen</option>
                    {this.props.currentProject.AIModelID.map((modelObj) => {
                        return <option value={modelObj} key={modelObj} >Modell{modelObj}</option>;
                    })}
                </select>
                <button onClick={() => this.handleChoose()} className="btn" >Laden das gewählte Modell(zu Auslieferungsseite)</button>
            </section>
        );
    }
}
