import React, { Component } from 'react'
import ProjectList from '../ProjectList'


export default class LoadModelButton extends Component {
  state = { click: false, disabled: true, }
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
      <div>
        <button onClick={() => this.handleCreate()} className="btn" disabled={this.state.disabled}>Projekt und Model Wählen</button>
        {this.state.click ? <div><ProjectList /> </div> : null}
      </div>
    );
  }
}
