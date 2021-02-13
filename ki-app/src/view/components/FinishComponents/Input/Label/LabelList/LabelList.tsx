import React from 'react';
import { LabelItem } from '../LabelItem/LabelItem';
import { Label } from '../LabelItem/types';

interface LabelListProps {
    labels: Label[],
};

export const LabelList: React.FC<LabelListProps> = ({ labels }) => {

    return (
        <ul>
            {labels.map(label => {
                return <LabelItem key={label.name} label={label} />;
            })}
        </ul>
    );
};