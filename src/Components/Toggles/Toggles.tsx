import React, { useState } from 'react';
import { IToggle } from '../../Common/Interfaces/IToggle';
import Toggle from '../Toggle/Toggle';
import styles from './Toggles.module.css';

interface TogglesProps {
    toggles: IToggle[];
}

const Toggles: React.FC<TogglesProps> = props => {

    const handleChange = (option: string, index: number): void => {

    }
    
    return (
        <div className={styles.container}>
            <h1 className={styles.text}>An animal cell contains:</h1>
            {props.toggles.map((toggle, i) => (
                <Toggle 
                optionOne={toggle.options[0].name} 
                optionTwo={toggle.options[1].name}
                />
            ))}
            <h2 className={styles.text}>The answer is incorrect</h2>
        </div>
    )
};

export default Toggles;