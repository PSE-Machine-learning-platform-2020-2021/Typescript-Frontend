import React, { Component } from 'react';
import QRImage from '../QRImage';
import LinkText from '../LinkText';
import ChangeToVisuBtn from '../ChangeToVisuBtn';
import './NewProjectButton.css'

export default class NewProjectButton extends Component {

  props = {
    pageNewProject: function(projectName: string){},
    pageChangeToVisu: function() {},
    disabled: true,
    qr: '',
    link: ''
  }

  state = {
    click: false,
    projectName: '',
  };

  changeProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      projectName: e.target.value
    });
  };

  handleCreate = () => {
    this.setState({ click: true });
    this.props.pageNewProject(this.state.projectName)
  };

  render() {
    return (
      <div className="newProject">
        <input type="text" value={this.state.projectName} onChange={this.changeProjectName} placeholder='Neuen Projektnamen eingeben' disabled={this.props.disabled} />
        <button onClick={() => this.handleCreate()} className="newProject-button" id="new" disabled={this.props.disabled}>Neues Projekt</button>
        {this.state.click ? <div> <QRImage qr = {this.props.qr} /><ChangeToVisuBtn pageChangeToVisu = {this.props.pageChangeToVisu}/><LinkText link = {this.props.link}/></div> : null}
      </div>
    );
  }
}
