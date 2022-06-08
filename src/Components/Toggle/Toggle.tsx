import React, { useRef, useLayoutEffect, useState } from 'react';
import { IToggle, IToggleOption } from '../../Common/Interfaces/IToggle';
import { Option, OptionOverlay, ToggleContainer, ToggleInnerContainer } from '../../Common/Styles/styles';
import horizontalStyles from './Toggle.module.css';
import verticalStyles from './VerticalToggle.module.css';

interface ToggleProps {
    toggle: IToggle;
    handleChange: (id: string, option: IToggleOption) => void;
    allCorrect: boolean;
}

const Toggle: React.FC<ToggleProps> = ({toggle, handleChange, allCorrect}) => {

    // Container element
    const ref = useRef<HTMLDivElement>(null);
    // Text span element
    const spanRef = useRef<HTMLSpanElement>(null);

    const updateStylesheet = (): { [key: string]: string } => {
        const divWidth = ref.current?.offsetWidth;
        const textWidth = spanRef.current?.offsetWidth;

        /* 
        Checks to see if the text element will overlap the container and will then switch the flex styles to the vertical layout
        Could also be done with media queries but this method is more adaptable to the toggle in question
        */
        const updatedStyles = ((textWidth! + 100) >= divWidth!) ? verticalStyles : horizontalStyles;
        return updatedStyles;
    }

    const [styles, setStyles] = useState(updateStylesheet());

    // Effect monitoring the width of the elements
    useLayoutEffect(() => {
        let timeoutId: NodeJS.Timeout;
        
        const resizeListener = (): void => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => setStyles(updateStylesheet()), 100);
        }

        window.addEventListener('resize', resizeListener);
        resizeListener();
        return () => window.removeEventListener('resize', resizeListener);
    }, []);

    return (
        <ToggleContainer>
            <ToggleInnerContainer
                onClick={() => {
                    if (!allCorrect) {
                        const option = toggle.options.find(x => !x.selected);
                        handleChange(toggle.id, option!);
                    }
                }}
            >
                {(toggle.options.length > 2) ? (
                    <React.Fragment>
                        <OptionOverlay 
                            selected={!toggle.options[0].selected || false}
                            noOptions={toggle.options.length}
                        ></OptionOverlay>
                        <Option position='left' selected={toggle.options[0].selected || false}
                        noOptions={toggle.options.length}>
                            <span>{toggle.options[0].name}</span>
                        </Option>
                        <Option position='middle' selected={toggle.options[1].selected || false}
                        noOptions={toggle.options.length}>
                            <span>{toggle.options[1].name}</span>
                        </Option>
                        <Option position='right' selected={toggle.options[2].selected || false}
                        noOptions={toggle.options.length}>
                            <span>{toggle.options[2].name}</span>
                        </Option>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <OptionOverlay 
                            selected={!toggle.options[0].selected || false}
                            noOptions={toggle.options.length}
                        ></OptionOverlay>
                        <Option position='left' selected={toggle.options[0].selected || false}
                        noOptions={toggle.options.length}>
                            <span>{toggle.options[0].name}</span>
                        </Option>
                        <Option position='right' selected={toggle.options[1].selected || false}
                        noOptions={toggle.options.length}>
                            <span>{toggle.options[1].name}</span>
                        </Option>
                    </React.Fragment>
                )}
            </ToggleInnerContainer>
        </ToggleContainer>
    );

    // return (
    //     <div className={styles.container}>
    //         <div className={styles.innerContainer}
    //         onClick={() => {
    //             if (!allCorrect) {
    //                 const option = toggle.options.find(x => !x.selected);
    //                 handleChange(toggle.id, option!);
    //             }
    //         }}
    //         >
    //             <div id={styles.item}
    //                 className={`${styles.item} 
    //                 ${toggle.options[0].selected ? '' : `${styles.itemRight}`}`}
    //             ></div>
    //             <div className={
    //                 `${styles.option} ${styles.left} 
    //                 ${toggle.options[0].selected ? `${styles.selected}` : null}`
    //             }
    //                 ref={ref}
    //                 >
    //                 <span ref={spanRef}>{toggle.options[0].name}</span>
    //             </div> 
    //             <div className={
    //                 `${styles.option} ${styles.right}
    //                 ${toggle.options[1].selected ? `${styles.selected}` : null}`
    //             }>
    //                 <span ref={spanRef}>{toggle.options[1].name}</span>
    //             </div>
    //         </div>
    //     </div>
    // )
};

export default Toggle;