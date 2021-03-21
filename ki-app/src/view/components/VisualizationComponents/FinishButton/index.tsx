import React, { Component } from 'react'

export default class FinishButton extends Component {
    props = {
        pageChangeToCreation: function () { }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.pageChangeToCreation()} className="btn" >Train Anfang!</button>
            </div>
        )
    }
}
