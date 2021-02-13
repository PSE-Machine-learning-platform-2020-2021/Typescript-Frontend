import React, { useState, ChangeEvent } from 'react';
import { Label } from './types';

interface LabelItemProps {
    label: Label;
}

export const LabelItem: React.FC<LabelItemProps> = ({ label }) => {

    return (
        <li>
            <label>
                {label.name}{label.start}{label.end}
            </label>
        </li>
    );
};