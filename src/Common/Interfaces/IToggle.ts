export interface IInputToggle {
    options: IInputToggleOption[];
}

export interface IToggle {
    id: string;
    options: IToggleOption[];
}

export interface IInputToggleOption {
    name: string,
    correct: boolean
}

export interface IToggleOption extends IInputToggleOption {
    selected: boolean;
}

