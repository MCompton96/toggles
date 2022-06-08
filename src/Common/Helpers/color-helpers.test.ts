import { getBackground } from './color-helpers';

describe('color helpers', () => {
    describe('getBackground', () => {
        it('returns a string', () => {
            // Arrange/Act
            const result = getBackground(5, 1);

            // Assert
            expect(typeof result === 'string').toBe(true);
            expect(result).toContain('linear-gradient');
        });
        it('handles no questions', () => {
            // Arrange
            const expected = 'linear-gradient(180deg, #76E0C2 0%, #59CADA 100%)';

            // Act
            const result = getBackground(0, 0);

            // Assert
            expect(result).toBe(expected);
        });
        it('returns preset blue background when all answers are correct', () => {
            // Arrange
            const expected = 'linear-gradient(180deg, #76E0C2 0%, #59CADA 100%)';

            // Act
            const resultOne = getBackground(1, 1);
            const resultTwo = getBackground(5, 5);
            const resultThree = getBackground(5, 1);

            // Assert
            expect(resultOne).toBe(expected);
            expect(resultTwo).toBe(expected);
            expect(resultThree).not.toBe(expected);
        });
        it('returns the correct string value when answers are not all correct', () => {
            // Arrange
            const expected = 'linear-gradient(180deg, rgb(255, 186, 19) 0%, rgb(252, 150, 15) 100%)';

            // Act
            const result = getBackground(3, 1);

            // Assert
            expect(result).toContain('rgb');
            expect(result).toBe(expected);
        })
    })
});