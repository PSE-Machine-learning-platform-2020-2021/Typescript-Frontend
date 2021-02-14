import React, { Component } from 'react'

export default class QRImage extends Component {
    qr!: string;
    getqr() {
        PubSub.subscribe('getqr', (msg: any, data: string) => {
            console.log('1' + this.qr)
            this.qr = data;
            console.log('2' + this.qr)
        })
        return this.qr
    }
    render() {
        return (
            <div>
                {console.log('3' + this.getqr())}
                <img src={this.getqr()} alt="qrcode" style={{ width: 'auto' }} />
            </div>
        )
    }
}
