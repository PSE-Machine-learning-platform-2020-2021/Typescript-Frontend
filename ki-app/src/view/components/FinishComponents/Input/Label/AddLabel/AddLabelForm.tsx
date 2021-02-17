import React, { Component, useState, ChangeEvent, MouseEvent } from 'react';
import PubSub from 'pubsub-js';
import { nanoid } from 'nanoid';

export default class AddLabelForm extends Component {
    state = {
        id: "", start: "", end: "", name: ""
    };

    handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: e.target.value });
    };
    handleChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ start: e.target.value });
    };
    handleChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ end: e.target.value });
    };

    handleSubmit() {
        this.setState({ id: nanoid() });
        console.log("a");
        console.log(this.state.id);
        PubSub.publish('addLabel', this.state);
    };


    render() {
        return (
            <div>
                Start:
                <input type="text" value={this.state.start} onChange={this.handleChangeStart} />

            End:
                <input type="text" value={this.state.end} onChange={this.handleChangeEnd} />

            Label:
                <input type="text" value={this.state.name} onChange={this.handleChangeLabel} />
                <br />

                <button type="submit" onSubmit={() => this.handleSubmit}>Add Label</button>
            </div>
        );
    }
}