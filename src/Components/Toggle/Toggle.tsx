import * as React from 'react';
import { IToggle, IToggleOption } from '../../Common/Interfaces/IToggle';
import { Option, OptionOverlay, ToggleContainer, ToggleInnerContainer } from '../../Common/Styles/styles';

interface ToggleProps {
    toggle: IToggle;
    handleChange: (id: string, option: IToggleOption) => void;
    allCorrect: boolean;
}

const Toggle: React.FC<ToggleProps> = ({toggle, handleChange, allCorrect}) => {

    const containerElement = React.useRef<HTMLDivElement>(null);
    const textElement = React.useRef<HTMLSpanElement>(null);

    const isOverflow = (): boolean => {
        const containerWidth = containerElement.current?.offsetWidth;
        const textWidth = textElement.current?.offsetWidth;

        /* 
        Checks to see if the text element will overlap the container and will then switch the flex styles to the vertical layout
        Could also be done with media queries but this method is more adaptable to the toggle in question
        */
        return (textWidth! + 100) >= containerWidth!;
    }

    /*
    Boolean state property which returns true if any of the text elements 
    are overflowing their containers in which case the toggle will switch to the vertical alignment
    */
    const [textOverflow, setTextOverflow] = React.useState<boolean>();

    // Effect monitoring the width of the elements
    React.useLayoutEffect(() => {
        let timeoutId: NodeJS.Timeout;
        
        const resizeListener = (): void => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => setTextOverflow(isOverflow), 100);
        }

        window.addEventListener('resize', resizeListener);
        resizeListener();
        return () => window.removeEventListener('resize', resizeListener);
    }, []);

    const handleClick = (index: number) => {
        if (!allCorrect) {
            if (!toggle.options[index].selected) {
                handleChange(toggle.id, toggle.options[index]);
            }
        }
    }

    const findSelectedIndex = (): number => {
        const option = toggle.options.find(x => x.selected);
        if (option) {
            return toggle.options.indexOf(option);
        } else {
            return 0
        }
    }

    return (
        <ToggleContainer>
            <ToggleInnerContainer verticalAlign={textOverflow} noOptions={toggle.options.length}>
                {(toggle.options.length > 2) ? (
                    <React.Fragment>
                        <OptionOverlay 
                            selectedPosition={findSelectedIndex()}
                            noOptions={toggle.options.length}
                            verticalAlign={textOverflow}
                        ></OptionOverlay>
                        <Option 
                            position='left' 
                            selected={toggle.options[0].selected || false}
                            noOptions={toggle.options.length}
                            onClick={() => handleClick(0)}
                            verticalAlign={textOverflow}
                            ref={containerElement}
                        >
                            <span ref={textElement}>{toggle.options[0].name}</span>
                        </Option>
                        <Option 
                            position='middle' 
                            selected={toggle.options[1].selected || false}
                            noOptions={toggle.options.length}
                            onClick={() => handleClick(1)}
                            verticalAlign={textOverflow}
                            ref={containerElement}
                        >
                            <span ref={textElement}>{toggle.options[1].name}</span>
                        </Option>
                        <Option 
                            position='right' selected={toggle.options[2].selected || false}
                            noOptions={toggle.options.length}
                            onClick={() => handleClick(2)}
                            verticalAlign={textOverflow}
                            ref={containerElement}
                        >
                            <span ref={textElement}>{toggle.options[2].name}</span>
                        </Option>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <OptionOverlay 
                            selectedPosition={findSelectedIndex()}
                            noOptions={toggle.options.length}
                            verticalAlign={textOverflow}
                        ></OptionOverlay>
                        <Option 
                            position='left' 
                            selected={toggle.options[0].selected || false}
                            noOptions={toggle.options.length}
                            onClick={() => handleClick(0)}
                            verticalAlign={textOverflow}
                            ref={containerElement}
                        >
                            <span ref={textElement}>{toggle.options[0].name}</span>
                        </Option>
                        <Option 
                            position='right' 
                            selected={toggle.options[1].selected || false}
                            noOptions={toggle.options.length}
                            onClick={() => handleClick(1)}
                            verticalAlign={textOverflow}
                            ref={containerElement}
                        >
                            <span ref={textElement}>{toggle.options[1].name}</span>
                        </Option>
                    </React.Fragment>
                )}
            </ToggleInnerContainer>
        </ToggleContainer>
    );
};

export default Toggle;