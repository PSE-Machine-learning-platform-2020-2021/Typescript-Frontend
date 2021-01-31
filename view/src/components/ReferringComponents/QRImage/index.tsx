import React, { Component } from 'react'
import qr from '../../../images/exampleQRImage.png'

export default class QRImage extends Component {
    render() {
        return (
            <div>
                <img src={qr} alt="" style={{width:'auto'}} />
            </div>
        )
    }
}
