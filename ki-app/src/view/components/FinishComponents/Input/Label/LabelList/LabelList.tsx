import React from 'react';
import { LabelItem } from '../LabelItem/LabelItem';
import { Label, ToggleLabel } from '../LabelItem/types';

interface LabelListProps {
    labels: Label[],
    toggleLabel: ToggleLabel;
};

export const LabelList: React.FC<LabelListProps> = ({ labels, toggleLabel }) => {
    return (
        <ul>
            {labels.map(label => {
                return <LabelItem key={label.name} label={label} toggleLabel={toggleLabel} />;
            })}
        </ul>
    );
};