import React from 'react';
import { IToggle, IToggleOption } from '../../Common/Interfaces/IToggle';
import styles from './Toggle.module.css';

interface ToggleProps {
    toggle: IToggle;
    handleChange: (id: string, option: IToggleOption) => void;
    toggleClass: string;
}

const Toggle: React.FC<ToggleProps> = ({toggle, handleChange, toggleClass}) => {

    const handleCss = (chosen: boolean): string => {
        return `${styles.button} ${chosen ? styles[toggleClass] : null}`;
    }

    return (
        <div className={`${styles.container} ${styles[toggleClass + 'Border']}`}>
            {toggle.options.map(option => (
                <div 
                    className={handleCss(option.selected)}
                    onClick={() => handleChange(toggle.id!, option)}
                >
                    {option.name}
                </div>
            ))}
        </div>
    )
};

export default Toggle;