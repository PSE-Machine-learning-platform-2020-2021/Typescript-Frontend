import React, { Component, ChangeEvent } from 'react';
import { nanoid } from 'nanoid';

export default class Labelling extends Component {
    state = {
        labels: [] as { id: string, start: string, end: string, name: string; }[],
        newId: "", newStart: "", newEnd: '', newName: ""
    };

    handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newName: e.target.value });
        this.setState({ newId: nanoid() });
    };
    handleChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newStart: e.target.value });
    };
    handleChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newEnd: e.target.value });
    };
    handleClick = () => {
        const { newId, newStart, newEnd, newName } = this.state;

        const labelObj = { id: newId, start: newStart, end: newEnd, name: newName };
        this.addLabel(labelObj);
        this.setState({ newId: "", newStart: "", newEnd: '', newName: "" });
    };

    addLabel = (labelObj: { id: string, start: string, end: string, name: string; }) => {
        const label: { labelId: number, start: number, end: number, name: string; } = { labelId: parseInt(labelObj.id), start: this.formatFloatingString(labelObj.start), end: this.formatFloatingString(labelObj.end), name: labelObj.name }; //was ist bei fehlerfall?? keine Zahlen
        console.log(label.start);
        PubSub.publish('newLabel', label);
        const labelObjReal: { id: string, start: string, end: string, name: string; } = { id: labelObj.id, start: this.formatFloatingString(labelObj.start).toString(), end: this.formatFloatingString(labelObj.end).toString(), name: labelObj.name };
        const { labels } = this.state;

        const newLabels = [labelObjReal, ...labels];
        this.setState({ labels: newLabels });
    };


    deleteLabel = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {

        const { labels } = this.state;

        let newLabels = labels.filter((label) => {
            return label.id !== id;
        });

        this.setState({ labels: newLabels });
    };

    private formatFloatingString(stringNumber: string): number {
        return (parseInt((parseFloat(stringNumber) * 1000).toString()) / 1000);
    }


    render() {
        return (
            <div className="label-wrap">
                {
                    this.state.labels.map((label) => {
                        return (
                            <li >
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