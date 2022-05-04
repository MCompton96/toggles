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
        <div className={styles.switchButton} data-before={toggle.options[1].name}>
            <input 
                type="checkbox" 
                className={styles.switchCheckbox} 
                checked={toggle.options[1].selected}
                onClick={() => {
                    const option = toggle.options.find(x => !x.selected);
                    handleChange(toggle.id!, option!);
                }}
            />
            <label htmlFor="" className={styles.switchLabel}>
                <span className={styles.switchSpan}>{toggle.options[0].name}</span>
            </label>
        </div>
    )
};

export default Toggle;