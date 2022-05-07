import React, { useState } from 'react';
import { IInputToggle, IToggle, IToggleOption } from '../../Common/Interfaces/IToggle';
import styles from './Toggles.module.css';
import Toggle from '../Toggle/Toggle';
import ColorHelpers from '../../Common/Helpers/color-helpers';
import StateHelpers from '../../Common/Helpers/state-helpers';

interface TogglesProps {
    toggles: IInputToggle[];
    question: string;
    layoverImageUrl: string;
}

const Toggles: React.FC<TogglesProps> = props => {

    const stateHelpers = new StateHelpers();

    const refactoredToggles = stateHelpers.addUniqueIdToToggles(props.toggles);

    const [toggles, setToggles] = useState<IToggle[]>(refactoredToggles);
    const [correct, setCorrect]= useState<number>(stateHelpers.calculateCorrectAnswers(refactoredToggles));

    const colorHelpers = new ColorHelpers();

    const handleChange = (id: string, selectedOption: IToggleOption): void => {
        const updatedToggles = toggles.map(toggle => {
            return toggle.id === id ?
            // Find the relevant toggle
            {
                ...toggle,
                options: toggle!.options.map(option => {
                    // Update the toggle options to show the correct one selected
                    return option.name === selectedOption.name ? 
                    {...option, selected: true } : {...option, selected: false};
                })
            } : toggle
        });
        setToggles(updatedToggles);
        setCorrect(stateHelpers.calculateCorrectAnswers(updatedToggles));
    }

    const allCorrect = stateHelpers.calculateCorrectPercentage(toggles) === 100;

    return (
            <React.Fragment>
                <div className={styles.img}>
                    <img src={props.layoverImageUrl} alt="Layover" />
                </div>
                <div className={
                    `${styles.container} ${allCorrect ? `${styles.hide}` : null}`
                }
                style={{
                    background: colorHelpers.getBackground(toggles.length, correct)
                }}>
                    <h1 className={styles.text}>{props.question}:</h1>
                        {toggles.map(toggle => (
                            <Toggle
                                key={toggle.id}
                                toggle={toggle}
                                handleChange={handleChange}
                                allCorrect={allCorrect}
                            />
                        ))}
                    <h2 className={styles.text}>The answer is {correct / toggles.length === 1 ? 'correct!': 'incorrect'}</h2>
                </div>
            </React.Fragment>
    )
};

export default Toggles;