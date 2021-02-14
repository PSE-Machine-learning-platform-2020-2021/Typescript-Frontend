import React, { Component } from 'react'
import PubSub from 'pubsub-js';

export default class QRImage extends Component {
    qr!: string;

    getqr() {
        PubSub.subscribe('getqr', (_msg: any, data: string) => {
            this.qr = data;
        })
        return this.qr
    }
    render() {
        return (
            <div>

                <img src={this.getqr()} alt="qrcode" />
            </div>
        )
    }
}
