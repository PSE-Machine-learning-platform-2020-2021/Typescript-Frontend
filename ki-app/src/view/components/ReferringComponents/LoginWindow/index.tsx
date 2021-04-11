import React, { Component } from 'react';
import NewWindow from "react-new-window";
import './LoginWindow.css'

/**
 * LoginFenster
 */
export default class LoginWindow extends Component {
    private static readonly T_BUTTON_LOGIN_DE: string = "Anmelden/Registrieren";
    private static readonly T_POPUP_LABEL_NAME_DE: string = "Benutzername";
    private static readonly T_POPUP_LABEL_EMAIL_DE: string = "E-Mail-Adresse";
    private static readonly T_POPUP_LABEL_PASSWORD_DE: string = "Passwort";
    private static readonly T_POPUP_BUTTON_LOGIN_DE: string = "Anmelden";
    private static readonly T_POPUP_BUTTON_REGISTER_DE: string = "Registrieren";

    /**
    * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
    */
    props = {
        pageRegister: function (username: string, email: string, password: string) { },
        pageLogin: function (email: string, password: string) { }
    }

    /**
     * Status für diese Komponente
     */
    state = {
        openNewWindow: false,
        username: '',
        email: '',
        password: '',
    };

    /**
     * Erstellung LoginFenster
     */
    openNewWindow = () => {
        this.setState({ openNewWindow: true });
    };

    /**
     * Eingabe von Benutzename
     * @param e ChangeEventInput
     */
    changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            username: e.target.value
        });
    };

    /**
     * Eingabe von Emailadresse
     * @param e ChangeEventInput
     */
    changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: e.target.value
        });
    };

    /**
     * Eingabe von Passwort
     * @param e ChangeEventInput
     */
    changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: e.target.value
        });
    };

    /**
     * Registieren Methode
     */
    register = () => {
        this.setState({ openNewWindow: false });
        this.props.pageRegister(this.state.username, this.state.email, this.state.password)
    }

    /**
     * Login Methode
     */
    login = () => {
        /** nach submit newFenster schliessen */
        this.setState({ openNewWindow: false });
        this.props.pageLogin(this.state.email, this.state.password)
    };

    /**
    * Render Methode des Komponenten
    * @returns Aufbau des Komponenten
    */
    render() {
        return (
            <div>
                <div className="left">
                    <button className="login-button" onClick={this.openNewWindow} type='button'>{LoginWindow.T_BUTTON_LOGIN_DE}</button>
                </div>
                {this.state.openNewWindow && (
                    <NewWindow title="Login">
                        <div className="login-window">
                            <form>
                                <label>
                                    <p className='user'>{LoginWindow.T_POPUP_LABEL_NAME_DE}</p>
                                    <input type="text" value={this.state.username} onChange={this.changeUsername} />
                                </label>
                                <label>
                                    <p className='mail'>{LoginWindow.T_POPUP_LABEL_EMAIL_DE}</p>
                                    <input type="text" value={this.state.email} onChange={this.changeEmail} />
                                </label>
                                <label>
                                    <p className='password'>{LoginWindow.T_POPUP_LABEL_PASSWORD_DE}</p>
                                    <input type="password" value={this.state.password} onChange={this.changePassword} />
                                </label>
                                <div>
                                    <button className="login" onClick={this.login} type='button'>{LoginWindow.T_POPUP_BUTTON_LOGIN_DE}</button>
                                    <button className="register" onClick={this.register} type='button'>{LoginWindow.T_POPUP_BUTTON_REGISTER_DE}</button>
                                </div>
                            </form>
                        </div>
                    </NewWindow>
                )}
            </div>
        );
    }
}
