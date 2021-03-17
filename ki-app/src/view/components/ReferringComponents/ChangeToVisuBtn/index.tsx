import React, { Component } from 'react'
import './ChangeToVisuBtn.css'

export default class ChangeToVisuBtn extends Component {

    props = {
        pageChangeToVisu: function() {}
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.pageChangeToVisu()} className="ctv-btn" >Wechseln auf die Visualisierungsseite</button>
            </div>
        )
    }
}
