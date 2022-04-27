import { IToggle } from "../Interfaces/IToggle";

export const fakeToggles: IToggle[] = [
    {
        options: [{ name: 'Cell Wall', correct: true }, { name: 'Ribosomes', correct: false }]
    },
    {
        options: [{ name: 'Cytoplasm', correct: true }, { name: 'Chloroplast', correct: false }]
    },
    {
        options: [{ name: 'Partially permeable membrane', correct: true }, { name: 'Impermeable membrane', correct: false }]
    },
    {
        options: [{ name: 'Mitochondria', correct: true }, { name: 'Cellulose', correct: false }]
    }
]