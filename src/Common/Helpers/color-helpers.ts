import { leastCorrectBottom, leastCorrectTop, mostCorrectBottom, mostCorrectTop } from "../Data/color-data";
import { IColorRgb } from "../Interfaces/IColorRgb";

export const getBackground = (noQuestions: number, correct: number): string => {
    if (correct / noQuestions === 1 || noQuestions === 0) {
        // Returns the blue correct background
        return 'linear-gradient(180deg, #76E0C2 0%, #59CADA 100%)';
    }
    
    const bottomRgb = calcRbgBackground(leastCorrectBottom, mostCorrectBottom, noQuestions, correct);
    const topRgb = calcRbgBackground(leastCorrectTop, mostCorrectTop, noQuestions, correct);

    return `linear-gradient(180deg, ${bottomRgb} 0%, ${topRgb} 100%)`;
}

/*
    Returns the current background calculated from the number of correct questions
    which can be used to determine the current position on the gradient
*/
const calcRbgBackground = (
    startColor: IColorRgb, 
    endColor: IColorRgb, 
    noQuestions: number, 
    correct: number
    ): string => {
        const gradient = calcRgbGradient(startColor, endColor, noQuestions);
        const step = gradient[correct];

        return `rgb(${step.red}, ${step.green}, ${step.blue})`;
}

/*
    Calculates a array of rbg color values which are a gradient from the least correct colour
    background to the most, the quantity of values is dependent on the number of steps in between
*/ 
const calcRgbGradient = (startColor: IColorRgb, endColor: IColorRgb, steps: number): IColorRgb[] => {
    const rdiff = (startColor.red - endColor.red) / steps;
    const gdiff = (startColor.green - endColor.green) / steps;
    const bdiff = (startColor.blue - endColor.blue) / steps;

    const rbgArr: IColorRgb[] = [];
    let i = 1;

    while (i < (steps + 1)) {
        let newRgb: IColorRgb = {
            red: Math.round(startColor.red - rdiff * i),
            green: Math.round(startColor.green - gdiff * i),
            blue: Math.round(startColor.blue - bdiff * i)
        };

        rbgArr.push(newRgb);
        i++;
    }

    return rbgArr;
}