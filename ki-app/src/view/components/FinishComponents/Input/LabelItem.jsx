import React, { Component } from 'react';

export default class LabelItem extends Component {
    state = { mouse: false }; //check mouse on item
    handleMouse = (flag) => {
        return () => {
            this.setState({ mouse: flag });
        };
    };
    //choose check
    handleCheck = (id) => {
        return (event) => {
            this.props.updateLabel(id, event.target.checked);
        };
    };
    //delete label
    handleDelete = (id) => {
        if (window.confirm('Are you sure to delete this label?')) {
            this.props.deleteLabel(id);
        }
    };


    render() {
        const { id, name, chosen, start, end } = this.props;
        const { mouse } = this.state;
        return (
            <li style={{ backgroundColor: mouse ? '#ddd' : 'white' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
                <label>
                    <input type="checkbox" checked={chosen} onChange={this.handleCheck(id)} />
                    <span>{name}:from {start}s to {end}s</span>
                </label>
                <button onClick={() => this.handleDelete(id)} className="btn-item" style={{ display: mouse ? 'block' : 'none' }}>delete</button>
            </li>
        );
    }
}
