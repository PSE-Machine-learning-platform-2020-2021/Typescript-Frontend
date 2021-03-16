import React, { Component } from 'react'
import ProjectList from '../ProjectList'
import './LoadModelButton.css'


export default class LoadModelButton extends Component {
  props = {
    disabled: true,
    projectData: [{ projectID: -1, projectName: "null", AIModelID: [-1], }],
    pageSetCurrentprojekt: function (currentProject: { projectID: number; projectName: string; choosenAIModelID: number; }) {},
    pageLoadModel: function(chosenmodelID: number){}
  }
  
  state = { click: false }
  handleCreate = () => {
    this.setState({ click: true })
  }

  componentDidMount() {
    PubSub.subscribe('disabled', (_msg: any, value: boolean) => {
      this.setState({ disabled: false })
    })

  }
  render() {
    return (
      <div className="loadProject">
        <button onClick={() => this.handleCreate()} className="lp-btn" disabled={this.props.disabled}>Projekt und Model Wählen</button>
        {this.state.click ? <div><ProjectList pageLoadModel = {this.props.pageLoadModel} projectData = {this.props.projectData} pageSetCurrentprojekt = {this.props.pageSetCurrentprojekt}/> </div> : null}
      </div>
    );
  }
}
