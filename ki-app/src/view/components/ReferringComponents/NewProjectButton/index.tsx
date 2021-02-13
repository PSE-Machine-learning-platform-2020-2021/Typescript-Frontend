import React, { Component } from 'react';
import QRImage from '../QRImage';
import LinkText from '../LinkText';

export default class NewProjectButton extends Component {
  state = { click: false };
  handleCreate = () => {
    this.setState({ click: true });
    PubSub.publish('needqr',)
    //console.log('publish')
  };

  render() {
    return (
      <section>
        <button onClick={() => this.handleCreate()} className="newProject" id="new">Neues Projekt</button>
        {this.state.click ? <div> <QRImage /><LinkText /></div> : null}
      </section>
    );
  }
}
