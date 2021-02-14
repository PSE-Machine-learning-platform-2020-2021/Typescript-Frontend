import React, { useState } from 'react';
import { Label, AddLabel } from './LabelItem/types';
import { LabelList } from './LabelList/LabelList';
import { AddLabelForm } from './AddLabel/AddLabelForm';

const initialLabels: Label[] = [

];

const Labelling: React.FC = () => {
    const [labels, setLabels] = useState(initialLabels);
    const addLabel: AddLabel = (newLabel: string, newStart: number, newEnd: number) => {
        if (newLabel.trim() === '')
            return;
        setLabels([
            ...labels,
            {
                name: newLabel,
                start: newStart,
                end: newEnd
            }
        ]);
    };
    return (
        <div>
            <LabelList labels={labels} />
            <AddLabelForm addLabel={addLabel} />
        </div>
    );
};

export default Labelling;