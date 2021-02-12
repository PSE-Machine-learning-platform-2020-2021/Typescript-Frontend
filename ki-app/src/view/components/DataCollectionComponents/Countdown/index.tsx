import React, { Component } from 'react';

export default class Countdown extends Component {
    state = { countdownNumber: 0, startCounting: false };
    render() {
        return (
            <div>
                <h2>Bereit machen<br />zur<br />Aufnahme!</h2>
                <h2>{this.state.countdownNumber}</h2>
                <h2>Verwendete Sensoren:<br />example<br />exmaple</h2>
            </div>
        );
    }
}
