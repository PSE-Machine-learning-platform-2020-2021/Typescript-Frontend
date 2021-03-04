import React, { Component } from 'react'

export default class LinkText extends Component {
    state = {
        link: ''
    }
    getlink() {
        PubSub.unsubscribe('getlink')
        PubSub.subscribe('getlink', (_msg: any, data: string) => {
            this.setState({ link: data });
        })
        return this.state.link
    }

    render() {
        return (

            <div className="linktext">
                <div className="linktext1">
                    <p>QR-Code scannen oder Link folgen, um neues Projekt zu beginnen:</p>
                </div>

                <a href={this.getlink()}>{this.getlink()}</a>
            </div>
        )
    }
}
