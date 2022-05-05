import React, { useState } from 'react';
import { IToggle, IToggleOption } from '../../Common/Interfaces/IToggle';
import styles from './Toggles.module.css';
import { addUniqueIdToToggles, calculateCorrectAnswers } from '../../Common/Helpers/state-helpers';
import Toggle from '../Toggle/Toggle';
import { getBackground } from '../../Common/Helpers/color-helpers';

interface TogglesProps {
    toggles: IToggle[];
    question: string;
}

const Toggles: React.FC<TogglesProps> = props => {

    const [toggles, setToggles] = useState<IToggle[]>(addUniqueIdToToggles(props.toggles).sort());
    const [correct, setCorrect]= useState<number>(calculateCorrectAnswers(props.toggles));

    const handleChange = (id: string, option: IToggleOption): void => {
        const updatedToggles = toggles.map(toggle => {
            return toggle.id === id ?
            {
                ...toggle,
                options: toggle!.options.map(x => {
                    return x.name === option.name ? 
                    {...x, selected: true } : {...x, selected: false};
                })
            } : toggle
        });
        setToggles(updatedToggles);
        setCorrect(calculateCorrectAnswers(updatedToggles));
    }

    const calcBackground = (): string => {
        const correctPct = (correct / toggles.length) * 100;
        if (correctPct <= 50) {
            return 'one';
        } else if (correctPct <= 75) {
            return 'two';
        } else {
            return 'three';
        }
    }

    const allCorrect = correct / toggles.length === 1;

    return (
            <React.Fragment>
                <div className={styles.img}>
                    <img src="job.gif" alt="Job loading" />
                </div>
                <div className={
                    `${styles.container} ${styles[calcBackground()]} ${allCorrect ? `${styles.hide}` : null}`
                }
                style={{
                    background: getBackground(toggles.length, correct)
                }}>
                    <h1 className={styles.text}>{props.question}:</h1>
                    {toggles.map((toggle, i) => (
                        <Toggle
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