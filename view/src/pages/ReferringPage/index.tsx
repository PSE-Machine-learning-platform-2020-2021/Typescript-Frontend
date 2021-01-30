import React, { Component } from 'react'
import ConstantsText from '../../components/ReferringComponents/ConstantsText'
import LinkText from '../../components/ReferringComponents/LinkText'
import QRImage from '../../components/ReferringComponents/QRImage'

export default class ReferringPage extends Component {
    render() {
        return (
            <div>
                <ConstantsText/>
                <QRImage/>
                <LinkText/>
            </div>
        )
    }
}
