import React, { Component } from 'react'
import ProjectList from '../ProjectList'


export default class LoadModelButton extends Component {
  state = { click: false }
  handleCreate = () => {
    this.setState({ click: true })
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handleCreate()} className="btn" >Projekt und Model Wählen</button>
        {this.state.click ? <div><ProjectList /> </div> : null}
      </div>
    );
  }
}
