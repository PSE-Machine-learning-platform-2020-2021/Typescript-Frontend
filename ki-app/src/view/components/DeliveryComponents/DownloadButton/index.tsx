import React, { Component } from 'react'

export default class DownloadButton extends Component {

    clicked = () => {
        PubSub.publish('download',)
    }

    render() {
        return (
            <div>
                <button onClick={() => this.clicked()} className="btn" >Herunterladen!</button>
            </div>
        )
    }
}
