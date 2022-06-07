export interface IToggleGroup {
    toggles: IToggle[];
    question: string;
    layoverImageUrl: string;
}

export interface IToggle {
    id: string;
    options: IToggleOption[];
}

export interface IToggleOption {
    name: string;
    correct: boolean;
    selected?: boolean;
}
