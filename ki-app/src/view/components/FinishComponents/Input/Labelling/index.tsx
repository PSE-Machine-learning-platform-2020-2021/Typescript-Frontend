import React, { Component, ChangeEvent } from 'react';
import { NotificationManager } from 'react-notifications';

export default class Labelling extends Component {
    state = {
        labels: [] as { labelID: number, start: number, end: number, name: string; }[],
        newStart: "", newEnd: '', newName: ""
    };

    props = {
        //die Funktion für neues Label zu addieren, durch props übermittelt
        newLabel: function (label: {
            labelID: number;
            start: number;
            end: number;
            name: string;
        }) { },
        //die Funktion für Label zu löschen, durch props übermittelt
        pagedeleteLabel: function (label: {
            labelID: number;
            start: number;
            end: number;
            name: string;
        }) { }
    };
    IDcounter: number = 0; //berechnet ID von Label

    /**
     * aktualisiert den State zu den eingegebenen Label-Namen
     * @param e Eingabeaktion
     */
    handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newName: e.target.value });
    };

    /**
     * aktualisiert den State zu dem eingegebenen Zeitfenstersanfang
     * @param e Eingabeaktion
     */
    handleChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newStart: e.target.value });
    };

    /**
     * aktualisiert den State zu dem eingegebenen Zeitfenstersende
     * @param e Eingabeaktion
     */
    handleChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ newEnd: e.target.value });
    };

    /**
     * anrufe die Addierenmethode und leere die Eingabefelder
     */
    handleClick = () => {
        const { newStart, newEnd, newName } = this.state;
        const labelObj = { start: newStart, end: newEnd, name: newName };
        this.addLabel(labelObj);
        this.setState({ newStart: "", newEnd: '', newName: "" });
    };

    /**
     * addiere das eingegebene Label
     */
    addLabel = (labelObj: { start: string, end: string, name: string; }) => {
        if (labelObj.start === "" || labelObj.end === "") {
            NotificationManager.error("Das Labelzeitfenster muss bestimmt werden!");
            return;
        }
        if (labelObj.name === "") {
            NotificationManager.error("Das Labelzeitfenster braucht einen Namen!");
            return;
        }
        labelObj.start = labelObj.start.replace(",", ".");
        labelObj.end = labelObj.end.replace(",", ".");
        let start = this.formatFloatInString(labelObj.start);
        let end = this.formatFloatInString(labelObj.end);
        if (start === NaN && end === NaN) {
            NotificationManager.success("Das Labelzeitfenster muss mit einer Start und Endzeit bestimmt werden,\n die Angabe ist in Sekunden.");
            return;
        }
        const label: { labelID: number, start: number, end: number, name: string; } = {
            labelID: this.IDcounter,
            start: start,
            end: end,
            name: labelObj.name
        }; //was ist bei fehlerfall?? keine Zahlen
        this.props.newLabel(label);
        const { labels } = this.state;
        const newLabels = [label, ...labels];
        this.setState({ labels: newLabels });
    };

    /**
     * lösche das entsprechende Label
     * @param e die Klickaktion
     * @param id ID von dem Label, das gelöscht wird
     */
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

    /**
     * verwandelt String zur Nummer
     * @param stringNumber das String, das verwandelt wird
     * @returns die entsprechende Nummer
     */
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
                                <button className='delete' onClick={(e) => this.deleteLabel(e, label.labelID)}>Löschen</button>
                            </li>
                        );
                    })}
                <div>
                    Start:
                        <input type="text" value={this.state.newStart} onChange={this.handleChangeStart} /><br />

                    End:
                        <input type="text" value={this.state.newEnd} onChange={this.handleChangeEnd} /><br />

                    Label:
                        <input type="text" value={this.state.newName} onChange={this.handleChangeLabel} />
                    <br />

                    <button className='add' type="button" onClick={() => this.handleClick()}>Add Label</button>
                </div>

            </div>
        );
    }
}