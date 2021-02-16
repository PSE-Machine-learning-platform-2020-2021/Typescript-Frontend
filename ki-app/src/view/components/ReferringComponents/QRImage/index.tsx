import React, { Component } from 'react'
import PubSub from 'pubsub-js';

export default class QRImage extends Component {
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
            <div>
                <img src={this.getqr()} alt="qrcode" style={{ width: 'auto' }} />
            </div>
        )
    }
}
