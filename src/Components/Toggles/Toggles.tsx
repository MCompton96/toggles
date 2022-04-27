import React from 'react';
import Toggle from '../Toggle/Toggle';
import styles from './Toggles.module.css';

const Toggles: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.text}>An animal cell contains:</h1>
            <Toggle optionOne='Cell Wall' optionTwo='Ribosomes'/>
            <Toggle optionOne='Cytoplasm' optionTwo='ChloroPlast'/>
        </div>
    )
};

export default Toggles;