import React, { Component } from 'react'

export default class TrainButton extends Component {
    handleClick = () => {

    }
    render() {
        return (
            <div>
                <button onClick={() => this.handleClick()} className="btn" >Train Start!</button>
            </div>
        )
    }
}
