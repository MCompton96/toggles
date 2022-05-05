import { IToggle } from "../Interfaces/IToggle";
import { v4 } from 'uuid';

export const calculateCorrectAnswers = (toggles: IToggle[]): number => {
    let correct = 0;
    toggles.forEach(toggle => {
        const option = toggle.options.find(x => x.correct);
        if (option?.selected) {
            correct++;
        }
    });

    return correct;
}

export const addUniqueIdToToggles = (toggles: IToggle[]): IToggle[] => {
    return shuffle(toggles.map(toggle => ({...toggle, id: v4() })));
}

// Randomly shuffles the list of properties
const shuffle = (arr: any[]): any[] => {
    return arr.sort(() => Math.random() - 0.5);
}