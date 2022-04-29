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
    return toggles.map(toggle => ({...toggle, id: v4() }))
}