import React, { Component } from 'react'
import NewWindow from "react-new-window";

export default class index extends Component {

      state = {
          openNewWindow: false,
          username: '',
          password: '',
      }
    
      openNewWindow = () => {
        this.setState({openNewWindow: true})
      };
     changeUsername(e) {
      this.setState(() => ({
        username: e.target.value
      }))
      }
      changePassword(e) {
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
                            <input type="text" value={this.state.username} onChange={this.changeUsername.bind(this)} />
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="text" value={this.state.password} onChange={this.changePassword.bind(this)} type="password" />
                        </label>
                    <div>
                    <button type="submit" onClick={(e)=> this.submit(e)}>Submit</button>
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
