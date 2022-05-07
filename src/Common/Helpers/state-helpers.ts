import { IInputToggle, IInputToggleOption, IToggle, IToggleOption } from "../Interfaces/IToggle";
import { v4 } from 'uuid';

export default class StateHelpers {
    public calculateCorrectAnswers = (toggles: IToggle[]): number => {
        let correct = 0;
        toggles.forEach(toggle => {
            const option = toggle.options.find(x => x.correct);
            if (option?.selected) {
                correct++;
            }
        });
    
        return correct;
    }

    public addUniqueIdToToggles = (toggles: IInputToggle[]): IToggle[] => {
        let refactoredToggles = this.shuffle(toggles.map(toggle => (
            {
                ...toggle,
                // Each toggle given a unique guid to help with list iteration 
                id: v4(),
                // Selected options randomly shuffled as wel
                options: this.randomlyAllocateSelected(toggle.options) 
            }
        )));

        let correctPct = this.calculateCorrectPercentage(refactoredToggles);

        /* 
        Check to make sure that the toggles list is not rendered if over half
        of the correct options are pre-selected
        */ 
        while (correctPct > 50) {
            refactoredToggles = this.shuffle(refactoredToggles.map(toggle => (
                {
                    ...toggle, 
                    options: this.randomlyAllocateSelected(toggle.options)
            })));
            correctPct = this.calculateCorrectPercentage(refactoredToggles);
        }

        return refactoredToggles.sort();
    }
    
    public calculateCorrectPercentage = (toggles: IToggle[]): number => {
        return (this.calculateCorrectAnswers(toggles) / toggles.length) * 100;
    }

    private randomlyAllocateSelected = (options: IInputToggleOption[]): IToggleOption[] => {
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


    // Helper function for randomly shuffling a list
    private shuffle = (arr: any[]): any[] => {
        return arr.sort(() => Math.random() - 0.5);
    }
}