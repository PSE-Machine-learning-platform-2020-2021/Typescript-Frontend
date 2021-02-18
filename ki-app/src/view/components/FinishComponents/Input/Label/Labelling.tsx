import React, { Component, ChangeEvent } from 'react';
import { nanoid } from 'nanoid';

export default class Labelling extends Component {
    state = {
        labels: [] as { id: string, start: string, end: string, name: string; }[],
        newId: "", newStart: "", newEnd: '', newName: ""
    };

    handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newName: e.target.value });
        this.setState({ id: nanoid() });
    };
    handleChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newStart: e.target.value });
    };
    handleChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newEnd: e.target.value });
    };
    handleClick() {
        const { newId, newStart, newEnd, newName } = this.state;
        const labelObj = { id: newId, start: newStart, end: newEnd, name: newName };
        this.addLabel(labelObj);
        this.setState({ newId: "", newStart: "", newEnd: '', newName: "" });
    }

    addLabel = (labelObj: { id: string, start: string, end: string, name: string; }) => {

        const newLabels = [labelObj, ...this.state.labels];

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

                    <button type="button" onClick={() => this.handleClick()}>Add Label</button>
                </div>

            </div>
        );
    }
}