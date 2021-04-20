import React, { Component } from 'react';
import QRImage from '../QRImage';
import LinkText from '../LinkText';
import ChangeToVisuBtn from '../ChangeToVisuBtn';

/**
 * Knopf für neues Projekt
 */
export default class NewProjectButton extends Component {

  /**
  * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
  */
  props = {
    pageNewProject: function (projectName: string) { },
    pageChangeToVisu: function () { },
    disabled: true,
    qr: '',
    link: ''
  }

  /**
   * Status für diese Komponente
   */
  state = {
    click: false,
    projectName: '',
  };

  /**
   * Eingabefeld Methode
   * @param e ChangeEventInput
   */
  changeProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      projectName: e.target.value
    });
  };

  /**
   * Methode für Erstellung neues Projekts
   */
  handleCreate = () => {
    this.setState({ click: true });
    this.props.pageNewProject(this.state.projectName)
  };

  /**
  * Render Methode des Komponenten
  * @returns Aufbau des Komponenten
  */
  render() {
    return (
      <div className="newProject">
        <input type="text" value={this.state.projectName} onChange={this.changeProjectName} placeholder='Neuen Projektnamen eingeben' disabled={this.props.disabled} />
        <button onClick={() => this.handleCreate()} id="new" disabled={this.props.disabled}>Neues Projekt</button>
        {this.state.click ? <div> <QRImage qr={this.props.qr} /><ChangeToVisuBtn pageChangeToVisu={this.props.pageChangeToVisu} /><LinkText link={this.props.link} /></div> : null}
      </div>
    );
  }
}
