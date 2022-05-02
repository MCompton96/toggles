import React, { useState } from 'react';
import { IToggle, IToggleOption } from '../../Common/Interfaces/IToggle';
import styles from './Toggles.module.css';
import { addUniqueIdToToggles, calculateCorrectAnswers } from '../../Common/Helpers/state-helpers';
import Toggle from '../Toggle/Toggle';
import { IColorRgb } from '../../Common/Interfaces/IColorRgb';
import { calcRbgBackground, getBackground } from '../../Common/Helpers/color-helpers';
import { bottomEndColor, bottomStartColor, topEndColor, topStartColor } from '../../Common/Data/color-data';

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

    return (
            <div className={`${styles.container} ${styles[calcBackground()]}`}
             style={{
                 background: getBackground(toggles.length, correct)
             }}>
                <h1 className={styles.text}>{props.question}:</h1>
                {toggles.map((toggle, i) => (
                    <Toggle
                        key={i}
                        toggle={toggle}
                        handleChange={handleChange}
                        toggleClass={calcBackground()}
                    />
                ))}
                <h2 className={styles.text}>The answer is {correct / toggles.length === 1 ? 'correct!': 'incorrect'}</h2>
            </div>
    )
};

export default Toggles;