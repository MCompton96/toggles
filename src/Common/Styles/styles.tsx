import styled from 'styled-components';

interface IStyledOption {
    position?: OptionPosition
    selectedPosition?: number
    selected?: boolean
    noOptions: number
    verticalAlign?: boolean
}

interface IInnerContainerStyle {
    verticalAlign?: boolean
    noOptions?: number
}

type OptionPosition = 'left' | 'right' | 'middle'

export const ToggleContainer = styled.div`
    width: 90%;
    margin 10px 0px;
`;

export const ToggleInnerContainer = styled.div<IInnerContainerStyle>`
    position: relative;
    width: 100%;
    height: ${props => {
        if (!props.verticalAlign) {
            return null;
        } else {
            return props.noOptions === 2 ? '100px' : '150px';
        }
    }};
    flex: 1;
    border: 2px solid #F1F1F1;
    border-radius: ${props => props.verticalAlign ? '24px' : '100px'};
    opacity: 0.75;
    margin: 0;
    touch-action: none;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    &:hover {
        cursor: pointer;
    }
`;

export const OptionOverlay = styled.div<IStyledOption>`
    position: relative;
    width: ${props => {
        if (props.verticalAlign) {
            return '100%';
        } else {
            return props.noOptions === 2 ? '50%' : '33.33%';
        }
    }};
    height: ${props => (props.verticalAlign && props.noOptions === 3) ? '33.33%' : '50px'};
    transition: all 0.7s cubic-bezier(0.04, 0.46, 0.36, 0.99);
    touch-action: none;
    user-select: none;
    transform: ${props => {
        switch (props.selectedPosition) {
            case 1:
                return props.verticalAlign ? 'translateY(100%)' : 'translateX(100%)';
            case 2:
                return props.verticalAlign ? 'translateY(200%)' : 'translateX(200%)';
            default:
                return '';

        }
    }};

    &::after {
        position: absolute;
        left: 0;
        width: 100%;
        border-radius: ${props => props.verticalAlign ? '24px' : '100px'};
        height: 100%;
        background: #f1f1f1;
        opacity: 0.7;
        content: "";
        box-shadow: 2px 5px 9px #888888;
    }
`;

export const Option = styled.div<IStyledOption>`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: ${props => {
        if (props.verticalAlign) {
            return '100%';
        } else {
            return props.noOptions === 2 ? '50%' : '33%'
        }
    }};
    height: ${props => (props.verticalAlign && props.noOptions === 3) ? '' : '100%'};
    top: ${props => {
        if (!props.verticalAlign) {
            return '0';
        } else {
            switch (props.position) {
                case 'right':
                    return props.noOptions === 2 ? '25%' : '75%';
                case 'left':
                    return props.noOptions === 2 ? '-25%' : '10%';
                default:
                    return props.noOptions === 2 ? '0' : '40%';
            }
        }
    }};
    color: ${props => props.selected ? '#9F938B' : '#f1f1f1'};
    font-weight: 800;
    transition: color 0.7s cubic-bezier(0.04, 0.46, 0.36, 0.99);
    box-sizing: border-box;
    left: ${props => {
        if (props.verticalAlign) {
            return '0';
        } else {
            switch (props.position) {
                case 'left':
                    return '0';
                case 'middle':
                    return '33.33%';
                default:
                    return null;
            }
        }
    }};
    right: ${props => {
        if (props.verticalAlign) {
            return '0';
        } else {
            return props.position === 'right' ? '0' : null;
        }
    }};

    .option span {
        pointer-events: none;
        user-select: none;
        transition: all .2s ease;
        font-weight: 500;
        font-size: 1.5vw;
    }

`;



