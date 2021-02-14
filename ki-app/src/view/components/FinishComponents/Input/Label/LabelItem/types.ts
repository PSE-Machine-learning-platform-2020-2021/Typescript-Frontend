export type Label = {
    start: number;
    end: number;
    name: string;
};

export type AddLabel = (newLabel: string, newStart: number, newEnd: number) => void;
export type DeleteLabel = () => void;