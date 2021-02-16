import React, { Component } from 'react';
import NewWindow from "react-new-window";

export default class LoginWindow extends Component {

  state = {
    openNewWindow: false,
    username: '',
    email: '',
    password: '',
  };

  openNewWindow = () => {
    this.setState({ openNewWindow: true });
  };
  changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: e.target.value
    });
  };
  changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.target.value
    });
  };
  changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value
    });
  };


  register = () => {
    this.setState({ openNewWindow: false });
    /** mit controller weiter veraendern*/
    PubSub.publish('register', { name: this.state.username, email: this.state.email, password: this.state.password })
    PubSub.subscribe('registerstatus', (data: boolean) => {
      if (data) {
        PubSub.publish('login', { name: this.state.username, email: this.state.email, password: this.state.password })
        PubSub.subscribe('loginstatus', (_msg: any, data: boolean) => {
          if (data) {
            alert('Register und Einloggen Erfolg!')
          }
        })
      } else {
        alert('Register Mißerfolg!')
      }
    })
  }
  login = () => {
    /** nach submit newFenster schliessen */
    this.setState({ openNewWindow: false });
    /** mit controller weiter veraendern*/
    PubSub.publish('login', { name: this.state.username, email: this.state.email, password: this.state.password })
    PubSub.subscribe('loginstatus', (_msg: any, data: boolean) => {
      if (data) {
        alert('Einloggen Erfolg!')
      } else {
        alert('Einloggen Mißrfolg!')
      }
    })
  };

  render() {
    return (
      <div className="login-button">
        <button onClick={this.openNewWindow}> Einloggen Fenster </button>
        {this.state.openNewWindow && (
          <NewWindow>
            <div className="login-window">
              <form>
                <label>
                  <p>Benutzername</p>
                  <input type="text" value={this.state.username} onChange={this.changeUsername} />
                </label>
                <label>
                  <p>Email</p>
                  <input type="text" value={this.state.email} onChange={this.changeEmail} />
                </label>
                <label>
                  <p>Passwort</p>
                  <input type="password" value={this.state.password} onChange={this.changePassword} />
                </label>
                <div>
                  <button onClick={this.register}>Registrieren</button>
                  <button onClick={this.login}>Loggen ein</button>
                </div>
              </form>
            </div>
          </NewWindow>
        )}
      </div>
    );
  }
}
