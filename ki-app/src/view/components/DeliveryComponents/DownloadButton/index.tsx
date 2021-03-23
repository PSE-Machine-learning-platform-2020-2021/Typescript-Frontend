import React, { Component } from 'react'
import './DownloadButton.css'
export default class DownloadButton extends Component {
    props = {
        download: function () { }
    }
    clicked = () => {
        this.props.download()
    }

    render() {
        return (
            <div>
                <button onClick={() => this.clicked()} className="download-btn" >Herunterladen!</button>
            </div>
        )
    }
}
