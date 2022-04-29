import { IToggle } from "../../Common/Interfaces/IToggle";
import { AnyAction } from 'redux';
import * as types from '../Actions/actionTypes';
import { addUniqueIdToToggles, calculateCorrectAnswers } from "../../Common/Helpers/state-helpers";

export interface TogglesState {
    toggles: IToggle[];
    correctAnswers: number;
}

const initialState: TogglesState = {
    toggles: [],
    correctAnswers: 0
};

const togglesReducer = (state = initialState, action: AnyAction): TogglesState => {
    switch (action.type) {
        case types.SET_TOGGLES:
            return {
                ...state,
                toggles: addUniqueIdToToggles(action.toggles),
                correctAnswers: calculateCorrectAnswers(action.toggles)
            }
        case types.CHANGE_TOGGLE:
            const updatedToggles = [...state.toggles.filter(x => x.id !== action.toggle.id), action.toggle];
            const updatedCorrectAnswers = calculateCorrectAnswers(updatedToggles);
            return {
                ...state,
                toggles: updatedToggles,
                correctAnswers: updatedCorrectAnswers
            };
        default:
            return state;
    }
}

export default togglesReducer;