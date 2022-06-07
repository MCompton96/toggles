import * as React from 'react';
import { IToggle, IToggleOption } from '../../Common/Interfaces/IToggle';
import styles from './Toggles.module.css';
import Toggle from '../Toggle/Toggle';
import { getBackground } from '../../Common/Helpers/color-helpers';
import { calculateCorrectAnswers, calculateCorrectPercentage, initialiseToggles } from '../../Common/Helpers/state-helpers';
import { getToggles } from '../../Common/Services/toggle.service';

interface TogglesProps {}

interface ITogglesState {
    toggles: IToggle[];
    question?: string;
    layoverImageUrl?: string;
    correct?: number;
    allCorrect?: boolean;
    isLoading: boolean;
    isError: boolean;
}

const initialState: ITogglesState = {
    isLoading: true,
    isError: false,
    toggles: []
}

const Toggles: React.FC<TogglesProps> = props => {
    const [data, setData] = React.useState<ITogglesState>(initialState);

    React.useEffect(() => {
        fetchToggles();
    }, [])

    const fetchToggles = async () => {
        try {
            await getToggles()
                .then(({toggles, question, layoverImageUrl})=> {
                    setData({
                        toggles: initialiseToggles(toggles),
                        question,
                        layoverImageUrl,
                        correct: calculateCorrectAnswers(toggles),
                        allCorrect: calculateCorrectPercentage(toggles) === 100,
                        isError: false, 
                        isLoading: false
                    })
                })
        } catch {
            setData(d => ({
                ...d,
                isError: true,
                isLoading: false
            }))
        }
    }

    const handleChange = (id: string, selectedOption: IToggleOption): void => {
        const updatedToggles = data.toggles.map(toggle => {
            return toggle.id === id ?
            // Find the relevant toggle
            {
                ...toggle,
                options: toggle.options.map(option => {
                    // Update the toggle options to show the correct one selected
                    return option.name === selectedOption.name ? 
                    {...option, selected: true } : {...option, selected: false};
                })
            } : toggle
        });
        setData(d => ({
            ...d,
            toggles: updatedToggles,
            correct: calculateCorrectAnswers(updatedToggles),
            allCorrect: calculateCorrectPercentage(updatedToggles) === 100
        }))
    }

    return (
            <React.Fragment>
                <div className={
                    `${styles.container} ${data.allCorrect ? `${styles.hide}` : null}`
                }
                style={{
                    background: getBackground(data.toggles.length, data.correct! || 0)
                }}>
                    {data.isLoading && <p>Fetching data</p>}
                    {!data.isLoading && (
                        <React.Fragment>
                            <h1 className={styles.text}>{data.question || ''}:</h1>
                                {data.toggles.map(toggle => (
                                    <Toggle
                                        key={toggle.id}
                                        toggle={toggle}
                                        handleChange={handleChange}
                                        allCorrect={data.allCorrect || false}
                                    />
                                ))}
                            <h2 className={styles.text}>The answer is {(data.correct || 0) / data.toggles.length=== 1 ? 'correct!': 'incorrect'}</h2>
                        </React.Fragment>
                    )}
                </div>
                <div className={styles.img} style={{display: `${data.allCorrect ? 'block': 'none'}`}}>
                    <img src={data.layoverImageUrl || ''} alt="Layover" />
                </div>
            </React.Fragment>
    )
};

export default Toggles;