import React, { Component } from 'react';
import QRImage from '../QRImage';
import LinkText from '../LinkText';
import ChangeToVisuBtn from '../ChangeToVisuBtn';

export default class NewProjectButton extends Component {
  state = {
    click: false,
    projectName: ''
  };

  changeProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      projectName: e.target.value
    });
  };

  handleCreate = () => {
    this.setState({ click: true });
    PubSub.publish('createnewproject', this.state.projectName)

  };

  render() {
    return (
      <div>
        <input type="text" value={this.state.projectName} onChange={this.changeProjectName} placeholder='Neues Projektname eingeben' />
        <button onClick={() => this.handleCreate()} className="newProject" id="new">Neues Projekt</button>
        {this.state.click ? <div> <QRImage /><ChangeToVisuBtn /><LinkText /></div> : null}
      </div>
    );
  }
}
