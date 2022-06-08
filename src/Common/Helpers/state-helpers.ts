import { IToggle, IToggleOption } from "../Interfaces/IToggle";

export const calculateCorrectAnswers = (toggles: IToggle[]): number => {
    let correct = 0;

    if (toggles.length > 0) {
        toggles.forEach(toggle => {
            const option = toggle.options.find(x => x.correct);
            if (option?.selected) {
                correct++;
            }
        });
    }
    return correct;
}

export const initialiseToggles = (toggles: IToggle[]): IToggle[] => {
    let refactoredToggles = shuffle(toggles.map(toggle => (
        {
            ...toggle,
            // Selected options randomly shuffled as wel
            options: randomlyAllocateSelected(toggle.options) 
        }
    )));

    let correctPct = calculateCorrectPercentage(refactoredToggles);

    /* 
    Check to make sure that the toggles list is not rendered if over half
    of the correct options are pre-selected
    */ 
    while (correctPct > 50) {
        refactoredToggles = shuffle(refactoredToggles.map(toggle => (
            {
                ...toggle, 
                options: randomlyAllocateSelected(toggle.options)
        })));
        correctPct = calculateCorrectPercentage(refactoredToggles);
    }

    return refactoredToggles.sort();
}

export const calculateCorrectPercentage = (toggles: IToggle[]): number => {
    return toggles.length > 0 ? 
    (calculateCorrectAnswers(toggles) / toggles.length) * 100 
    : 0;
}

const randomlyAllocateSelected = (options: IToggleOption[]): IToggleOption[] => {
    const randomBoolean = Math.random() < 0.5;
    return options.map((option, i) => {
        if (i === 0) {
            return {
                ...option,
                selected: randomBoolean
            }
        } else {
            return {
                ...option, 
                selected: !randomBoolean
            }
        }
    })
}

const shuffle = (arr: any[]): any[] => {
    return arr.sort(() => Math.random() - 0.5);
}