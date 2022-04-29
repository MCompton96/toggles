import { IToggle } from "../Interfaces/IToggle";

export const fakeToggles: IToggle[] = [
    {
        options: [
            { name: 'Cell Wall', correct: true, selected: true }, 
            { name: 'Ribosomes', correct: false, selected: false }
        ]
    },
    {
        options: [
            { name: 'Cytoplasm', correct: true, selected: false }, 
            { name: 'Chloroplast', correct: false, selected: true }
        ]
    },
    {
        options: [
            { name: 'Partially permeable membrane', correct: true, selected: true },
            { name: 'Impermeable membrane', correct: false, selected: false }
        ]
    },
    {
        options: [
            { name: 'Mitochondria', correct: true, selected: true }, 
            { name: 'Cellulose', correct: false, selected: false }
        ]
    }
]