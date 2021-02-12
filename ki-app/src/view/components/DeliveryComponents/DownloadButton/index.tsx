import React, { Component } from 'react'

export default class DownloadButton extends Component {
    state = {click : false}
    clicked = ()=> {
      this.setState({click:true})
    }

    render() {
        return (
            <div>
                <button onClick={()=> this.clicked()} className="btn" >Download</button>
            </div>
        )
    }
}
