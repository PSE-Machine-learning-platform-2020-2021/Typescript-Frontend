import React from 'react';
import { Label, ToggleLabel } from './types';

interface LabelItemProps {
    label: Label;
    toggleLabel: ToggleLabel;
}

export const LabelItem: React.FC<LabelItemProps> = ({ label }) => {
    return (
        <li>
            <label className={label.chosen ? "chosen" : undefined}>
                <input type="checkbox" checked={label.chosen} />
                {label.name}
            </label>
        </li>
    );
};