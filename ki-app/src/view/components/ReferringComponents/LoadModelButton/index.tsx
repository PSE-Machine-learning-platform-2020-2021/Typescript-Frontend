import React, { Component } from 'react'
import ProjectList from '../ProjectList'
import './LoadModelButton.css'

/**
 * Erstellen PrjektList Knopf
 */
export default class LoadModelButton extends Component {
    private static readonly T_BUTTON_OPEN_LOAD_DE: string = "Projekt und Modell wählen";

    /**
    * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
    */
    props = {
        disabled: true,
        projectData: [] as { projectID: number, projectName: string, AIModelID: number[], }[],
        pageSetCurrentprojekt: function (currentProject: { projectID: number; projectName: string; AIModelID: number[]; }) { },
        pageLoadModel: function (chosenmodelID: number) { },
        pageLoadProjekt: function (currentProject: { projectID: number; projectName: string; AIModelID: number[]; }) { },
        pageChangeToVisu: function () { },
        qr: '',
        link: ''
    }

    /**
     * Status für diese Komponente
     */
    state = { click: false }

    /**
     * Erstellung von Projektliste Methode
     */
    handleCreate = () => {
        this.setState({ click: true })
    }

    /**
    * Render Methode des Komponenten
    * @returns Aufbau des Komponenten
    */
    render() {
        return (
            <div className="loadProject">
                <button onClick={() => this.handleCreate()} className="lp-btn" disabled={this.props.disabled} type='button'>{LoadModelButton.T_BUTTON_OPEN_LOAD_DE}</button>
                {this.state.click ? <div><ProjectList
                    link={this.props.link}
                    pageChangeToVisu={this.props.pageChangeToVisu}
                    pageLoadProjekt={this.props.pageLoadProjekt}
                    qr={this.props.qr}
                    pageLoadModel={this.props.pageLoadModel}
                    projectData={this.props.projectData}
                    pageSetCurrentprojekt={this.props.pageSetCurrentprojekt} />
                </div> : null}
            </div>
        );
    }
}
