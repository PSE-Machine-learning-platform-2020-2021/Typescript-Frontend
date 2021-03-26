import React, { Component } from 'react';
import NewWindow from "react-new-window";
import './LoginWindow.css'
export default class LoginWindow extends Component {

  props = {
    pageRegister: function (username: string, email: string, password: string) { },
    pageLogin: function (email: string, password: string) { }
  }

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
    this.props.pageRegister(this.state.username, this.state.email, this.state.password)
  }

  login = () => {
    /** nach submit newFenster schliessen */
    this.setState({ openNewWindow: false });
    this.props.pageLogin(this.state.email, this.state.password)
  };

  render() {
    return (
      <div>
        <div className="right">
          <button className="login-button" onClick={this.openNewWindow} type='button'>Einloggen</button>
        </div>
        {this.state.openNewWindow && (
          <NewWindow title="Login">
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
                  <button className="register" onClick={this.register} type='button'>Registrieren</button>
                  <button className="login" onClick={this.login} type='button'>Loggen ein</button>
                </div>
              </form>
            </div>
          </NewWindow>
        )}
      </div>
    );
  }
}
