import React, { Component } from 'react';
import QRImage from '../QRImage';
import LinkText from '../LinkText';
import ChangeToVisuBtn from '../ChangeToVisuBtn';


export default class NewProjectButton extends Component {


  state = {
    click: false,
    projectName: '',
    disabled: true
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

  componentDidMount() {
    PubSub.subscribe('disabled', (_msg: any, value: boolean) => {
      //this.state.disabled = value
      const disabled = value
      this.setState({ disabled: disabled })
    })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.projectName} onChange={this.changeProjectName} placeholder='Neuen Projektnamen eingeben' disabled={this.state.disabled} />
        <button onClick={() => this.handleCreate()} className="newProject" id="new" disabled={this.state.disabled}>Neues Projekt</button>
        {this.state.click ? <div> <QRImage /><ChangeToVisuBtn /><LinkText /></div> : null}
      </div>
    );
  }
}
