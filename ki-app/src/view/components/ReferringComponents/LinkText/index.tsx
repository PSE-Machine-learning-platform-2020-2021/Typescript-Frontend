import React, { Component } from 'react'

export default class LinkText extends Component {
    props = {
        link: ''
    }

    render() {
        return (

            <div className="linktext">
                <div className="linktext1">
                    <p>QR-Code scannen oder Link folgen, um Daten zu erfassen</p>
                </div>

                <a href={this.props.link}>{this.props.link}</a>
            </div>
        )
    }
}
