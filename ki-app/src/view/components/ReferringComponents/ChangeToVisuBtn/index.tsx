import React, { Component } from 'react'

export default class ChangeToVisuBtn extends Component {
    handleClick = () => {
        PubSub.publish('changetovisu',)
    }

    render() {
        return (
            <div>
                <button onClick={() => this.handleClick()} className="btn" >Wechseln auf die Visualisierungsseite</button>
            </div>
        )
    }
}
