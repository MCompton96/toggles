import React, { useState } from 'react';
import styles from './Toggle.module.css';

interface ToggleProps {
    optionOne: string;
    optionTwo: string;
}

const Toggle: React.FC<ToggleProps> = props => {

    const [oneChosen, setOneChosen] = useState<boolean>(true);
    const [twoChosen, setTwoChosen] = useState<boolean>(false);
    
    const handleCss = (chosen: boolean): string => {
        return `${styles.button} ${chosen ? styles.chosen : null}`;
    }

    const handleClick = (one: boolean): void => {
        setOneChosen(one);
        setTwoChosen(!one);
    }

    return (
        <div className={styles.container}>
            <div 
                className={handleCss(oneChosen)}
                onClick={() => handleClick(true)}
            >
                {props.optionOne}
            </div>
            <div 
                className={handleCss(twoChosen)}
                onClick={() => handleClick(false)}
            >
                {props.optionTwo}
            </div>
        </div>
    )
};

export default Toggle;