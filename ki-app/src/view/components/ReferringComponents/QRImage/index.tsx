import React, { Component } from 'react'

export default class QRImage extends Component {
    props = {
        qr: ''
    }

    render() {
        return (
            <div>
                <img src={this.props.qr} alt="qrcode" style={{ width: 'auto' }} />
            </div>
        )
    }
}
