import React, { Component } from 'react'
import './ChangeToVisuBtn.css'

export default class ChangeToVisuBtn extends Component {
    handleClick = () => {
        PubSub.publish('changetovisu',)
    }

    render() {
        return (
            <div>
                <button onClick={() => this.handleClick()} className="ctv-btn" >Wechseln auf die Visualisierungsseite</button>
            </div>
        )
    }
}
