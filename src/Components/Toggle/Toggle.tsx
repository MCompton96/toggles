import React from 'react';
import { IToggle, IToggleOption } from '../../Common/Interfaces/IToggle';
import styles from './Toggle.module.css';

interface ToggleProps {
    toggle: IToggle;
    handleChange: (id: string, option: IToggleOption) => void;
    toggleClass: string;
}

const Toggle: React.FC<ToggleProps> = ({toggle, handleChange, toggleClass}) => {

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}
            onClick={() => {
                const option = toggle.options.find(x => !x.selected);
                handleChange(toggle.id!, option!);
            }}
            >
                <div id={styles.item}
                    className={`${styles.item} 
                    ${toggle.options[0].selected ? '' : `${styles.itemRight}`}`}
                ></div>
                <div className={
                    `${styles.option} ${styles.left} 
                    ${toggle.options[0].selected ? `${styles.selected}` : null}`
                    }>
                    <span>{toggle.options[0].name}</span>
                </div>
                <div className={
                    `${styles.option} ${styles.right}
                    ${toggle.options[1].selected ? `${styles.selected}` : null}`
                }>
                    <span>{toggle.options[1].name}</span>
                </div>
            </div>
        </div>
    )
};

export default Toggle;