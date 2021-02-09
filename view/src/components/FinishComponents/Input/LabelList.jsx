import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabelItem from './LabelItem';

export default class LabelList extends Component {

    static propTypes = {
        labels: PropTypes.array.isRequired,
        deleteLabel: PropTypes.func.isRequired,
    };

    render() {
        const { labels, deleteLabel } = this.props;
        return (
            <ul class="label-main">
                {
                    labels.map(label => {
                        return <LabelItem key={label.id} {...label} deleteLabel={deleteLabel} />;
                    })
                }
            </ul>
        );
    }
}
