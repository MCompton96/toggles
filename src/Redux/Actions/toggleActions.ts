import { IToggle } from "../../Common/Interfaces/IToggle";
import * as types from "./actionTypes";

export const setToggles = (toggles: IToggle[]) => ({
    type: types.SET_TOGGLES,
    toggles
});

export const changeToggle = (toggle: IToggle) => ({
    type: types.CHANGE_TOGGLE,
    toggle
});