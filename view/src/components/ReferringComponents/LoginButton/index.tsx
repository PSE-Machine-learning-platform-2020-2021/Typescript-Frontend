import React, { Component } from 'react'
import NewWindow from "react-new-window";

export default class LoginButton extends Component {

      state = {
          openNewWindow: false,
          username: '',
          password: '',
      }
    
      openNewWindow = () => {
        this.setState({openNewWindow: true})
      };
      changeUsername =(e: React.ChangeEvent<HTMLInputElement>) =>{
      this.setState(() => ({
        username: e.target.value
      }))
      }
      changePassword =(e: React.ChangeEvent<HTMLInputElement>) =>{
        this.setState(() => ({
          password: e.target.value
        }))
        }
      submit = ()=> {
        /** nach submit newFenster schliessen */
        this.setState({openNewWindow: false})
        /** mit controller weiter veraendern*/
        if(this.state.username === '123' && this.state.password === 'abc') {
          alert('success')
        }
        else{
          alert('fail')
        }
      }
    
      render() {
        return (
          <div className="App">
            {this.state.openNewWindow && (
              <NewWindow>
                <div className="login-wrapper">
                    <h1>Please Log In</h1>
                    <form>
                        <label>
                            <p>Username</p>
                            <input type="text" value={this.state.username} onChange={this.changeUsername} />
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="password" value={this.state.password} onChange={this.changePassword.bind(this)}/>
                        </label>
                    <div>
                    <button type="submit" onClick={this.submit}>Submit</button>
                    </div>
                    </form>
          </div>
              </NewWindow>
            )}
            <button onClick={this.openNewWindow}> Open New Window </button>
          </div>
        );
      }
}
