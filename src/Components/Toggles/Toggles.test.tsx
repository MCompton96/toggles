import React from 'react'
import { render, screen } from '@testing-library/react'
import Toggles from './Toggles'
import { IToggleGroup } from '../../Common/Interfaces/IToggle'
import * as TogglesService from '../../Common/Services/toggle.service'

describe('Toggles mock', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    });
    test('getToggles is called within the useEffect', () => {
        jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
        jest.spyOn(TogglesService, 'getToggles');
        render(<Toggles />)
    
        expect(TogglesService.getToggles).toHaveBeenCalledTimes(1);
    });
    test('Should render a toggle', async () => {
        const mockData: IToggleGroup = {
            question: 'Test Question',
            layoverImageUrl: 'Test.jpg',
            toggles: [
                { 
                    id: '1', 
                    options: [
                        {name:'Test option 1', correct: true, selected: false}, 
                        {name: 'Test option 2', correct: false, selected: true}
                    ]
                }
            ]
        };
        jest.spyOn(TogglesService, 'getToggles').mockResolvedValueOnce(mockData);
        render(<Toggles />);
        expect(await screen.findByText('Test Question:')).toBeInTheDocument();
        expect(await screen.findByText('Test option 1')).toBeInTheDocument();
        expect(await screen.findByText('Test option 2')).toBeInTheDocument();
        expect(await screen.findByText('The answer is incorrect')).toBeInTheDocument();
    });
});
