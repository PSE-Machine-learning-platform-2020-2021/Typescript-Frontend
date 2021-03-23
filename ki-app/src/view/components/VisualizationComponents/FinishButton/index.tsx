import React, { Component } from 'react'
import "./FinishButton.css"
export default class FinishButton extends Component {
    props = {
        pageChangeToCreation: function () { }
    }

    render() {
        return (
            <div>
                <h4>Wählen Diagramm mit Klicken!</h4>
                <button onClick={() => this.props.pageChangeToCreation()} className="finish-btn" >Train Anfang!</button>
            </div>
        )
    }
}
