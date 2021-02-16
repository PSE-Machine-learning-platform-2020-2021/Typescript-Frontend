import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabelItem from '../LabelItem/LabelItem';

interface IProps {
    deleteLabel: (id: string) => void;
    labels: { id: string, start: number, end: number, name: string; }[];
}

export default class LabelList extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    state = {
        labels: [{ start: 0, end: 0, name: "" }],
    };


    render() {
        return (
            <ul className="todo-main">
                {
                    this.props.labels.map((label: { id: string, start: Number, end: Number, name: string; }) => {
                        <LabelItem key={label.id} {...label} deleteLabel={this.props.deleteLabel} />;
                    })
                }
            </ul>
        );
    }
};