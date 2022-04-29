import React, { useState } from 'react';
import { IToggle, IToggleOption } from '../../Common/Interfaces/IToggle';
import styles from './Toggle.module.css';

interface ToggleProps {
    toggle: IToggle;
    // handleClick: (id: string, option: IToggleOption) => 
}

const Toggle: React.FC<ToggleProps> = ({toggle}) => {

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
            {toggle.options.map(option => (
                <div 
                    className={handleCss(option.selected)}
                    onClick={() => handleClick(true)}
                >
                    {option.name}
                </div>
            ))}
        </div>
    )
};

export default Toggle;