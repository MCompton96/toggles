export interface IToggle {
    id?: string;
    options: IToggleOption[];
}

export interface IToggleOption {
    name: string;
    correct: boolean;
    selected: boolean;
}