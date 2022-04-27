import React, { useState } from 'react';
import styles from './Toggle.module.css';

interface ToggleProps {
    optionOne: string;
    optionTwo: string;
}

const Toggle: React.FC<ToggleProps> = props => {

    const [one, setOne] = useState<boolean>(true);
    const [two, setTwo] = useState<boolean>(false);
    
    const handleCss = (chosen: boolean): string => {
        return `${styles.button} ${chosen ? styles.chosen : null}`;
    }

    const handleClick = (oneSelected: boolean): void => {
        setOne(oneSelected);
        setTwo(!oneSelected);
    }

    return (
        <div className={styles.container}>
            <div 
                className={handleCss(one)}
                onClick={() => handleClick(true)}
            >
                {props.optionOne}
            </div>
            <div 
                className={handleCss(two)}
                onClick={() => handleClick(false)}
            >
                {props.optionTwo}
            </div>
        </div>
    )
};

export default Toggle;