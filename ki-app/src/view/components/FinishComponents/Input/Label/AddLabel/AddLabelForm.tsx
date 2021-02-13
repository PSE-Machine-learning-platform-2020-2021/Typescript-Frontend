import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AddLabel } from '../LabelItem/types';

interface AddLabelFormProps {
    addLabel: AddLabel;
};

export const AddLabelForm: React.FC<AddLabelFormProps> = ({ addLabel }) => {
    const [newLabel, setNewLabel] = useState('');

    const [newStart, setNewStart] = useState('');

    const [newEnd, setNewEnd] = useState('');

    const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
        setNewLabel(e.target.value);
    };
    const handleChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStart(e.target.value);
    };
    const handleChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
        setNewEnd(e.target.value);
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addLabel(newLabel, +newStart, +newEnd);
        setNewLabel('');
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={newLabel} onChange={handleChangeLabel} />
            <input type="text" value={newStart} onChange={handleChangeStart} />
            <input type="text" value={newEnd} onChange={handleChangeEnd} />
            <button type="submit">Add Label</button>
        </form>
    );
};