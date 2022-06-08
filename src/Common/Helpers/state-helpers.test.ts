import { IToggle } from "../Interfaces/IToggle";
import { calculateCorrectAnswers, calculateCorrectPercentage, initialiseToggles } from "./state-helpers"

const toggles: IToggle[] = [
    { id: '1', options: [{ id: '1', name: 'Test 1', correct: false }, { id: '2', name: 'Test 2', correct: true }]},
    { id: '2', options: [{ id: '1', name: 'Test 3', correct: true }, { id: '2', name: 'Test 4', correct: false }]},
    { id: '3', options: [{ id: '1', name: 'Test 5', correct: false }, { id: '2', name: 'Test 6', correct: true }]},
    { id: '4', options: [{ id: '1', name: 'Test 7', correct: false }, { id: '1', name: 'Test 8', correct: true }]},
    { id: '5', options: [{ id: '1', name: 'Test 9', correct: true }, { id: '2', name: 'Test 10', correct: false }]}
];

const selectedToggles: IToggle[] = [
    { id: '1', options: [{ id: '1', name: 'Test 1', correct: false, selected: false }, { id: '2', name: 'Test 2', correct: true, selected: true }]},
    { id: '2', options: [{ id: '1', name: 'Test 3', correct: true, selected: false }, { id: '2',  name: 'Test 4', correct: false, selected: true }]},
    { id: '3', options: [{ id: '1', name: 'Test 5', correct: false, selected: true }, { id: '2', name: 'Test 6', correct: true, selected: false }]},
    { id: '4', options: [{ id: '1', name: 'Test 7', correct: false, selected: true }, { id: '1', name: 'Test 8', correct: true, selected: false }]},
    { id: '5', options: [{ id: '1', name: 'Test 9', correct: true, selected: false }, { id: '2', name: 'Test 10', correct: false, selected: true }]}
]

describe('state helpers', () => {
    describe('initialiseToggles', () => {
        it('should handle an empty array', () => {
            // Arrange/Act
            const result = initialiseToggles([]);

            // Assert
            expect(result).toEqual([])
        });
        it('array should be randomly shuffled', () => {
            // Arrange/Act
            const result = initialiseToggles(toggles);
            const resultIds = result.map(x => x.id);

            // Assert
            expect(resultIds).not.toEqual(['1', '2', '3', '4', '5']);
        });
        it('should only initalise with one option selected', () => {
            // Arrange/Act
            const result = initialiseToggles(toggles);
            const numberOfSelected = result.map(x => {
                return x.options.filter(y => y.selected).length;
            });

            // Assert
            expect(numberOfSelected.every(x => x === 1)).toBe(true);
        });
        it('should not mutate original array', () => {
            // Arrange
            const expected = [...toggles];

            // Act
            const result = initialiseToggles(toggles);

            // Assert
            expect(expected).toEqual(toggles);
            expect(expected).not.toEqual(result);
        })
    });
    describe('calculateCorrectAnswers', () => {
        it('should return a number', () => {
            // Arrange
            const setupToggles = initialiseToggles(toggles);

            // Act
            const result = calculateCorrectAnswers(setupToggles);

            // Assert
            expect(typeof result === 'number').toBe(true);
        });
        it('should handle an empty array', () => {
            // Arrange/Act
            const result = calculateCorrectAnswers([]);

            // Assert
            expect(result).toBe(0);
        });
        it('should return the correct number', () => {
            // Arrange/Act
            const result = calculateCorrectAnswers(selectedToggles);

            // Assert
            expect(result).toBe(1);
        });
    });
    describe('calculateCorrectPercentage', () => {
        it('should return a number', () => {
            // Arrange/Act
            const result = calculateCorrectPercentage(selectedToggles);

            // Assert
            expect(typeof result === 'number').toBe(true);
        });
        it('should handle an empty array', () => {
            // Arrange/Act
            const result = calculateCorrectPercentage([]);

            // Assert
            expect(result).toBe(0);
        });
        it('should return the correct percentage', () => {
            // Arrange/Act
            const result = calculateCorrectPercentage(selectedToggles);

            // Assert
            expect(result).toBe(20);
        });
    })
})