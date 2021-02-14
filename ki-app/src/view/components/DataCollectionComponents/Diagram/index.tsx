import React, { Component } from 'react';

export default class Countdown extends Component {
    state = { diagramSvg: "", showDiagram: false };
    render() {
        return (
            <div>
                {this.state.showDiagram ?
                    <img src={this.state.diagramSvg} alt="diagram" /> : ""}
            </div>
        );
    }
}