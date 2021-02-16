import React, { Component } from 'react'

export default class FinishButton extends Component {
    handleClick = () => {

    }
    render() {
        return (
            <div>
                <button onClick={() => this.handleClick()} className="btn" >Wählen!</button>
            </div>
        )
    }
}
