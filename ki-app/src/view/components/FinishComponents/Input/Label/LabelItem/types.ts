export type Label = {
    start: number;
    end: number;
    name: string;
    chosen: boolean;
};

export type ToggleLabel = (selectedLabel: Label) => void;

export type AddLabel = (newLabel: string, newStart: number, newEnd: number) => void;