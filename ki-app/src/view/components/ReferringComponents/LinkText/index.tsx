import React, { Component } from 'react'

export default class LinkText extends Component {
    state = {
        qr: ''
    }
    getqr() {
        PubSub.subscribe('getqr', (_msg: any, data: string) => {
            this.setState({ qr: data });
        })
        return this.state.qr
    }

    render() {
        return (

            <div className="linktext">
                <div className="linktext1">
                    <p>QR-Code scannen oder Link folgen, um neues Projekt zu beginnen:</p>
                </div>

                <a href={this.getqr()}>{this.getqr()}</a>
            </div>
        )
    }
}
