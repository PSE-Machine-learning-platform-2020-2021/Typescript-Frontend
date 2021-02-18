import React, { Component } from 'react'

export default class FinishButton extends Component {
    handleClick = () => {
        PubSub.publish('changepage',)
    }
    render() {
        return (
            <div>
                <button onClick={() => this.handleClick()} className="btn" >Train Anfang!</button>
            </div>
        )
    }
}
