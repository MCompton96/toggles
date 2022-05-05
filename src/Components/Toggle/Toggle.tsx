import React, { useRef, useLayoutEffect, useState } from 'react';
import { IToggle, IToggleOption } from '../../Common/Interfaces/IToggle';
import horizontalStyles from './Toggle.module.css';
import verticalStyles from './VerticalToggle.module.css';

interface ToggleProps {
    toggle: IToggle;
    handleChange: (id: string, option: IToggleOption) => void;
    allCorrect: boolean;
}

const Toggle: React.FC<ToggleProps> = ({toggle, handleChange, allCorrect}) => {

    const ref = useRef<HTMLDivElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    const updateStylesheet = (): { [key: string]: string } => {
        const divWidth = ref.current?.offsetWidth;
        const textWidth = spanRef.current?.offsetWidth;

        const updatedStyles = ((textWidth! + 25) >= divWidth!) ? verticalStyles : horizontalStyles;
        return updatedStyles;
    }

    const [styles, setStyles] = useState(updateStylesheet());

    useLayoutEffect(() => {
        let timeoutId: NodeJS.Timeout;
        
        const resizeListener = (): void => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => setStyles(updateStylesheet()), 250);
        }

        window.addEventListener('resize', resizeListener);
        resizeListener();
        return () => window.removeEventListener('resize', resizeListener);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}
            onClick={() => {
                if (!allCorrect) {
                    const option = toggle.options.find(x => !x.selected);
                    handleChange(toggle.id!, option!);
                }
            }}
            >
                <div id={styles.item}
                    className={`${styles.item} 
                    ${toggle.options[0].selected ? '' : `${styles.itemRight}`}`}
                ></div>
                <div className={
                    `${styles.option} ${styles.left} 
                    ${toggle.options[0].selected ? `${styles.selected}` : null}`
                }
                    ref={ref}
                    >
                    <span ref={spanRef}>{toggle.options[0].name}</span>
                </div>
                <div className={
                    `${styles.option} ${styles.right}
                    ${toggle.options[1].selected ? `${styles.selected}` : null}`
                }>
                    <span ref={spanRef}>{toggle.options[1].name}</span>
                </div>
            </div>
        </div>
    )
};

export default Toggle;