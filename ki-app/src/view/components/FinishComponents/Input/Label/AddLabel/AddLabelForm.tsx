import React, { Component, useState, ChangeEvent, FormEvent } from 'react';
import { nanoid } from 'nanoid';

interface IProps {
    addLabel: (label: { id: string, start: number, end: number, name: string; }) => void;
}

export default class AddLabelForm extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    state = {
        newlabel: { id: "", start: 0, end: 0, name: "" },
    };

    handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: e.target.value });
    };
    handleChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ Start: e.target.value });
    };
    handleChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ End: e.target.value });
    };
    handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        this.setState({ id: nanoid() });
        this.props.addLabel(this.state.newlabel);
        this.setState({ newlabel: { id: "", start: 0, end: 0, name: "" } });
    };

    return() {
        <form onSubmit={this.handleSubmit} >
            Start:
                <input type="text" value={String(this.state.newlabel.start)} onChange={this.handleChangeStart} />

            End:
                <input type="text" value={String(this.state.newlabel.end)} onChange={this.handleChangeEnd} />

            Label:
                <input type="text" value={this.state.newlabel.name} onChange={this.handleChangeLabel} />
            <br />

            <button type="submit">Add Label</button>
        </form>;
    }
};