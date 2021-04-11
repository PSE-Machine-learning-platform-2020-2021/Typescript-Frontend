import React, { Component, ChangeEvent } from 'react';
import { NotificationManager } from 'react-notifications';
import './index.css'

export default class Labelling extends Component {
    private static readonly E_MISSING_DE: string = "Das Labelzeitfenster muss bestimmt werden!";
    private static readonly E_NAME_MISSING_DE: string = "Das Labelzeitfenster braucht einen Namen!";
    private static readonly E_TIME_INVALID_DE: string = "Das Labelzeitfenster muss mit einer Start und Endzeit bestimmt werden,\n die Angabe ist in Sekunden.";
    private static readonly T_BUTTON_DELETE_DE: string = "Löschen";
    private static readonly T_BUTTON_ADD_DE: string = "Label hinzufügen";
    private static readonly T_TIME_FROM_DE: string = "Von";
    private static readonly T_TIME_TO_DE: string = "bis";
    private static readonly T_LABEL_START_DE: string = "Start";
    private static readonly T_LABEL_END_DE: string = "Ende";
    private static readonly T_LABEL_NAME_DE: string = "Label-Name";

    state = {
        labels: [] as { labelID: number, start: number, end: number, name: string; }[],
        newStart: "", newEnd: '', newName: ""
    };

    props = {
        //die Funktion für neues Label hinzuzufügen, durch props übermittelt
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
     * füge das eingegebene Label hinzu
     */
    addLabel = (labelObj: { start: string, end: string, name: string; }) => {
        if (labelObj.start === "" || labelObj.end === "") {
            NotificationManager.error(Labelling.E_MISSING_DE);
            return;
        }
        if (labelObj.name === "") {
            NotificationManager.error(Labelling.E_NAME_MISSING_DE);
            return;
        }
        labelObj.start = labelObj.start.replace(",", ".");
        labelObj.end = labelObj.end.replace(",", ".");
        let start = this.formatFloatInString(labelObj.start);
        let end = this.formatFloatInString(labelObj.end);
        if (start === NaN && end === NaN) {
            NotificationManager.success(Labelling.E_TIME_INVALID_DE);
            return;
        }
        const label: { labelID: number, start: number, end: number, name: string; } = {
            labelID: this.IDcounter,
            start: start,
            end: end,
            name: labelObj.name
        };
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
                                {Labelling.T_TIME_FROM_DE} {label.start} s {Labelling.T_TIME_TO_DE} {label.end} s:  {label.name}
                                <button className='delete' onClick={(e) => this.deleteLabel(e, label.labelID)}>{Labelling.T_BUTTON_DELETE_DE}</button>
                            </li>
                        );
                    })}
                <div>
                    {Labelling.T_LABEL_START_DE}:
                        <input type="text" value={this.state.newStart} onChange={this.handleChangeStart} /><br />

                    {Labelling.T_LABEL_END_DE}:
                        <input type="text" value={this.state.newEnd} onChange={this.handleChangeEnd} /><br />

                    {Labelling.T_LABEL_NAME_DE}:
                        <input type="text" value={this.state.newName} onChange={this.handleChangeLabel} />
                    <br />

                    <button className='add' type="button" onClick={() => this.handleClick()}>{Labelling.T_BUTTON_ADD_DE}</button>
                </div>

            </div>
        );
    }
}