import { IColorRgb } from "../Interfaces/IColorRgb";

export const calcRbgBackground = (
    startColor: IColorRgb, 
    endColor: IColorRgb, 
    noQuestions: number, 
    correct: number
    ): string => {
        const gradient = calcRgbGradient(startColor, endColor, noQuestions);
        const step = gradient[correct];

        return `rgb(${step.red}, ${step.green}, ${step.blue})`;
}

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