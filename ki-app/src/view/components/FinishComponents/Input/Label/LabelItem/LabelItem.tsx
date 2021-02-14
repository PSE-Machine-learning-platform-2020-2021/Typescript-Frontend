import React, { Component } from 'react';
import { Label, DeleteLabel } from './types';

interface IProps {
    deleteLabel: (id: string) => void;
}

export default class LabelItem extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    state = {
        label: { id: "", start: null, end: null, name: "" },
    };

    render() {
        return (
            <li>
                <label>
                    Von {this.state.label.start}s bis {this.state.label.end}s:  {this.state.label.name}
                    <button onClick={() => this.props.deleteLabel(this.state.label.id)}>Löschen</button>
                </label>
            </li>
        );
    }
}

