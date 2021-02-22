import React, { Component } from 'react'
import ProjectList from '../ProjectList'


export default class LoadModelButton extends Component {
  state = { click: false, disabled: true, }
  handleCreate = () => {
    const click = true
    this.setState({ click: click })
  }

  componentDidMount() {
    PubSub.subscribe('disabled', (_msg: any, value: boolean) => {
      //   this.state.disabled = false
      const disabled = false
      this.setState({ disabled: disabled })
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
