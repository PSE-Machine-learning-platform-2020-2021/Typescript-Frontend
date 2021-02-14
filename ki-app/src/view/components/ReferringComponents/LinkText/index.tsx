import React, { Component } from 'react'

export default class LinkText extends Component {
    qr!: string;
    getqr() {
        PubSub.subscribe('getqr', (msg: any, data: string) => {
            this.qr = data
        })
        return this.qr
    }

    render() {
        return (
            <div className="linktext">
                <div className="linktext1">
                    <p>QR-Code scannen oder Link folgen, um neues Projekt zu beginnen:</p>
                </div>
                {/*wait backend to change*/}
                <a href={this.getqr()}>{this.getqr()}</a>
            </div>
        )
    }
}
