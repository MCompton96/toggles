import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IToggle, IToggleOption } from '../../Common/Interfaces/IToggle';
import { TogglesState } from '../../Redux/Reducers/toggle.reducer';
import * as actions from '../../Redux/Actions/toggleActions';
import Toggle from '../Toggle/Toggle';
import styles from './Toggles.module.css';
import { addUniqueIdToToggles, calculateCorrectAnswers } from '../../Common/Helpers/state-helpers';

interface TogglesProps {
    toggles: IToggle[];
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
            return styles.one;
        } else if (correctPct <= 75) {
            return styles.two
        } else {
            return styles.three
        }
    }
    
    return (
            <div className={`${styles.container} ${calcBackground()}`}>
                <h1 className={styles.text}>An animal cell contains:</h1>
                {toggles.map((toggle, i) => (
                    <Toggle
                        key={i}
                        toggle={toggle}
                        handleChange={handleChange}
                    />
                ))}
                <h2 className={styles.text}>The answer is incorrect</h2>
            </div>
    )
};

export default connect(
    state => ({ togglesState: state }),
    dispatch => 
        bindActionCreators(
            {
                setTogglesWithDispatch: actions.setToggles,
                changeToggleWithDispatch: actions.changeToggle
            },
            dispatch
        )
)(Toggles);