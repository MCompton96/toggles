import { IToggleGroup } from "../Interfaces/IToggle";
import { requests } from './http-common'

export const getToggles = async (): Promise<IToggleGroup> => {
    return await requests.get('toggles');
}