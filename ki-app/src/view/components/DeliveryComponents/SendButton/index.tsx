import React, { Component } from 'react'

export default class SendButton extends Component {
    state = {click : false}
    clicked = ()=> {
      this.setState({click:true})
    }

    render() {
        return (
            <div>
                <button onClick={()=> this.clicked()} className="btn" >Send</button>
            </div>
        )
    }
}
