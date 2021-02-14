import React, { Component, useState } from 'react';
import { Label, AddLabel } from './LabelItem/types';
import LabelItem from './LabelItem/LabelItem';
import LabelList from './LabelList/LabelList';
import AddLabelForm from './AddLabel/AddLabelForm';

interface IProps {
    addLabel: (label: { id: string, start: Number, end: Number, name: string; }) => void;
    deleteLabel: (id: string) => void;
}

export default class Labelling extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    state = {
        labels: [
            { id: '', start: new Number, end: new Number, name: "" },
        ]
    };


    addLabel = (label: { id: string, start: Number, end: Number, name: string; }) => {

        let labels = this.state.labels;

        let newLabels = [label, ...labels];

        this.setState({ labels: newLabels });
    };

    deleteLabel = (id: string) => {

        let labels = this.state.labels;

        let newLabels = labels.filter((label) => {
            return label.id !== id;
        });

        this.setState({ labels: newLabels });
    };


    render() {
        let labels = this.state;
        return (
            <div className="label-container">
                <div className="label-wrap">
                    <LabelList labels={this.state.labels} addLabel={this.addLabel} deleteLabel={this.deleteLabel} />
                    <AddLabelForm addLabel={this.addLabel} deleteLabel={this.deleteLabel} />
                </div>
            </div>
        );
    }
}