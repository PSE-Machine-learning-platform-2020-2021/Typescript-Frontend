import React, { Component } from 'react'
import ProjectList from '../ProjectList'
import './LoadModelButton.css'

/**
 * Erstellen PrjektList Knopf
 */
export default class LoadModelButton extends Component {

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
    qr: ''
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
        <button onClick={() => this.handleCreate()} className="lp-btn" disabled={this.props.disabled} type='button'>Projekt und Model Wählen</button>
        {this.state.click ? <div><ProjectList
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
