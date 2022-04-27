export interface IToggle {
    options: IToggleOption[];
}

export interface IToggleOption {
    name: string;
    correct: boolean;
}