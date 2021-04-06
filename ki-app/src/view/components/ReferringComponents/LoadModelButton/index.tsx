import React, { Component } from 'react'
import ProjectList from '../ProjectList'
import './LoadModelButton.css'


export default class LoadModelButton extends Component {
  props = {
    disabled: true,
    projectData: [] as { projectID: number, projectName: string, AIModelID: number[], }[],
    pageSetCurrentprojekt: function (currentProject: { projectID: number; projectName: string; AIModelID: number[]; }) { },
    pageLoadModel: function (chosenmodelID: number) { },
    pageLoadProjekt: function (currentProject: { projectID: number; projectName: string; AIModelID: number[]; }) { },
    pageChangeToVisu: function () { },
    qr: ''
  }

  state = { click: false }
  handleCreate = () => {
    this.setState({ click: true })
  }

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
