import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IToggle } from '../../Common/Interfaces/IToggle';
import { TogglesState } from '../../Redux/Reducers/toggle.reducer';
import * as actions from '../../Redux/Actions/toggleActions';
import Toggle from '../Toggle/Toggle';
import styles from './Toggles.module.css';
import { addUniqueIdToToggles, calculateCorrectAnswers } from '../../Common/Helpers/state-helpers';

interface TogglesProps {
    toggles: IToggle[];
}

const Toggles: React.FC<TogglesProps> = props => {

    const [toggles, setToggles] = useState<IToggle[]>(addUniqueIdToToggles(props.toggles));
    const [correct, setCorrect]= useState<number>(calculateCorrectAnswers(props.toggles));
    
    return (
            <div className={styles.container}>
                <h1 className={styles.text}>An animal cell contains:</h1>
                <h1 className={styles.text}>{correct}</h1>
                {toggles.map((toggle, i) => (
                    <Toggle 
                        toggle={toggle}
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