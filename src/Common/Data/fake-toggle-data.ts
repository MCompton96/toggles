import { IInputToggle } from "../Interfaces/IToggle";

export const fakeToggles: IInputToggle[] = [
    {
        options: [
            { name: 'Cell Wall', correct: false }, 
            { name: 'Ribosomes', correct: true }
        ]
    },
    {
        options: [
            { name: 'Cytoplasm', correct: true }, 
            { name: 'Chloroplast', correct: false }
        ]
    },
    {
        options: [
            { name: 'Impermeable membrane', correct: false },
            { name: 'Partially permeable membrane', correct: true }
        ]
    },
    {
        options: [
            { name: 'Mitochondria', correct: true},
            { name: 'Cellulose', correct: false}
        ]
    }
];