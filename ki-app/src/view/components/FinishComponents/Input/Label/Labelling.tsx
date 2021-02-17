import React, { Component, ChangeEvent } from 'react';
import PubSub from 'pubsub-js';
import { nanoid } from 'nanoid';

export default class Labelling extends Component {
    state = {
        labels: [{ id: '1', start: '1', end: '1', name: '1' }] as { id: string, start: string, end: string, name: string; }[],
        newName: "", newStart: "", newEnd: '', newId: ""
    };

    handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newName: e.target.value });
    };
    handleChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newStart: e.target.value });
    };
    handleChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newEnd: e.target.value });
    };

    addLabel = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ newId: nanoid() });
        let labels = this.state.labels;
        let newId = this.state.newId;
        let newStart = this.state.newStart;
        let newEnd = this.state.newEnd;
        let newName = this.state.newName;

        const newLabel = { newId, newStart, newEnd, newName };

        let newLabels = [newLabel, ...labels];

        this.setState({ labels: newLabels });
    };


    deleteLabel = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {

        let labels = this.state.labels;

        let newLabels = labels.filter((label) => {
            return label.id !== id;
        });

        this.setState({ labels: newLabels });
    };


    render() {
        return (
            <div className="label-wrap">
                {
                    this.state.labels.map((label: { id: string, start: string, end: string, name: string; }) => {
                        return (
                            <li key={label.id}>
                                Von {label.start}s bis {label.end}s:  {label.name}
                                <button onClick={(e) => this.deleteLabel(e, label.id)}>Löschen</button>
                            </li>
                        );
                    })}
                <div>
                    Start:
                        <input type="text" value={this.state.newStart} onChange={this.handleChangeStart} />

                    End:
                        <input type="text" value={this.state.newEnd} onChange={this.handleChangeEnd} />

                    Label:
                        <input type="text" value={this.state.newName} onChange={this.handleChangeLabel} />
                    <br />

                    <button type="submit" onSubmit={() => this.addLabel}>Add Label</button>
                </div>

            </div>
        );
    }
}