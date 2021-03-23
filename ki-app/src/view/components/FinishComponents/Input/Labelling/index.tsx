import React, { Component, ChangeEvent } from 'react';

export default class Labelling extends Component {
    state = {
        labels: [] as { labelID: number, start: number, end: number, name: string; }[],
        newStart: "", newEnd: '', newName: ""
    };

    props = {
        newLabel: function (label: {
            labelID: number;
            start: number;
            end: number;
            name: string;
        }) { },
        pagedeleteLabel: function (label: {
            labelID: number;
            start: number;
            end: number;
            name: string;
        }) { }
    };
    IDcounter: number = 0;

    handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newName: e.target.value });
    };
    handleChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newStart: e.target.value });
    };
    handleChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newEnd: e.target.value });
    };
    handleClick = () => {
        const { newStart, newEnd, newName } = this.state;
        const labelObj = { start: newStart, end: newEnd, name: newName };
        this.addLabel(labelObj);
        this.setState({ newStart: "", newEnd: '', newName: "" });
    };

    addLabel = (labelObj: { start: string, end: string, name: string; }) => {
        const label: { labelID: number, start: number, end: number, name: string; } = { labelID: this.IDcounter, start: this.formatFloatInString(labelObj.start), end: this.formatFloatInString(labelObj.end), name: labelObj.name }; //was ist bei fehlerfall?? keine Zahlen
        this.props.newLabel(label);
        const { labels } = this.state;
        const newLabels = [label, ...labels];
        this.setState({ labels: newLabels });
    };


    deleteLabel = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {

        const { labels } = this.state;

        let newLabels = labels.filter((label) => {
            if (label.labelID === id) {
                this.props.pagedeleteLabel(label);
            }
            return label.labelID !== id;
        });
        this.setState({ labels: newLabels });
    };

    private formatFloatInString(stringNumber: string): number {
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
                                <button onClick={(e) => this.deleteLabel(e, label.labelID)}>Löschen</button>
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