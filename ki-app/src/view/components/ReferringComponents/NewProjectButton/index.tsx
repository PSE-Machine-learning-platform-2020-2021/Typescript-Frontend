import React, { Component } from 'react';
import QRImage from '../QRImage';
import LinkText from '../LinkText';
import ChangeToVisuBtn from '../ChangeToVisuBtn';
import './NewProjectButton.css'

export default class NewProjectButton extends Component {

  state = {
    click: false,
    projectName: '',
  };

  props = { disabled: true }

  changeProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      projectName: e.target.value
    });
  };

  handleCreate = () => {
    this.setState({ click: true });
    PubSub.publish('createnewproject', this.state.projectName)

  };

  componentDidMount() {
    PubSub.subscribe('disabled', (_msg: any, value: boolean) => {
      // const disabled = value
      const disabled = value
      this.setState({ disabled: disabled })
    })
  }

  render() {
    return (
      <div className="newProject">
        <input type="text" value={this.state.projectName} onChange={this.changeProjectName} placeholder='Neuen Projektnamen eingeben' disabled={this.props.disabled} />
        <button onClick={() => this.handleCreate()} className="newProject-button" id="new" disabled={this.props.disabled}>Neues Projekt</button>
        {this.state.click ? <div> <QRImage /><ChangeToVisuBtn /><LinkText /></div> : null}
      </div>
    );
  }
}
