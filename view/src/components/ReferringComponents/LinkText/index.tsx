import React, { Component } from 'react'

export default class LinkText extends Component {
    render() {
        return (
            <div className="linktext">
                <div className="linktext1">
                <p>QR-Code scannen oder Link folgen, um neues Projekt zu beginnen:</p> 
                </div>
                <div className="linktext2">
                {/*wait backend to change*/}
                <a href="http://www.google.de">http://www.google.de</a> 
                </div>
            </div>
        )
    }
}
