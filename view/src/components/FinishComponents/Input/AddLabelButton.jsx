import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default class AddLabelButton extends Component {
    state = { start: '', end: '', name: '' };

    static propTypes = {
        addLabel: PropTypes.func.isRequired
    };

    changeStart = (event) => {
        this.setState({
            start: event.target.value,
        });
    };

    changeEnd = (event) => {
        this.setState({
            end: event.target.value,
        });
    };

    changeName = (event) => {
        this.setState({
            name: event.target.value,
        });
    };

    handleAdd = (event) => {
        const labelObj = { id: nanoid(), name: this.state.name, start: this.state.start, end: this.state.end };
        this.props.addLabel(labelObj);
        this.setState({
            name: '', start: '', end: ''
        });
    };

    render() {
        return (
            <div className="label-header">
                Start: <input onChange={this.changeStart} value={this.state.start} type="text" placeholder="" />
                End: <input onChange={this.changeEnd} value={this.state.end} type="text" placeholder="" />
                Label: <input onChange={this.changeName} value={this.state.name} type="text" placeholder="" />
                <button type="submit" onClick={this.handleAdd}>Add</button>
            </div>
        );
    }
}